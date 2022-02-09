const Schemas = require("../../../models/index");
const logger = require("../../../helpers/logger");
module.exports = async (req, res) => {
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const comment = req.body.comment;
  const user = req.user._id;
  const notice = req.body.noticeId;
  try {
    const dbNotice = await Schemas.Notice.findOne({ _id: notice });
    if (!dbNotice)
      return res
        .status(400)
        .json({ success: false, message: "notice doesn't exist!" });

    const teamId = dbNotice.team;
    const hasAuth =
      (await auth.isMemberOfTeam(user, teamId)) ||
      (await auth.isModeratorOfTeam(user, teamId)) ||
      (await auth.isAdminOfTeam(user, teamId));
    if (!hasAuth)
      return res.status(401).json({
        success: false,
        message: "you donot have auth to access this resource",
      });
    const reaction = Schemas.Notice_Reaction({
      type: "comment",
      comment: comment,
      notice,
      user: user,
    });
    await reaction.save();
    logger({
      userId: user,
      message: `A comment with comment id ${reaction._id}was created successfully with userId: ${user} `,
      ip,
    });
    res.status(201).json({
      success: true,
      message: "Reaction added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
