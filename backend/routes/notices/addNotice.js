const Schemas = require("../../models/index");
const uploadImage = require("../../helpers/uploadImage");
const logger = require("../../helpers/logger");
const auth = require("../../helpers/auth/index");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const teamId = req.body.teamId;
  const content = req.body.content;
  const imageData = req.files;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  try {
    const hasAuth =
      (await auth.isAdminOfTeam(userId, teamId)) ||
      (await auth.isModeratorOfTeam(userId, teamId));
    if (!hasAuth)
      throw new Error("you donot have auth to access this resource");
    const notice = new Schemas.Notice({
      content,
      image_link: "",
      user: userId,
      team: teamId,
    });
    if (imageData.length > 0) {
      let imageUrl = await Promise.all(
        imageData.map(async (data) => {
          const url = await uploadImage(data, `/team/${teamId}/notice-images/`);
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
