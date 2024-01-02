require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
async function decryptPassword(password, hashPassword) {
  const decryptedPassword = await bcrypt.compare(password, hashPassword);
  return decryptedPassword;
}
async function encryptedPassword(plainPassword) {
  let password = await bcrypt.hash(plainPassword, 10);
  return password;
}

// let account = await nodemailer.createTestAccount();
// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   //secure: false, // true for 465, false for other ports
//   auth: {
//     user: account.user, // generated ethereal user
//     pass: account.pass, // generated ethereal password
//   },
// });
async function mail(req, res) {
  try {
    // let account = await nodemailer.createTestAccount();
    // console.log(account.user);
    // console.log(account.pass);
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   auth: {
    //     user: "aylin44@ethereal.email",
    //     pass: "mcdMTqwu47gxEGupmz",
    //   },
    // });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "iamranjeettheking@gmail.com",
        pass: "rkrkrkrk",
      },
    });
    const mailOptions = {
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text,
    };
    const response = await transporter.sendMail(mailOptions);
    console.log(response);
    res.json({
      Message: "hbdbhdb",
      response,
    });
  } catch (error) {
    console.log(error);
  }
}

async function createToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.REDDIS_EXPIRY_TIME,
  });
  return token;
}
async function decodedToken(token) {
  const decodedToken = jwt.verify(`${token}`, process.env.SECRET_KEY, {
    ignoreExpiration: true,
  });
  // try {
  //   const decoded = jwt.verify(token, secret);
  //   console.log(decoded);
  //   // Check expiration time
  //   if (decoded.exp) {
  //     const expirationDate = new Date(decoded.exp * 1000);
  //     console.log(`Token expires at: ${expirationDate}`);
  //     if (expirationDate < new Date()) {
  //       console.log("Token has expired.");
  //     } else {
  //       console.log("Token is still valid.");
  //     }
  //   }
  // } catch (error) {
  //   console.error("Error decoding or verifying the token:", error.message);
  // }
  // const decodedToken = jwt.decode(token);
  // console.log(decodedToken);
  return decodedToken;
}
module.exports.mail = { mail };

module.exports = {
  encryptedPassword,
  decryptPassword,
  createToken,
  decodedToken,
};
