const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");
module.exports = async (req, res) => {
  const userId = req.user._id;
  if (userId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  try {
    const user = await Schemas.User.aggregate(
      pipeline.getUserById(userId)
    ).exec();

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User doesnot exist",
      });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
