const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");
const jwt = require("jsonwebtoken");
module.exports = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1] || "";
  let userId = "000000000000000000000000";
  const page = parseInt(req.query.page);
  const noOfPosts = parseInt(req.query.limit);
  try {
    //if token exists validate and extract userid
    if (token) {
      const user = jwt.verify(token, process.env.USER_TOKEN_SECRET);
      const dbUser = await Schemas.User_Credential.findOne({ _id: user._id });
      const dbToken = dbUser.token;

      if (dbToken && dbToken == token) {
        userId = dbUser._id;
      }
    }
    const post = await Schemas.Post.aggregate(
      pipeline.posts(userId, page, noOfPosts)
    );
    if (post.length == 0) {
      throw new Error("No post/s to show");
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
