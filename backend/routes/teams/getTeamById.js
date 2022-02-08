const Schemas = require("../../models/index");

module.exports = async (req, res) => {
  const teamId = req.params.id;

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

    res.status(200).json(team);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
