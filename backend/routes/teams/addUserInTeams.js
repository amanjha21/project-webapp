const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");

module.exports = async (req, res) => {
  const teamId = req.organization.teamId;
  const email = req.organization.memberEmail;
  const ip = req.organization.ip;
  const reqType = req.organization.reqType;

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
      throw new Error("Team doesn't exist");
    }

    //check if user exist in database from req email
    const user = await Schemas.User.findOne({
      email,
    });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    //check if user is already a memeber of team
    if (user.teams.includes(teamId)) {
      throw new Error("User is already a member of Team");
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
