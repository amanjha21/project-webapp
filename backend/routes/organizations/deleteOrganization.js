const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");
const logger = require("../../helpers/logger");
const deleteImage = require("../../helpers/deleteImage");

module.exports = async (req, res) => {
  const organizationId = req.organization.id;
  const userId = req.organization.userId;
  const ip = req.organization.ip;
  const reqType = req.organization.reqType;

  if (reqType != "delete")
    return res.status(403).json({
      success: false,
      message: "Invalid Request",
    });

  try {
    const organization = await Schemas.Organization.findOne({
      _id: organizationId,
    }).exec();

    if (!organization) {
      throw new Error("Organization Doesn't Exist");
    }

    //To get AdminID For Logger
    const user = await Schemas.User.findOne({
      _id: userId,
    });

    const organizationDetails = await Schemas.Organization.aggregate(
      pipeline.organizationDetails(organizationId)
    );

    const organizationName = organization.name;

    await deleteOrganization(organizationDetails[0]);

    logger({
      email: user.email,
      message: `${organizationName} Organization Deleted With OrganizationId : ${organizationId} By UserId: ${userId}`,
      ip,
    });

    res.status(200).json({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (err) {
    console.log(err);
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

    //Delete Post Images
    const postImageArray = organizationDetails.postImageArray;
    postImageArray.map((imageArray) => {
      deleteImage("", imageArray);
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

    //Delete Notice Images
    const noticeImageArray = organizationDetails.noticeImageArray;
    noticeImageArray.map((imageArray) => {
      deleteImage("", imageArray);
    });

    //Delete Notices
    await Schemas.Notice.deleteMany({ _id: { $in: noticeIdArray } });

    //Delete Users Profile Image
    const userImage = organizationDetails.userImage;
    userImage.map((image) => {
      deleteImage(image);
    });

    //Delete Users
    const userIdArray = organizationDetails.users;
    await Schemas.User.deleteMany({ _id: { $in: userIdArray } });

    //Delete Teams Profile Image
    const teamImage = organizationDetails.teamImage;
    teamImage.map((image) => {
      deleteImage(image);
    });

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
