const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");

module.exports = async (req, res) => {
  const teamId = req.params.id;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  if (teamId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }

  try {
    const team = await Schemas.Team.findOne({ _id: teamId }).exec();

    if (!team) {
      return res.status(400).json({
        success: false,
        message: "Team doesn't exist",
      });
    }

    const teamName = team.name;
    const adminId = team.admin;

    const noticeIdArray = await Schemas.Notice.find(
      { team: team._id },
      { _id: 1 }
    );

    await Schemas.Notice_Reaction.deleteMany({
      notice: { $in: noticeIdArray },
    });

    await Schemas.Notice.deleteMany({ _id: { $in: noticeIdArray } });

    await Schemas.User.updateMany(
      { teams: teamId },
      { $pull: { teams: teamId } }
    ).exec();

    const result = await Schemas.Team.deleteOne({ _id: teamId }).exec();

    logger({
      userId: adminId,
      message: `${teamName} Team Deleted with teamId: ${teamId} By User With UserId: ${adminId}`,
      ip,
    });

    if (result.deletedCount == 1) {
      res.status(200).json({
        success: true,
        message: "Team deleted successfully",
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
