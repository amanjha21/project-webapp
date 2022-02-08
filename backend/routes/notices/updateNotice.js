const Schemas = require("../../models/index");
const uploader = require("../../helpers/uploader");
const logger = require("../../helpers/logger");
module.exports = async (req, res) => {
  const userId = req.body.userId || "61eaeee6ef856a79a71d19b9";
  const noticeId = req.body.noticeId || "61eb01253b5a09f2341e84b0";
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const content = req.body.content;
  const imageData = req.body.imageData;

  if (!content && !imageData) {
    return res.status(403).json({
      success: false,
      message: "Nothing to update",
    });
  }
  try {
    //check if this notice exists and belongs to this user
    const notice = await Schemas.Notice.findOne({ _id: noticeId }).exec();
    if (!notice) {
      return res.status(400).json({
        success: false,
        message: `Notice doesn't exist`,
      });
    }
    if (notice.user != userId) {
      return res.status(400).json({
        success: false,
        message: "Notice doesn't exist ",
      });
    }
    //update content if exists
    if (content) {
      notice.content = content;
    }
    // update image if exixts
    if (imageData) {
      let imageUrl = await Promise.all(
        imageData.map(async (data) => {
          const url = await uploader(data);
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
