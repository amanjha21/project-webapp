const Schemas = require("../../../models/index");
module.exports = async (req, res) => {
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
