const Schemas = require("../../models/index");
require("dotenv");
module.exports = async (req, res) => {
  let page = req.query.page || 1;
  page--;
  const noOfPosts = req.query.limit || process.env.DEFAULT_NO_OF_LOGS;

  try {
    const result = await Schemas.Logger.find(
      {},
      { _id: 0, updatedAt: 0, __v: 0 }
    )
      .sort({ createdAt: -1 })
      .skip(page * noOfPosts)
      .limit(noOfPosts)
      .exec();
    if (result.length == 0) {
      return res.status(404).json({
        success: false,
        message: "Invalid request",
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
