const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");

module.exports = async (req, res) => {
  const teamId = req.params.id;
  const name = req.body.name;
  const admin = req.body.admin;
  const moderator = req.body.moderator;
  const userId = req.user._id;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  if (teamId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }

  if (!name && !admin && !moderator) {
    return res.status(403).json({
      success: false,
      message: "Nothing to update",
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

    const organization = await Schemas.Organization.findOne({
      _id: team.organization,
    });

    if (user !== team.admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }

    if (team.name === organization.name && name != team.name) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    } else {
      if (name && name != team.name) {
        team.name = name;
        await team.save();
      }
    }

    if (admin && admin != team.admin) {
      team.admin = admin;
      await team.save();
    }

    if (moderator && !team.moderator.includes(moderator)) {
      team.moderator.push(moderator);
      await team.save();
    } else {
      if (moderator) {
        const index = team.moderator.indexOf(moderator);
        team.moderator.splice(index, 1);
      }
      await team.save();
    }

    logger({
      userId: team.admin,
      message: `${team.name} Team Updated with TeamId: ${teamId} By UserId : ${team.admin}.
      New Updated Team -> name: ${team.name} , admin: ${team.admin} , moderator: ${team.moderator} `,
      ip,
    });

    res.status(200).json({
      success: true,
      message: "Team Updated Successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
