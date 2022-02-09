const Schemas = require("../../../models/index");
module.exports = async (req, res) => {
  const comment = req.body.comment;
  const user = req.user._id;
  const post = req.body.postId;
  try {
    const dbPost = await Schemas.Post.findOne({
      _id: post
    });
    if (!dbPost) {
      return res.status(404).json({
        success: false,
        message: "Post doesnt exist"
      });
    }
    const reaction = Schemas.Reaction({
      type: "comment",
      comment: comment,
      post: post,
      user: user,
    });

    await reaction.save();
    res.status(201).json({
      success: true,
      message: "Reaction added successfully",
    });
  } catch (err) {

    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};