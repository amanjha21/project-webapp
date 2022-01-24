const Schemas = require("../../models/index");
module.exports = async (req, res) => {
  const userId = req.body.userId || "61eaeee6ef856a79a71d19b8";
  try {
    //check if this post exists and belongs to this user
    const postExists = await Schemas.Post.exists({ user: userId });
    if (!postExists) {
      return res.status(400).json({
        success: false,
        message: `Posts doesn't exist`,
      });
    }
    const result = await Schemas.Post.delete({ user: userId }).exec();
    if (result.deletedCount != 0) {
      res.status(200).json({
        success: true,
        message: `${result.deletedCount} posts deleted successfully`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to delete",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
