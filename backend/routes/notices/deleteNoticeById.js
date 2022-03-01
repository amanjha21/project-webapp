const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");
const deleteImage = require("../../helpers/deleteImage");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const noticeId = req.params.id;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  try {
    if (noticeId.length != 24) {
      throw new Error("Invalid Notice Id");
    }
    //check if this notice exists and belongs to this user
    const notice = await Schemas.Notice.findOne({ _id: noticeId }).exec();
    if (!notice || notice.user != userId) {
      throw new Error("Notice doesn't exist");
    }

    //delete notice_reactions on this notice
    await Schemas.Notice_Reaction.deleteMany({ notice: noticeId }).exec();
    //delete notice itself
    await Schemas.Notice.deleteOne({ _id: noticeId }).exec();
    res.status(200).json({
      success: true,
      message: "Notice deleted successfully",
    });
    //send delete notice images request without waiting
    deleteImage("", notice.image_link);
    //log to db
    logger({
      userId: userId,
      message: `Notice Deleted with noticeId: ${noticeId} by user with userId: ${userId} from team with teamId:${notice.team} `,
      ip,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
