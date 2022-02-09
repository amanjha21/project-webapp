const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");
const auth = require("../../helpers/auth/index");
module.exports = async (req, res) => {
  const noticeId = req.params.id;
  const userId = req.user._id;
  if (noticeId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  try {
    const notice = await Schemas.Notice.aggregate(
      pipeline.postById(noticeId, userId)
    );
    if (notice.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }
    const hasAuth =
      (await auth.isMemberOfTeam(userId, notice[0].team)) ||
      (await auth.isModeratorOfTeam(userId, notice[0].team)) ||
      (await auth.isAdminOfTeam(userId, notice[0].team));
    if (!hasAuth)
      return res.status(401).json({
        success: false,
        message: "you donot have auth to access this resource",
      });
    res.status(200).json(notice);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
