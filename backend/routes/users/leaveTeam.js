const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const teamId = req.body.teamId;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  try {
    if (!userId && !teamId) {
      res
        .status(400)
        .json({ success: false, message: "UserID and TeamID dont exist" });
    }

    const user = await Schemas.User.findOne({
      _id: userId,
      teams: { $in: teamId },
    });
    if (!user) {
      res.status(400).json({ success: false, message: "User doesnot exist" });
    } else {
      const index = user.teams.indexOf(teamId);
      user.teams.splice(index, 1);
      await user.save();
    }

    if (!user.teams.includes(teamId)) {
      res.status(200).json({ success: true, message: "User left the team" });
    }
    logger({
      email: user.email,
      message: `User:${userId} left team: ${teamId}   `,
      ip,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "invalid message" });
  }
};
