const Schemas = require("../../models/index");
const jwt = require("jsonwebtoken");
const mailer = require("../../helpers/mailer");
module.exports = async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const email_format = adminEmail.split("@").pop();
  const fullUrl = req.protocol + "://" + req.get("host");
  try {
    //check if organization exists
    const organization = await Schemas.Organization.findOne({
      email_format: email_format,
    });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Invalid Request!",
      });
    }
    //check if user already exists
    const user = await Schemas.User.findOne({
      email: userEmail,
    }).exec();

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists ",
      });
    }
    //create a token with above details
    const approveToken = jwt.sign(
      { name, email, password, ip, reqType: "addUser" },
      process.env.APPROVE_TOKEN_SECRET,
      {
        expiresIn: process.env.APPROVE_TOKEN_EXPIRE_TIME,
      }
    );
    //create a link with token
    const approveLink = `${fullUrl}/user/add/${approveToken}`;
    //send link to user's email
    await mailer({
      email: email,
      reason: `New User Creation `,
      link: approveLink,
    });
    res.status(200).json({
      success: true,
      message: "Check your email to verify your email and proceed",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
