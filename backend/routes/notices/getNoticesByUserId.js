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
  if (userId.length != 24 || teamId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }

  const hasAuth =
    (await auth.isMemberOfTeam(userId, teamId)) ||
    (await auth.isModeratorOfTeam(userId, teamId)) ||
    (await auth.isAdminOfTeam(userId, teamId));
  if (!hasAuth)
    return res.status(401).json({
      success: false,
      message: "you donot have auth to access this resource",
    });
  try {
    const notices = await Schemas.Notice.aggregate(
      pipeline.noticesByUserId(userId, teamId, currentUserId, page, noOfPosts)
    );
    if (notices.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
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
