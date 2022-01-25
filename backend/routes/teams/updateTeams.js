const Schemas = require("../../models/index");

module.exports = async (req, res) => {
  const teamId = req.params.id;
  const name = req.body.name;
  const organization = req.body.organization;
  const manager = req.body.manager;

  if (teamId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  if (!name && !organization && !manager) {
    return res.status(403).json({
      success: false,
      message: "Nothing to update",
    });
  }
  try {
    const team = await Schemas.Team.findOne({
      _id: teamId,
    }).exec();
    if (!team) {
      return res.status(400).json({
        success: false,
        message: "Team doesn't exist",
      });
    }

    if (name && name != team.name) {
      team.name = name;
      await team.save();
    }

    if (organization && organization != team.organization) {
      team.organization = organization;
      await team.save();
    }

    if (manager && manager != team.manager) {
      team.manager = manager;
      await team.save();
    }

    if (
      name == team.name ||
      organization == team.organization ||
      manager == team.manager
    ) {
      res.status(200).json({
        success: true,
        message: "Team Updated Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to Update",
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
