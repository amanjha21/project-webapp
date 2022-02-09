const Schemas = require("../../models/index");
const jwt = require("jsonwebtoken");
const mailer = require("../../helpers/mailer");
module.exports = async (req, res) => {
  const organizationId = req.params.id;
  const name = req.body.name;
  const userId = req.user._id;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const fullUrl = req.protocol + "://" + req.get("host");
  if (organizationId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  if (!name) {
    return res.status(403).json({
      success: false,
      message: "Nothing to update",
    });
  }

  try {
    //check if organization exists in database
    const organization = await Schemas.Organization.findOne({
      _id: organizationId,
    }).exec();

    if (!organization) {
      return res.status(400).json({
        success: false,
        message: "Organization doesn't exist",
      });
    }
    //check if new name is dfferent from old name
    if (name !== organization.name) {
      return res.status(403).json({
        success: false,
        message: "Invalid Request",
      });
    }
    //check if user is admin
    const team = await Schemas.Team.findOne({
      name: organization.name,
      organization: organizationId,
    });

    if (userId !== team.admin) {
      return res.status(403).json({
        success: false,
        message: "Invalid Request",
      });
    }
    const admin = await Schemas.User({ _id: team.admin });
    //create a token with above details
    const approveToken = jwt.sign(
      {
        id: organizationId,
        name,
        userId,
        ip,
        reqType: "update",
        adminEmail: admin.email,
      },
      process.env.APPROVE_TOKEN_SECRET,
      {
        expiresIn: process.env.APPROVE_TOKEN_EXPIRE_TIME,
      }
    );
    //create a link with token
    const approveLink = `${fullUrl}/sendVerificationEmail/${approveToken}`;
    //send link to admin's email
    await mailer({
      email: process.env.ADMIN_EMAIL,
      reason: `Organization update request as:-
      Old Organization Name : ${organization.name}
      New Organization Name : ${name}
      Requester Admin Id: ${userId}
      Request IP : ${ip}
      `,
      link: approveLink,
    });
    res.status(200).json({
      success: true,
      message:
        "Request to update Organization sent successfully. Email will be sent on Approval.",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
