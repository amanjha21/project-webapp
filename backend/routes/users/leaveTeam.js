const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const teamId = req.body.teamId;
  const newAdminId = req.body.newAdminId;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  try {
    const user = await Schemas.User.findOne({
      _id: userId,
      teams: { $in: teamId },
    });

    if (!user) {
      res.status(400).json({ success: false, message: "User doesnot exist" });
    }
    const adminCheck = await Schemas.Team.findOne({
      _id: teamId,
      admin: userId,
    });
    const modCheck = await Schemas.Team.findOne({
      _id: teamId,
      moderator: { $in: userId },
    });

    if (adminCheck && !newAdminId) {
      return res.status(400).json({
        success: false,
        message: "new admin email required!!",
      });
    } else if (adminCheck && newAdminId) {
      //changed the admin of the team and logged the changes using logger
      adminCheck.admin = newAdminId;
      logger({
        email: user.email,
        message: ` ${userId} appointed ${newAdminId} as the new admin of the team: ${teamId}   `,
        ip,
      });
      // removed the previous admin from the team
      const index = user.teams.indexOf(teamId);
      user.teams.splice(index, 1);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Admin Changed and user has left the team",
      });
    }

    if (modCheck) {
      // if the user is moderator we remove them from the mod list of the team using their userId
      const index_1 = modCheck.moderator.indexOf(userId);
      modCheck.moderator.splice(index_1, 1);
      await modCheck.save();
      // after removing the user from the moderator list we remove the team from the user document
      const index_2 = user.teams.indexOf(teamId);
      user.teams.splice(index_2, 1);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Moderator has left the team",
      });
    }

    const index_3 = user.teams.indexOf(teamId);
    user.teams.splice(index_3, 1);
    await user.save();

    res.status(200).json({ success: true, message: "User left the team" });

    logger({
      email: user.email,
      message: `User:${userId} left team: ${teamId}   `,
      ip,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "invalid message" });
  }
};
