const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res) => {
  const postId = req.params.id;
  const token = req.header("Authorization")?.split(" ")[1] || "";
  let userId = "000000000000000000000000";
  try {
    if (postId.length != 24) {
      throw new Error("Invalid Post Id");
    }
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
      pipeline.postById(postId, userId)
    );
    if (post.length == 0) {
      throw new Error("Post doesn't exist");
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
