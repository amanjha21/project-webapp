const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");

module.exports = async (req, res) => {
  const organizationId = req.params.id;
  const name = req.body.name;

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

    //To get AdminID For Logger
    const team = await Schemas.Team.findOne({
      name: organization.name,
      organization: organizationId,
    });

    logger({
      userId: team.admin,
      message: `${organizationName} Organization Updated With OrganizationId : ${organizationId} By UserId: ${team.admin}.
      New Updated Organization -> name: ${organization.name}`,
      ip,
    });

    res.status(200).json({
      success: true,
      message: "Organization Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
