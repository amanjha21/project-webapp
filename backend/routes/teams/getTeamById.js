const Schemas = require("../../models/index");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
module.exports = async (req, res) => {
  const teamId = req.params.id;

  ////check if teamId is valid
  if (teamId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }

  try {
    //Check if team exists
    const team = await Schemas.Team.aggregate([
      {
        $match: {
          _id: new ObjectId(teamId),
        },
      },
      {
        $lookup: {
          from: "organizations",
          localField: "organization",
          foreignField: "_id",
          as: "organization",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          organization: {
            $arrayElemAt: ["$organization", 0],
          },
          admin: 1,
          moderator: 1,
          createdAt: 1,
          updatedAt: 1,
          imageUrl: 1,
        },
      },
    ]).exec();

    if (team.length === 0) {
      throw new Error("Team doesn't exist");
    }

    //return team
    res.status(200).json(team);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
