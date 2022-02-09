const Schemas = require("../../models/index");
const uploader = require("../../helpers/uploader");
const logger = require("../../helpers/logger");
const auth = require("../../helpers/auth/index");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const teamId = req.body.teamId;
  const content = req.body.content;
  const imageData = req.body.imageData;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const hasAuth =
    (await auth.isAdminOfTeam(userId, teamId)) ||
    (await auth.isModeratorOfTeam(userId, teamId));
  if (!hasAuth)
    return res.status(401).json({
      success: false,
      message: "you donot have auth to access this resource",
    });
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
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
