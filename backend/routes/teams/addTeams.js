const Schemas = require("../../models/index");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = async (req, res) => {
  const name = req.body.name;
  const organization = req.body.organization;
  const admin = req.body.admin;
  const moderator = req.body.moderator || [];

  try {
    //Check if the Admin belongs to the user
    const adminDetails = await Schemas.User.findOne({
      _id: ObjectId(admin),
      organization: ObjectId(organization),
    });
    if (!adminDetails) {
      return res.status(404).json({
        success: false,
        message: "Invalid Request",
      });
    }
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
      moderator,
    });

    await team.save();
    res.status(201).json({
      success: true,
      message: "Team added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
