const Schemas = require("../../models/index");
const jwt = require("jsonwebtoken");
const mailer = require("../../helpers/mailer");
require("dotenv").config();

module.exports = async (req, res) => {
  const teamId = req.body.teamId;
  const email = req.body.email;
  const userId = req.user._id;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const fullUrl = req.protocol + "://" + req.get("host");

  if (teamId.length != 24 || !email) {
    return res.status(404).json({
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

    //Check if Logged In user is admin of team or not
    if (userId != team.admin) {
      throw new Error("Invalid Request");
    }
    const admin = await Schemas.User.findOne({
      _id: userId,
    });

    //check if user exist in database from req email && if user is from same organization
    const user = await Schemas.User.findOne({
      email,
      organization: team.organization,
    });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    //check if user is already a memeber of team
    if (user.teams.includes(teamId)) {
      throw new Error("User is already a member of Team");
    }

    //if user exists create a token
    const addUserToken = jwt.sign(
      { teamId, memberEmail: email, reqType: "add", ip },
      process.env.APPROVE_TOKEN_SECRET,
      { expiresIn: process.env.APPROVE_TOKEN_EXPIRE_TIME }
    );

    //create a link to send Add request to user
    const addUserLink = `${fullUrl}/add-member-confirm/${addUserToken}`;

    //send mail with Add request link
    await mailer({
      email: user.email,
      reason: `Request to Add in team:-
      Team name: ${team.name}
      Requested By: ${admin.name}
      Requester's Email: ${admin.email}`,
      link: addUserLink,
    });

    res.status(200).json({
      success: true,
      message: "Request to Add In team Sent Successfully.",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
