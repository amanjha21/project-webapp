const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");

module.exports = async (req, res) => {
  const teamId = req.team.teamId;
  const userId = req.team.userId;
  const email = req.team.memberEmail;
  const ip = req.team.ip;
  const reqType = req.team.reqType;

  if (reqType != "add" || teamId.length != 24) {
    return res.status(403).json({
      success: false,
      message: "Invalid Request",
    });
  }

  try {
    //check if Team exist from req
    const team = await Schemas.Team.findOne({
      _id: teamId,
    }).exec();

    if (!team) {
      return res.status(400).json({
        success: false,
        message: "Team doesn't exist",
      });
    }
    //Check if Logged In user is admin of team or not
    if (userId != team.admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }
    //check if user exist in database from req email
    const user = await Schemas.User.findOne({
      email,
      organization: team.organization,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user doesn't exist",
      });
    }

    //check if user is already a memeber of team
    if (user.teams.includes(teamId)) {
      return res.status(400).json({
        success: false,
        message: "User is already a member of Team",
      });
    }

    user.teams.push(team);
    await user.save();

    logger({
      userId: team.admin,
      message: `User:${user._id} added to Team ( ${team.name}) with TeamId: ${teamId} By UserId : ${team.admin} Successfully.`,
      ip,
    });

    res.status(201).json({
      success: true,
      message: "User added to team successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
