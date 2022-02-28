const Schemas = require("../../models/index");

module.exports = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  page--;
  const limit = parseInt(req.query.limit) || 10;

  try {
    //find all teams
    const team = await Schemas.Team.find()
      .sort({ name: 1 })
      .skip(page * limit)
      .limit(limit)
      .exec();

    //check if teams exists
    if (team.length == 0 || !team) {
      throw new Error("Team doesn't exist");
    }

    //return teams
    res.status(200).json(team);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
