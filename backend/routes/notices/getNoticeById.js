const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");
const auth = require("../../helpers/auth/index");
module.exports = async (req, res) => {
  const noticeId = req.params.id;
  const userId = req.user._id;
  try {
    if (noticeId.length != 24) {
      throw new Error("Invalid Notice Id");
    }
    const notice = await Schemas.Notice.aggregate(
      pipeline.noticeById(noticeId, userId)
    );
    if (notice.length == 0) {
      throw new Error("Notice doesn't exist");
    }
    const hasAuth =
      (await auth.isMemberOfTeam(userId, notice[0].team)) ||
      (await auth.isModeratorOfTeam(userId, notice[0].team)) ||
      (await auth.isAdminOfTeam(userId, notice[0].team));
    if (!hasAuth)
      throw new Error("you donot have auth to access this resource");

    res.status(200).json(notice);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
