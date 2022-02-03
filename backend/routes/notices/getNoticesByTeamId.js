const Schemas = require("../../models/index");
const pipeline = require("../../helpers/pipeline");

module.exports = async (req, res) => {
  //get team id from req.params
  const teamId = req.params.id || "61eaeee6ef856a79a71d19b9";
  const currentUserId = "61eaeee6ef856a79a71d19b9";
  const page = parseInt(req.query.page);
  const noOfPosts = parseInt(req.query.number);
  if (teamId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  try {
    const notices = await Schemas.Notice.aggregate(
      pipeline.noticesByTeamId(teamId, currentUserId, page, noOfPosts)
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
