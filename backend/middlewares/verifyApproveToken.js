const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  const token = req.params.token;
  if (!token)
    return res.status(400).json({
      success: false,
      message: "reset token is required",
    });
  try {
    //check if token is valid
    const organization = jwt.verify(token, process.env.APPROVE_TOKEN_SECRET);
    req.organization = organization;
    next();
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
