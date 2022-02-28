const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");
const auth = require("../../helpers/auth/index");
module.exports = async (req, res) => {
  //get team id from req.params
  const teamId = req.params.id;
  const userId = req.user._id;
  const currentUserId = req.user._id;
  const page = parseInt(req.query.page);
  const noOfPosts = parseInt(req.query.limit);
  if (teamId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  const hasAuth =
    (await auth.isAdminOfTeam(userId, teamId)) ||
    (await auth.isModeratorOfTeam(userId, teamId)) ||
    (await auth.isMemberOfTeam(userId, teamId));
  if (!hasAuth)
    return res.status(401).json({
      success: false,
      message: "you donot have auth to access this resource",
    });
  try {
    const notices = await Schemas.Notice.aggregate(
      pipeline.noticesByTeamId(teamId, currentUserId, page, noOfPosts)
    );
    if (notices.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Nothing to show",
      });
    }
    res.status(200).json(notices);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
