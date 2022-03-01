const Schemas = require("../../../models/index");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const commentId = req.params.id;
  try {
    const reaction = await Schemas.Reaction.findOne({
      user: userId,
      _id: commentId,
    }).exec();
    if (!reaction) {
      throw new Error("Comment doesn't exist");
    }

    await Schemas.Reaction.deleteOne({
      _id: commentId,
    }).exec();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (err) {
    return res.status(404).json({
      successs: false,
      message: err.message,
    });
  }
};
