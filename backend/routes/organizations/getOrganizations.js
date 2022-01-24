module.exports = async (req, res) => {
  const organizationId = req.params.id;
  if (organizationId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  try {
    const organization = await Schemas.Reaction.aggregate(pipeline);
    if (organization.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
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