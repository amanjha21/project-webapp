const Schemas = require("../../../models/index");
const pipeline = require("../../../helpers/pipeline");

module.exports = async (req, res) => {
  //get post id from req.params
  const postId = req.params.id;
  const userId = req.user._id;
  const page = parseInt(req.query.page);
  const noOfPosts = parseInt(req.query.limit);
  try {
    if (postId.length != 24) {
      throw new Error("Invalid Post Id");
    }
    //check if post exists
    const post = await Schemas.Post.findOne({ _id: postId });
    if (!post) {
      throw new Error("Post doesn't exist");
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
