const Schemas = require("../../models/index");

module.exports = async (req, res) => {
  const teamId = req.params.id || "453eerw189y6yy6422e23";
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
    await Schemas.User.updateMany(
      { teams: teamId },
      { $pull: { teams: teamId } }
    ).exec();
    const result = await Schemas.Team.deleteOne({ _id: teamId }).exec();

    if (result.deletedCount == 1) {
      res.status(200).json({
        success: true,
        message: "Team deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to delete",
      });
    }
  } catch (err) {
    console.log(err);
    req.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
