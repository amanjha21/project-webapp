const Schemas = require("../../models/index");
module.exports = async (req, res) => {
  const userId = req.body.userId || "61eaeee6ef856a79a71d19b9";
  const noticeId = req.params.id || "61eb01802628524805be0d4b";
  try {
    //check if this notice exists and belongs to this user
    const notice = await Schemas.Notice.findOne({ _id: noticeId }).exec();
    if (!notice) {
      return res.status(400).json({
        success: false,
        message: `Notice doesn't exist`,
      });
    }
    if (notice.user != userId) {
      return res.status(403).json({
        success: false,
        message: "Notice doesn't exist ",
      });
    }
    //delete notice_reactions on this notice
    await Schemas.Notice_Reaction.deleteMany({ notice: noticeId }).exec();
    //delete notice itself
    const result = await Schemas.Notice.deleteOne({ _id: noticeId }).exec();
    if (result.deletedCount == 1) {
      res.status(200).json({
        success: true,
        message: "Notice deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to delete",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
