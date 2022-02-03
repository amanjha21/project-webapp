const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");

module.exports = async (req, res) => {
  const noticeId = req.params.id;
  const userId = "61eaeee6ef856a79a71d19b9";
  if (noticeId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  try {
    const notice = await Schemas.Notice.aggregate(
      pipeline.postById(noticeId, userId)
    );
    if (notice.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }
    res.status(200).json(notice);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
