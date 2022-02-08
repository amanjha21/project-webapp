const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");
const logger = require("../../helpers/logger");

module.exports = async (req, res) => {
  const organizationId = req.params.id;

  if (organizationId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }

  try {
    const organization = await Schemas.Organization.findOne({
      _id: organizationId,
    }).exec();

    if (!organization) {
      return res.status(400).json({
        success: false,
        message: "Organization Doesn't Exist",
      });
    }

    const organizationDetails = await Schemas.Organization.aggregate(
      pipeline.organizationDetails(organizationId)
    );

    //To get AdminID For Logger
    const team = await Schemas.Team.findOne({
      name: organization.name,
      organization: organizationId,
    });

    const organizationName = organization.name;

    await deleteOrganization(organizationDetails[0]);

    logger({
      userId: team.admin,
      message: `${organizationName} Organization Deleted With OrganizationId : ${organizationId} By UserId: ${team.admin}`,
      ip,
    });

    res.status(200).json({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteOrganization = async (organizationDetails) => {
  try {
    //Delete Post Reaction
    const postIdArray = organizationDetails.posts;
    await Schemas.Reaction.deleteMany({
      post: { $in: postIdArray },
    });

    //Delete Posts
    await Schemas.Post.deleteMany({
      _id: { $in: postIdArray },
    });

    //Delete Notice Reaction
    const noticeIdArray = organizationDetails.notices;
    await Schemas.Notice_Reaction.deleteMany({
      notice: { $in: noticeIdArray },
    });

    //Delete Notices
    await Schemas.Notice.deleteMany({ _id: { $in: noticeIdArray } });

    //Delete Users
    const userIdArray = organizationDetails.users;
    await Schemas.User.deleteMany({ _id: { $in: userIdArray } });

    //Delete Team
    const teamIdArray = organizationDetails.teams;
    await Schemas.Team.deleteMany({ _id: { $in: teamIdArray } });

    //Delete Organization
    const organizationId = organizationDetails._id;
    await Schemas.Organization.deleteOne({ _id: organizationId });
  } catch (e) {
    throw e;
  }
};
