const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");

module.exports = async (req, res) => {
  //get user id from req.params
  const userId = req.params.id;
  const currentUserId = req.user._id;
  const page = parseInt(req.query.page);
  const noOfPosts = parseInt(req.query.limit);
  if (userId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Post/s doesn't exist",
    });
  }
  try {
    const post = await Schemas.Post.aggregate(
      pipeline.postsByUserId(userId, currentUserId, page, noOfPosts)
    );
    if (post.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Post/s doesn't exist",
      });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
