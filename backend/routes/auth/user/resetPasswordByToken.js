const jwt = require("jsonwebtoken");
const Schemas = require("../../../models/index");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.newPassword;
  if (!token)
    return res.status(400).json({
      success: false,
      message: "reset token is required",
    });
  try {
    //check if token is valid
    const user = jwt.verify(token, process.env.PASSWORD_RESET_TOKEN_SECRET);
    //update users password
    const userCredentials = await Schemas.User_Credential.findOne({
      _id: user._id,
    });
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    userCredentials.password = hashedPassword;
    await userCredentials.save();
    // console.log(userCredentials);
    res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
