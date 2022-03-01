const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");
const auth = require("../../helpers/auth/index");
module.exports = async (req, res) => {
  //get user id from req.params
  const userId = req.params.id;
  const teamId = req.body.teamId;
  const currentUserId = req.user._id;
  const page = parseInt(req.query.page);
  const noOfPosts = parseInt(req.query.limit);
  try {
    if (userId.length != 24 || teamId.length != 24) {
      throw new Error("Notice doesn't exist");
    }

    const hasAuth =
      (await auth.isMemberOfTeam(currentUserId, teamId)) ||
      (await auth.isModeratorOfTeam(currentUserId, teamId)) ||
      (await auth.isAdminOfTeam(currentUserId, teamId));
    if (!hasAuth)
      throw new Error("you donot have auth to access this resource");
    const notices = await Schemas.Notice.aggregate(
      pipeline.noticesByUserId(userId, teamId, currentUserId, page, noOfPosts)
    );
    if (notices.length == 0) {
      throw new Error("Notice/s doesn't exist");
    }
    res.status(200).json(notices);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
