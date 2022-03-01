const Schemas = require("../../../models/index");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const commentId = req.params.id;
  const comment = req.body.comment;
  try {
    if (!comment) throw new Error("Comment is required");
    const reaction = await Schemas.Notice_Reaction.findOne({
      user: userId,
      _id: commentId,
    }).exec();
    if (!reaction) {
      throw new Error("Comment doesn't exist");
    }
    if (comment != reaction.comment) {
      reaction.comment = comment;
      await reaction.save();
    }
    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
    });
  } catch (err) {
    return res.status(404).json({
      successs: false,
      message: err.message,
    });
  }
};
