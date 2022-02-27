const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");

module.exports = async (req, res) => {
  const teamId = req.body.id;
  const member = req.body.member;
  const userId = req.user._id;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  try {
    //Check if team exists
    const team = await Schemas.Team.findOne({
      _id: teamId,
    }).exec();

    if (!team) {
      return res.status(400).json({
        success: false,
        message: "Team doesn't exist",
      });
    }

    //Check if logged in user is admin
    if (userId != team.admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }

    //find teamMember to remove
    const teamMember = await Schemas.User.findOne({
      _id: member,
    });

    //check if user exists
    if (!teamMember) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }

    //remove team from teamMember.teams
    if (
      teamMember &&
      teamMember.teams.includes(teamId) &&
      team.admin != teamMember._id
    ) {
      if (team.moderator.includes(teamMember._id)) {
        const modIndex = team.moderator.indexOf(teamMember._id);
        team.moderator.splice(modIndex, 1);
        await team.save();
      }
      const index = teamMember.teams.indexOf(teamId);
      teamMember.teams.splice(index, 1);
      await teamMember.save();
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
