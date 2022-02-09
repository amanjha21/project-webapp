const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");

module.exports = async (req, res) => {
  const name = req.organization.name;
  const adminName = req.organization.adminName;
  const adminEmail = req.organization.adminEmail;
  const ip = req.organization.ip;
  const email_format = adminEmail.split("@").pop();
  const reqType = req.organization.reqType;

  if (reqType != "add")
    return res.status(403).json({
      success: false,
      message: "Invalid Request",
    });

  try {
    //check if organization already exists in database
    const result = await Schemas.Organization.findOne({ email_format }).exec();
    if (result) {
      return res.status(400).json({
        success: false,
        message: "Organization Already Exists",
      });
    }
    const organization = new Schemas.Organization({
      name,
      email_format,
    });

    const newOrganization = await organization.save();

    const admin = new Schemas.User({
      name: adminName,
      email: adminEmail,
      organization: newOrganization._id,
      teams: [],
    });

    const newAdmin = await admin.save();

    const team = new Schemas.Team({
      name: newOrganization.name,
      organization: newOrganization._id,
      admin: newAdmin._id,
      moderator: [],
    });

    const newTeam = await team.save();

    newAdmin.teams = [newTeam];
    await newAdmin.save();

    logger({
      userId: newAdmin._id,
      message: `New Organization ${name} Created With OrganizationID: ${newOrganization._id} And Also A New Team ${newTeam.name} Created with TeamID: ${newTeam._id} By a newly created User With UserID: ${newAdmin._id} as Admin`,
      ip,
    });

    res.status(201).json({
      success: true,
      message: "Organization added successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
