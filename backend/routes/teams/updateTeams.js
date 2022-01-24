const Schemas = require("../../models/index");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = async (req, res) => {
  const teamId = req.params.id;
  const name = req.body.name;
  const organizationId = req.body.organizationId;
  const userId = req.body.userId;

  if (teamId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  if (!name && !organizationId && !userId) {
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
    if (name && name != organization.name) {
      organization.name = name;
      await organization.save();
      res.status(200).json({
        success: true,
        message: "Organization Updated Successfully",
      });
    } else if (email_format && email_format != organization.email_format) {
      organization.email_format = email_format;
      await organization.save();
      res.status(200).json({
        success: true,
        message: "Organization Updated Successfully",
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
