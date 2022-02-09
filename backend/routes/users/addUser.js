const Schemas = require("../../models/index");

module.exports = async (req, res, next) => {
  const userName = req.organization.name;
  const userEmail = req.organization.email;
  const email_format = userEmail.split("@").pop();
  const reqType = req.organization.reqType;
  if (reqType != "addUser")
    return res.status(400).json({
      success: false,
      message: "Invalid Request!",
    });

  try {
    //check if organization exists
    const organization = await Schemas.Organization.findOne({
      email_format: email_format,
    });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Invalid Request!",
      });
    }
    const organizationTeam = await Schemas.Team.findOne({
      organization: organization._id,
      name: organization.name,
    });

    const result = await Schemas.User.findOne({
      email: userEmail,
    }).exec();

    if (result) {
      res.status(400).json({
        success: false,
        message: "User already exists ",
      });
    } else {
      const user = new Schemas.User({
        name: userName,
        email: userEmail,
        organization: organization._id,
        teams: [organizationTeam._id],
      });

      const newUser = await user.save();
      res.locals.user = newUser;

      next();
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create",
    });
  }
};
