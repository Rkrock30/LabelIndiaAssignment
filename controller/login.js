const loginSchema = require("../model/user").register;
const {
  decryptPassword,
  createToken,
  decodedToken,
} = require("../utils/common");
require("dotenv").config();
const setRedisData = require("../db/dbconnection").setExpiryRedisData;
const getRedisData = require("../db/dbconnection").getredisData;
const crypto = require("crypto");
const { httpResponseHandlerError } = require("../utils/httpResponseHandler");
const validatePayload = require("../utils/bodyValidation").bodyValidation;

async function loginUser(req, res) {
  try {
    const valSchema = Joi.object()
      .keys({
        username: Joi.string().required().allow(null, ""),
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
      })
      .unknown(false);

    let body = await validatePayload(res, valSchema, req.body);
    const isExist = await loginSchema.findOne({ email: body.username });
    if (!isExist) {
      return res.status(400).json({ Message: "UserName doesnot exists" });
    } else {
      let decryptedPassword = await decryptPassword(
        body.password,
        isExist.password
      );
      // const obj = {
      //   firstName: isExist.firstName,
      //   lastName: isExist.lastName,
      //   mobileNo: isExist.mobileNo,
      //   email: isExist.email,
      //   role: isExist.role,
      // };
      // const createUserToken = await createToken(obj);
      // const setRedisKey = await setRedisData(body.username, createUserToken);
      // console.log(setRedisKey);
      //  const getData = await getRedisData(body.username);
      // const decode=JSON.parse(getData);
      // const decode = await decodedToken(getData);
      // console.log(decode);
      // //const decode1=JSON.parse(decode);
      // const name = decode.firstName;
      // console.log(name);
      // const generate = crypto.randomInt(0, 999999);
      // let codeString = generate.toString().padEnd(6, "0");
      // console.log(codeString);
      // const setnew1 = await setRedisData(username, codeString);
      // console.log(setnew1);
      // const newdecodedToken=await decodedToken(newToken);
      // console.log(newdecodedToken);
      // const token=jwt.sign(obj,process.env.SECRET_KEY,{expiresIn:60*60})
      // console.log(token);
      // const decode=jwt.verify(token,process.env.SECRET_KEY)

      // //const decode=JSON.parse(token)
      // console.log(decode);
      if (decryptedPassword == true) {
        const obj = {
          userId: isExist.userId,
          firstName: isExist.firstName,
          lastName: isExist.lastName,
          mobileNo: isExist.mobileNo,
          email: isExist.email,
          role: isExist.role,
        };
        console.log(obj);
        const createUserToken = await createToken(obj);
        const setRedisKey = await setRedisData(body.username, createUserToken);
        console.log(setRedisKey);
        const generate = crypto.randomInt(0, 999999);
        let codeString = generate.toString().padEnd(6, "0");
        console.log(codeString);

        return httpResponseSuccessHandler(res, 200, "Login SuccessFully", {
          token: createUserToken,
        });
      } else {
        return httpResponseSuccessHandler(
          res,
          200,
          "Kindly Check Username and Password"
        );
      }
    }
  } catch (error) {
    console.log(error);
    return httpResponseHandlerError(res, 401, "Unauthorized");
  }
}
module.exports.loginUser = { loginUser };
