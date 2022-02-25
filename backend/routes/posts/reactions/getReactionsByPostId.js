const Schemas = require("../../../models/index");
const pipeline = require("../../../helpers/pipeline");

module.exports = async (req, res) => {
  //get post id from req.params
  const postId = req.params.id;
  const userId = req.user._id;
  const page = parseInt(req.query.page);
  const noOfPosts = parseInt(req.query.limit);
  if (postId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Post/s doesn't exist",
    });
  }
  try {
    //check if post exists
    const post = await Schemas.Post.findOne({ _id: postId });
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post/s doesn't exist",
      });
    }
    //get comments
    const comments = await Schemas.Reaction.aggregate(
      pipeline.reactionsByPostId(postId, userId, page, noOfPosts)
    );

    res.status(200).json(comments);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
