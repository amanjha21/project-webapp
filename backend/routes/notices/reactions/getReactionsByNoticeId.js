const Schemas = require("../../../models/index");
const pipeline = require("../../../helpers/pipeline");
const auth = require("../../../helpers/auth/index");
module.exports = async (req, res) => {
  //get notice id from req.params
  const noticeId = req.params.id;
  const userId = req.user._id;
  const page = parseInt(req.query.page);
  const noOfNotices = parseInt(req.query.limit);
  if (noticeId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Notice/s doesn't exist",
    });
  }
  try {
    //check if notice exists
    const notice = await Schemas.Notice.findOne({ _id: noticeId });
    if (!notice) {
      return res.status(400).json({
        success: false,
        message: "Notice/s doesn't exist",
      });
    }
    const hasAuth =
      (await auth.isMemberOfTeam(userId, notice.team)) ||
      (await auth.isModeratorOfTeam(userId, notice.team)) ||
      (await auth.isAdminOfTeam(userId, notice.team));
    if (!hasAuth)
      return res.status(401).json({
        success: false,
        message: "you donot have auth to access this resource",
      });
    //get comments
    const comments = await Schemas.Notice_Reaction.aggregate(
      pipeline.reactionsByPostId(noticeId, userId, page, noOfNotices)
    );

    res.status(200).json(comments);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
