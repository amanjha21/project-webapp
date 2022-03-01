const Schemas = require("../../models/index");
const uploadImage = require("../../helpers/uploadImage");
const deleteImage = require("../../helpers/deleteImage");
const logger = require("../../helpers/logger");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const noticeId = req.body.noticeId;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const content = req.body.content;
  const imageData = req.files;
  const deleteImageUrl = req.body.deleteImageUrl || false;
  try {
    if (!content && imageData.length == 0 && !deleteImageUrl) {
      throw new Error("Nothing to update");
    }
    //check if this notice exists and belongs to this user
    const notice = await Schemas.Notice.findOne({ _id: noticeId }).exec();
    if (!notice || notice.user != userId) {
      throw new Error("Notice doesn't exist");
    }

    //update content if exists
    if (content && content != notice.content) {
      notice.content = content;
    }
    //if deleteImageUrl
    if (deleteImageUrl) {
      // delete old images
      deleteImage("", notice.image_link);
      notice.image_link = "";
    }
    // if image data exists
    else if (imageData.length > 0) {
      // delete old images
      deleteImage("", notice.image_link);
      //add new images
      let imageUrl = await Promise.all(
        imageData.map(async (data) => {
          const url = await uploadImage(data, `/team/${teamId}/notice-images/`);
          return url;
        })
      );
      notice.image_link = imageUrl;
    }
    await notice.save();
    logger({
      userId: userId,
      message: `Notice with noticeId: ${noticeId} deleted by user with userId: ${userId} `,
      ip,
    });
    res.status(200).json({
      success: true,
      message: "Notice Updated Successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
