const Schemas = require("../../models/index");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const logger = require("../../helpers/logger");
const uploader = require("../../helpers/uploader");

module.exports = async (req, res) => {
  const name = req.body.name;
  const admin = req.user._id;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  try {
    //Check if the User exist
    const adminDetails = await Schemas.User.findOne({
      _id: ObjectId(admin),
    });

    if (!adminDetails) {
      return res.status(404).json({
        success: false,
        message: "Invalid Request",
      });
    }
    const organization = adminDetails.organization;

    //Check if Team already exists
    const result = await Schemas.Team.findOne({
      organization: ObjectId(organization),
      name,
    }).exec();

    if (result) {
      return res.status(400).json({
        success: false,
        message: "Team already exist",
      });
    }

    const team = new Schemas.Team({
      name,
      organization,
      admin,
    });

    const newTeam = await team.save();
    adminDetails.teams.push(newTeam);
    await adminDetails.save();

    logger({
      userId: admin,
      message: `New Team ${team.name} Created With TeamID: ${newTeam._id} by User with userID: ${admin}`,
      ip,
    });

    res.status(201).json({
      success: true,
      message: "Team added successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
