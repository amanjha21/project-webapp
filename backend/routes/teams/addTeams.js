const Schemas = require("../../models/index");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = async (req, res) => {
  const name = req.body.name || "culfest";
  const organizationId = req.body.organizationId || "61ee7181d7fc519c375e7ec7";
  const userId = req.body.userId || "61ee7181d7fc519c375e7ec7";

  try {
    //Check if Team already exists
    const result = await Schemas.Team.findOne({
      organization: ObjectId(organizationId),
      name,
    }).exec();
    if (result) {
      return res.status(400).json({
        success: false,
        message: "Request failed",
      });
    }

    const team = new Schemas.Team({
      name,
      organization: organizationId,
      manager: userId,
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
