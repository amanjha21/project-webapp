const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");

const deleteImage = require("../../helpers/deleteImage");
module.exports = async (req, res) => {
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const userId = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const imageData = req.files;
  //checking if the userId length is proper or not
  if (userId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  //checking if all the params exist
  if (!name || !imageData || !description) {
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
    }

    // checking if description exists
    if (description && description != user.description) {
      user.description = description;
    }

    // if imageData is passed from the body then we will change the value of the user imageUrl in the database

    if (imageData.length == "0") {
      deleteImage(user.imageUrl);
      user.imageUrl = "";
    } else if (imageData.length > 0) {
      deleteImage(user.imageUrl);
      const url = await uploadImage(imageData[0], `./user/${userId}`);
      //Save url in database
      user.imageUrl = url;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated",
    });
    logger({
      userId: user._id,
      message: `User: ${user._id} updated successfully by user with userId: ${user._id}`,
      ip,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
