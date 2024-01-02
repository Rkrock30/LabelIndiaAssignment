const userRegister = require("../model/user").register;
const Joi = require("joi");
const {
  decryptPassword,
  createToken,
  decodedToken,
  encryptedPassword,
} = require("../utils/common");
const setRedisData = require("../db/dbconnection").setRedisData;
const getredisData = require("../db/dbconnection").getredisData;
const validatePayload = require("../utils/bodyValidation").bodyValidation;

async function registerUser(req, res) {
  try {
    const valSchema = Joi.object()
      .keys({
        firstName: Joi.string().required().allow(null, ""),
        lastName: Joi.string().required().allow(null, ""),
        mobileNo: Joi.number().required().allow(null, ""),
        email: Joi.string().required().allow(null, ""),
        password: Joi.string()
          .min(8)
          .regex(
            new RegExp(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            )
          )
          .required()
          .error(
            new Error(
              "The entered password should be min 8 characters long, must contain atleast 1 special character, 1 uppercase, 1 lowercase, 1 numeric characters and no white spaces."
            )
          ),
        confirmPassword: Joi.any()
          .equal(Joi.ref("password"))
          .required()
          .error(
            () => new Error("password and confirmPassword does not match")
          ),
        role: Joi.string().required().allow(null, ""),
      })
      .unknown(false);

    let body = await validatePayload(res, valSchema, req.body);
    const existEmail = await userRegister.findOne({ email: body.email });
    if (existEmail) {
      return httpResponseSuccessHandler(res, 200, "User Alreday Exists");
    }

    const encryptedPasswordx = await encryptedPassword(body.password);
    let countUser = await userRegister.find().count();
    let userId = countUser > 0 ? countUser + 1 : 1;
    const registerData = await userRegister.create({
      userId: userId,
      firstName: body.firstName,
      lastName: body.lastName,
      mobileNo: body.mobileNo,
      email: body.email,
      password: encryptedPasswordx,
      role: body.role,
    });
    const payload = {
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      mobileNo: registerData.mobileNo,
      email: registerData.email,
      role: registerData.role,
    };
    console.log(payload);
    const tokenData = await createToken(payload);
    const setData = await setRedisData(body.email, tokenData);
    if (registerData) {
      return res
        .status(200)
        .json({ Message: "Data Inserted Succesfully", token: tokenData });
    } else {
      return res.status(400).json({ Message: "Bad Request" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ Message: "Error Occured ", error });
  }
}
module.exports.registerUser = registerUser;
