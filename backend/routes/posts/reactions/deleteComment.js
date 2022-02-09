const Schemas = require("../../../models/index");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const comment = req.body.comment;
  const postId = req.body.postId;
  try {
    const reaction = await Schemas.Reaction.findOne({
      user: userId,
      comment: comment,
      post: postId
    }).exec();
    if (!reaction) {
      return res.status(400).json({
        success: false,
        message: "Reaction doesn't exist",
      });
    }
    if (reaction.user != userId) {
      return res.status(403).json({
        success: false,
        message: "Reaction doesn't exist ",
      });
    }
    const result = await Schemas.Reaction.deleteOne({
      user: userId,
      comment: comment,
      post: postId
    }).exec();
    if (result.deletedCount == 1) {
      res.status(200).json({
        success: true,
        message: "Reaction deleted successfully",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Failed to delete reaction",
      });
    }
  } catch (err) {
    return res.status(404).json({
      successs: false,
      message: err.message,
    });
  }
};