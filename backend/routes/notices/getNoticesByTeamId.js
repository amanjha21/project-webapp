const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");
const auth = require("../../helpers/auth/index");
module.exports = async (req, res) => {
  //get team id from req.params
  const teamId = req.params.id;
  const userId = req.user._id;
  const page = parseInt(req.query.page);
  const noOfPosts = parseInt(req.query.limit);
  try {
    if (teamId.length != 24) {
      throw new Error("Notice doesn't exist");
    }
    const hasAuth =
      (await auth.isMemberOfTeam(userId, teamId)) ||
      (await auth.isModeratorOfTeam(userId, teamId)) ||
      (await auth.isAdminOfTeam(userId, teamId));
    if (!hasAuth)
      throw new Error("you donot have auth to access this resource");
    const notices = await Schemas.Notice.aggregate(
      pipeline.noticesByTeamId(teamId, userId, page, noOfPosts)
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
