const Schemas = require("../models/index");
module.exports = async ({ userId, email, message, ip }) => {
  try {
    let user = { email };
    if (!email) {
      user = await Schemas.User.findOne(
        {
          _id: userId,
        },
        { _id: 0, email: 1 }
      );
    }
    const log = new Schemas.Logger({
      email: user.email,
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
