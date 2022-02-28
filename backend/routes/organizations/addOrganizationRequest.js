const Schemas = require("../../models/index");
const jwt = require("jsonwebtoken");
const mailer = require("../../helpers/mailer");
require("dotenv").config();

module.exports = async (req, res) => {
  const name = req.body.name;
  const adminName = req.body.adminName;
  const password = req.body.password;
  const adminEmail = req.body.adminEmail;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const email_format = adminEmail.split("@").pop();
  const fullUrl = req.protocol + "://" + req.get("host");
  try {
    //check if organization already exists in database
    const result = await Schemas.Organization.findOne({ email_format }).exec();
    if (result) {
      throw new Error("Organization Already Exists");
    }
    //create a token with above details
    const approveToken = jwt.sign(
      { name, adminName, adminEmail, ip, reqType: "add", password },
      process.env.APPROVE_TOKEN_SECRET,
      {
        expiresIn: process.env.APPROVE_TOKEN_EXPIRE_TIME,
      }
    );
    //create a link with token
    const approveLink = `${fullUrl}/sendVerificationEmail/${approveToken}`;
    //send link to admin's email
    await mailer({
      email: process.env.ADMIN_EMAIL,
      reason: `Add a new Organization to Database whose details are:-
      Organization Name: ${name}
      Requested By: ${adminName}
      Requester's Email: ${adminEmail}
      Request IP : ${ip}
      `,
      link: approveLink,
    });
    res.status(200).json({
      success: true,
      message:
        "Request to add Organization sent successfully. Email will be sent on Approval.",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
