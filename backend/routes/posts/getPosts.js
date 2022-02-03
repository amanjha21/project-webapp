const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");

module.exports = async (req, res) => {
  const userId = "61eaeee6ef856a79a71d19b9" || 0;
  const page = parseInt(req.query.page);
  const noOfPosts = parseInt(req.query.limit);
  try {
    const post = await Schemas.Post.aggregate(
      pipeline.posts(userId, page, noOfPosts)
    );
    if (post.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
