const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");

module.exports = async (req, res) => {
  const organizationId = req.organization.id;
  const name = req.organization.name;
  const userId = req.organization.userId;
  const ip = req.organization.ip;
  const reqType = req.organization.reqType;

  if (reqType != "update")
    return res.status(403).json({
      success: false,
      message: "Invalid Request",
    });

  try {
    const organization = await Schemas.Organization.findOne({
      _id: organizationId,
    }).exec();

    if (!organization) {
      throw new Error("Organization doesn't exist");
    }
    const team = await Schemas.Team.findOne({
      name: organization.name,
      organization: organizationId,
    });
    organization.name = name;
    team.name = name;
    await organization.save();
    await team.save();

    logger({
      userId: userId,
      message: `${organizationName} Organization Updated With OrganizationId : ${organizationId} By UserId: ${userId}.
      New Updated Organization -> name: ${organization.name}`,
      ip,
    });

    res.status(200).json({
      success: true,
      message: "Organization Updated Successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
