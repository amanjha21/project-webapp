const Schemas = require("../../models/index");

module.exports = async (req, res) => {
  const teamId = req.params.id;
  const name = req.body.name;
  const organization = req.body.organization;
  const admin = req.body.admin;
  const moderator = req.body.moderator;

  if (teamId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  if (!name && !organization && !admin && !moderator) {
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

    if (admin && admin != team.admin) {
      team.admin = admin;
      await team.save();
    }

    if (moderator && !team.moderator.includes(moderator)) {
      team.moderator.push(moderator);
      await team.save();
    } else {
      if (moderator) {
        const index = team.moderator.indexOf(moderator);
        team.moderator.splice(index, 1);
      }
      await team.save();
    }

    res.status(200).json({
      success: true,
      message: "Team Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
