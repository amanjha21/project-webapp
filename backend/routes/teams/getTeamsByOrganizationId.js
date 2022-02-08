const Schemas = require("../../models/index");

module.exports = async (req, res) => {
  const organizationId = req.params.id;
  let page = parseInt(req.query.page) || 1;
  page--;
  const limit = parseInt(req.query.limit) || 10;

  if (organizationId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }

  try {
    const team = await Schemas.Team.find({
      organization: organizationId,
    })
      .sort({ name: 1 })
      .skip(page * limit)
      .limit(limit)
      .exec();

    if (team.length == 0 || !team) {
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
