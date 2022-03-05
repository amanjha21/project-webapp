const Schemas = require("../../../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await Schemas.User_Credential.findOne({ email }).exec();

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Email or password is wrong",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({
      success: false,
      message: "Email or password is incorrect",
    });
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.USER_TOKEN_SECRET,
    { expiresIn: process.env.USER_TOKEN_EXPIRE_TIME }
  );

  user.token = token;
  await user.save();

  res
    .header("Authorization", "Bearer " + token)
    .status(200)
    .json({
      success: true,
      message: "Logged In Successfully",
      userDetails: { _id: user._id, email: user.email },
    });
};
