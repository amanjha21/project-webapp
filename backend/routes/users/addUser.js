const Schemas = require("../../models/index");

module.exports = async (req, res) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const organisation = req.body.organization;
  const team = req.body.team || [];
  try {
    const result = await Schemas.User.findOne({
      email: userEmail,
    }).exec();

    if (result) {
      res.status(400).json({
        success: false,
        message: "User already exists ",
      });
    } else {
      const newUser = new Schemas.User({
        name: userName,
        email: userEmail,
        organization: organisation,
        teams: teams.push(team),
      });

      await newUser.save();
      res.status(202).json({
        success: true,
        message: "User creation successful",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create",
    });
  }
};