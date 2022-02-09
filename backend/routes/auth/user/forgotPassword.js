const Schemas = require("../../../models/index");
const jwt = require("jsonwebtoken");
const mailer = require("../../../helpers/mailer");
module.exports = async (req, res) => {
  const email = req.body.email;
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  //check if email is present in req
  if (!email)
    return res.status(400).json({
      success: false,
      message: "email is required",
    });
  try {
    //check if user exists in database
    const user = await Schemas.User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "user doesn't exist",
      });
    //if user exists create a token
    const resetToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.PASSWORD_RESET_TOKEN_SECRET,
      {
        expiresIn: process.env.PASSWORD_RESET_TOKEN_EXPIRE_TIME,
      }
    );
    //create a link to resetpassword
    const resetLink = `${fullUrl}/${resetToken}`;
    //send email with reset link
    await mailer({
      email: user.email,
      reason: "Password Reset",
      link: resetLink,
    });

    res.status(200).json({
      success: true,
      message: "reset link sent to email successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
