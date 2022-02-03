const Schemas = require("../../models/index");

module.exports = async (req, res) => {
  const name = req.body.name;
  const adminName = req.body.adminName;
  const adminEmail = req.body.adminEmail;

  const email_format = adminEmail.split("@").pop();
  try {
    //Check if Organization already exists
    const result = await Schemas.Organization.findOne({ email_format }).exec();
    if (result) {
      return res.status(400).json({
        success: false,
        message: "Request failed",
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

    res.status(201).json({
      success: true,
      message: "Organization added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
