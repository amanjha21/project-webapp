const Schemas = require("../../models/index");
const uploader = require("../../helpers/uploader");
const logger = require("../../helpers/logger");
module.exports = async (req, res) => {
  const userId = req.body.userId || "61eaeee6ef856a79a71d19b9";
  const teamId = req.body.teamId || "61f2de8599088e5c1c0cb5ea";
  const content = req.body.content || "abloj";
  const imageData = req.body.imageData;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  try {
    const notice = new Schemas.Notice({
      content,
      image_link: "",
      user: userId,
      team: teamId,
    });
    if (imageData) {
      let imageUrl = await Promise.all(
        imageData.map(async (data) => {
          const url = await uploader(data);
          return url;
        })
      );
      notice.image_link = imageUrl;
    }

    const newNotice = await notice.save();
    logger({
      userId: userId,
      message: `New Notice Created with noticeId: ${newNotice._id} by user with userId: ${userId} for team with teamId: ${teamId}`,
      ip,
    });
    res.status(201).json({
      success: true,
      message: "Notice Created Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
