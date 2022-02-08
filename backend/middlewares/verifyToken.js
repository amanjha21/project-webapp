const jwt = require("jsonwebtoken");
const Schemas = require("../models/index");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Access Denied",
    });
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const dbUser = await Schemas.User_Credential.findOne({ _id: user._id });
    const dbToken = dbUser.token;

    if (!dbToken || dbToken !== token) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
