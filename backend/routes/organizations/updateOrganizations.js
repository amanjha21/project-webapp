const Schemas = require("../../models/index");

module.exports = async (req, res) => {
  const organizationId = req.params.id || "453eerw189y6yy6422e23";
  const name = req.body.name;
  const email_format = req.body.email_format;

  if (organizationId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  if (!name && !email_format) {
    return res.status(403).json({
      success: false,
      message: "Nothing to update",
    });
  }
  try {
    const organization = await Schemas.Organization.findOne({
      _id: organizationId,
    }).exec();
    if (!organization) {
      return res.status(400).json({
        success: false,
        message: "Organization doesn't exist",
      });
    }

    if (name && name != organization.name) {
      organization.name = name;
      await organization.save();
    }

    if (email_format && email_format != organization.email_format) {
      organization.email_format = email_format;
      await organization.save();
    }

    if (
      name == organization.name ||
      email_format == organization.email_format
    ) {
      res.status(200).json({
        success: true,
        message: "Organization Updated Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to Update",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
