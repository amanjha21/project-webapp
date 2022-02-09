const Schemas = require("../../models/index");
module.exports = async (req, res) => {
  const organizationId = req.params.id;
  let page = parseInt(req.query.page) || 1;
  page--;
  const limit = parseInt(req.query.limit) || 10;
  if (organizationId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  const reqUser = req.user._id;
  console.log(reqUser);
  try {
    const dbUser = await Schemas.User.findOne({ _id: reqUser });
    if (dbUser.organization !== organizationId)
      return res.status(400).json({ success: false, message: "access denied" });
    const user = await Schemas.User.find({
      organization: organizationId,
    })
      .sort({ name: 1 })
      .skip(page * limit)
      .limit(limit)
      .exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesnot exist",
      });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
