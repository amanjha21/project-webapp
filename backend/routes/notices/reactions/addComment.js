const Schemas = require("../../../models/index");
module.exports = async (req, res) => {
  const comment = req.body.comment;
  const user = req.user._id;
  const notice = req.body.noticeId;
  try {
    const dbNotice = await Schemas.Notice.findOne({ _id: notice });
    if (!dbNotice) throw new Error("Notice doesnt exist");

    const teamId = dbNotice.team;

    const hasAuth =
      (await auth.isMemberOfTeam(user, teamId)) ||
      (await auth.isModeratorOfTeam(user, teamId)) ||
      (await auth.isAdminOfTeam(user, teamId));

    if (!hasAuth)
      throw new Error("you donot have auth to access this resource");

    const reaction = Schemas.Notice_Reaction({
      type: "comment",
      comment: comment,
      notice,
      user: user,
    });
    await reaction.save();
    res.status(201).json({
      success: true,
      message: "Reaction added successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
