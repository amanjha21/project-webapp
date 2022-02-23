const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");

module.exports = async (req, res) => {
  const teamId = req.params.id;
  const member = req.body.member;
  const userId = req.user._id;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  if (teamId.length != 24 || !member) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }

  try {
    const team = await Schemas.Team.findOne({
      _id: teamId,
    }).exec();

    if (!team) {
      return res.status(400).json({
        success: false,
        message: "Team doesn't exist",
      });
    }

    if (userId != team.admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }

    const teamMember = await Schemas.User.findOne({
      _id: member,
    });

    if (
      teamMember &&
      teamMember.teams.includes(teamId) &&
      team.admin != teamMember._id
    ) {
      const index = teamMember.teams.indexOf(teamId);
      teamMember.teams.splice(index, 1);
      await teamMember.save();

      if (team.moderator.includes(teamMember._id)) {
        const modIndex = team.moderator.indexOf(teamMember._id);
        team.moderator.splice(modIndex, 1);
        await team.save();
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }

    logger({
      userId: team.admin,
      message: `User:${teamMember} removed from Team ( ${team.name}) with TeamId: ${teamId} By UserId : ${team.admin}.`,
      ip,
    });

    res.status(200).json({
      success: true,
      message: "User removed from team Successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
