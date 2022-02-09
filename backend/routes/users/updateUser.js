const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");
module.exports = async (req, res) => {
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const userId = req.params.id;
  const name = req.body.name;

  const teams = req.body.teams;

  //checking if the userId length is proper or not
  if (userId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  //checking if all the params exist
  if (!name && !teams) {
    return res.status(400).json({
      success: false,
      message: "Nothing to update!!",
    });
  }
  try {
    const user = await Schemas.User.findOne({
      _id: userId,
    }).exec();
    // checking if the user exists in the model users
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesnt exist",
      });
    }
    // checking if name exists and if it needs to be updated in the Database
    if (name && name != user.name) {
      user.name = name;
      await user.save();
    }

    // checking if teams exists and if it needs to be updated in the database
    if (teams && user.teams.includes(teams)) {
      user.teams.push(teams);
      await user.save();
    }
    // checkin if the changes were made successfully
    if (name == user.name || teams == user.teams) {
      res.status(200).json({
        success: true,
        message: "User updated",
      });
      logger({
        userId: user._id,
        message: `User: ${user._id} updated successfully by user with userId: ${user._id}`,
        ip,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to Update!!",
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
