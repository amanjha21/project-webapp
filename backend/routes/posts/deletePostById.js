module.exports = async (req, res) => {
  const userId = req.body.userId || "61eaeee6ef856a79a71d19b9";
  const postId = req.body.postId || "61eb01802628524805be0d4b";
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
    const result = await Schemas.Post.deleteOne({ _id: postId }).exec();
    if (result.deletedCount == 1) {
      res.status(200).json({
        success: true,
        message: "Post deleted successfully",
      });
    } else {
      res.status(304).json({
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
