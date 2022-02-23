const Schemas = require("../../models/index");
const jwt = require("jsonwebtoken");
const logger = require("../../helpers/logger");
const mailer = require("../../helpers/mailer");

module.exports = async (req, res) => {
  const teamId = req.params.teamId;
  const email = req.body.email;
  const userId = req.user._id;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

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
    //if user exists create a token
    const addUserToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.APPROVE_TOKEN_SECRET,
      { expiresIn: process.env.APPROVE_TOKEN_EXPIRE_TIME }
    );

    //create a link to send Add request to user
    const addUserLink = `${fullUrl}/${addUserToken}`;

    //send mail with Add request link
    await mailer({
      email: user.email,
      reason: `Request to Add in team (${team.name})`,
      link: addUserLink,
    });

    logger({
      userId: team.admin,
      message: `sent Add request link to User:${user} from Team ( ${team.name}) with TeamId: ${teamId} By UserId : ${team.admin}.`,
      ip,
    });

    res.status(200).json({
      success: true,
      message: "Sent Add Request to team Successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
