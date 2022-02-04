const Schemas = require("../models/index");
module.exports = async ({ email, message, ip }) => {
  try {
    const log = new Schemas.Logger({
      email,
      message,
      ip,
    });
    // console.log(log);
    await log.save();
  } catch (error) {
    console.log("Failed to log");
    console.log(error);
  }
};
