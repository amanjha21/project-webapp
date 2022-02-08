const Schemas = require("../../models/index");

module.exports = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  page--;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const organization = await Schemas.Organization.find()
      .sort({ name: 1 })
      .skip(page * limit)
      .limit(limit)
      .exec();

    if (organization.length == 0 || !organization) {
      return res.status(400).json({
        success: false,
        message: "No Organization To Show",
      });
    }

    res.status(200).json(organization);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
