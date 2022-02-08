const Schemas = require("../../../models/index");
const logger = require("../../../helpers/logger");
module.exports = async (req, res) => {
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const comment = req.body.comment || "";
  const user = req.body.userId;
  const notice = req.body.noticeId || "61ee718fd7fc519c375e7eca";
  try {
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