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
      res.status(404).json({
        success: false,
        message: "User doesnot exist!!",

      });
    } else {
      const result = await Schemas.User.deleteOne({
        _id: userId
      }).exec();
      if (result.deletedCount == 1) {
        res.status(200).json({
          success: true,
          message: "User deleted successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid Request",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Invalid Request",
    });
  }
};