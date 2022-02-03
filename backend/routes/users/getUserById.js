const Schemas = require("../../models/index");

module.exports = async (req, res) => {
  const userId = req.params.id;
  if (userId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  try {
    const user = await Schemas.User.findOne({
      _id: userId
    }).exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesnot exist",
      });
    }
    res.status(200).json(user);

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};