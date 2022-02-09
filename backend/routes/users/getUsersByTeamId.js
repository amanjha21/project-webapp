const Schemas = require("../../models/index");
const auth = require("../../helpers/auth/index");
module.exports = async (req, res) => {
  const teamId = req.params.id;
  const userId = req.user._id;
  if (teamId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  const hasAuth =
    (await auth.isMemberOfTeam(userId, teamId)) ||
    (await auth.isModeratorOfTeam(userId, teamId)) ||
    (await auth.isAdminOfTeam(userId, teamId));
  if (!hasAuth) {
    return res.status(401).json({
      success: false,
      message: "No authorization",
    });
  }
  try {
    const user = await Schemas.User.findOne({
      teams: {
        $in: teamId,
      },
    }).exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesnot exist",
      });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
