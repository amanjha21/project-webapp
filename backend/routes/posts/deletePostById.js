const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");
const deleteImage = require("../../helpers/deleteImage");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  try {
    if (postId.length != 24) {
      throw new Error("Post doesn't exist");
    }
    //check if this post exists and belongs to this user
    const post = await Schemas.Post.findOne({ _id: postId }).exec();
    if (!post || post.user != userId) {
      throw new Error("Post doesn't exist");
    }

    //delete reactions on this post
    await Schemas.Reaction.deleteMany({ post: postId }).exec();
    //delete post itself
    await Schemas.Post.deleteOne({ _id: postId }).exec();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
    //send delete post images request without waiting
    deleteImage("", post.image_link);
    //log to db
    logger({
      userId: userId,
      message: `Post Deleted with postId: ${post._id} by user with userId: ${userId} `,
      ip,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
