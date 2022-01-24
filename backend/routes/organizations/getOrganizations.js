const Schemas = require("../../models/index");

module.exports = async (req, res) => {
  const organizationId = req.params.id;
  if (organizationId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  try {
    const organization = await Schemas.Organization.findOne({_id: organizationId}).exec();
    if (organization.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Organization doesn't exist",
      });
    }
    res.status(200).json(organization);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};