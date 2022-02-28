const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");
const deleteImage = require("../../helpers/deleteImage");

module.exports = async (req, res) => {
  const teamId = req.params.id;
  const userId = req.user._id;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  //check if teamId is valid
  if (teamId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }

  try {
    //Check if team exists
    const team = await Schemas.Team.findOne({ _id: teamId }).exec();

    if (!team) {
      throw new Error("Team doesn't exist");
    }
    const organization = await Schemas.Organization.findOne({
      _id: team.organization,
    });

    //check if team is not a Organization Team
    if (team.name == organization.name || userId !== team.admin) {
      throw new Error("Invalid Request");
    }

    const teamName = team.name;
    const adminId = team.admin;

    //find all notices posted by team
    const noticeArray = await Schemas.Notice.find(
      { team: team._id },
      { _id: 1, image_link: 1 }
    );

    const noticeIdArray = noticeArray.map((notice) => {
      return notice._id;
    });

    const noticeImageArray = noticeArray.map((notice) => {
      return notice.image_link;
    });

    //delete all reactions on notices
    await Schemas.Notice_Reaction.deleteMany({
      notice: { $in: noticeIdArray },
    });

    //delete all notices posted by teams
    await Schemas.Notice.deleteMany({ _id: { $in: noticeIdArray } });
    //delete all image notics posted by teams
    noticeImageArray.map((imageArray) => {
      deleteImage("", imageArray);
    });

    //remove team from all users(user.teams)
    await Schemas.User.updateMany(
      { teams: teamId },
      { $pull: { teams: teamId } }
    ).exec();

    //delete team
    const result = await Schemas.Team.deleteOne({ _id: teamId }).exec();

    if (result.deletedCount == 1) {
      res.status(200).json({
        success: true,
        message: "Team deleted successfully",
      });
    }

    logger({
      userId: adminId,
      message: `${teamName} Team Deleted with teamId: ${teamId} By User With UserId: ${adminId}`,
      ip,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
