const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");

module.exports = async (req, res) => {
  const userId = "61eaeee6ef856a79a71d19b9" || 0;
  const page = parseInt(req.query.page);
  const noOfPosts = parseInt(req.query.limit);
  try {
    const notices = await Schemas.Notice.aggregate(
      pipeline.notices(userId, page, noOfPosts)
    );
    if (notices.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }
    res.status(200).json(notices);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
