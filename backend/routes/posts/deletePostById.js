const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id || "61eb01802628524805be0d4b";
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  if (postId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Post doesn't exist",
    });
  }
  try {
    //check if this post exists and belongs to this user
    const post = await Schemas.Post.findOne({ _id: postId }).exec();
    if (!post) {
      return res.status(400).json({
        success: false,
        message: `Post doesn't exist`,
      });
    }
    if (post.user != userId) {
      return res.status(403).json({
        success: false,
        message: "Post doesn't exist ",
      });
    }
    //delete reactions on this post
    await Schemas.Reaction.deleteMany({ post: postId }).exec();
    //delete post itself
    const result = await Schemas.Post.deleteOne({ _id: postId }).exec();
    if (result.deletedCount == 1) {
      res.status(200).json({
        success: true,
        message: "Post deleted successfully",
      });
      logger({
        userId: userId,
        message: `Post Deleted with postId: ${post._id} by user with userId: ${userId} `,
        ip,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to delete",
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
