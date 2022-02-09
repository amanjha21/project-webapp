const Schemas = require("../../../models/index");
const logger = require("../../../helpers/logger");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const notice = req.body.noticeId;
  const comment = req.body.comment;

  try {
    const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
    const reaction = await Schemas.Notice_Reaction.findOne({
      user: userId,
      notice,
      comment: comment,
    }).exec();
    if (!reaction) {
      return res.status(400).json({
        success: false,
        message: "Reaction doesn't exist",
      });
    }
    if (reaction.user != userId) {
      return res.status(403).json({
        success: false,
        message: "Reaction doesn't exist ",
      });
    }
    const result = await Schemas.Notice_Reaction.deleteOne({
      user: userId,
      comment: comment,
    }).exec();
    if (result.deletedCount == 1) {
      logger({
        userId: userId,
        message: `Comment with CommentId of : ${result_id} was deleted by user with userId: ${userId} `,
        ip,
      });
      res.status(200).json({
        success: true,
        message: "Reaction deleted successfully",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Failed to delete reaction",
      });
    }
  } catch (err) {
    return res.status(404).json({
      successs: false,
      message: err.message,
    });
  }
};
