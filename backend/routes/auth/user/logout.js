const Schemas = require("../../../models/index");

module.exports = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await Schemas.User_Credential.findOne({ _id: userId });

    user.token = "";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
