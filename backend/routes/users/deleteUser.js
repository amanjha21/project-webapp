const Schemas = require("../../models/index");
pipeline = require("../../helpers/pipeline");
module.exports = async (req, res) => {


  const userId = req.params.id;
  if (userId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  try {
    const user = await Schemas.User.findOne({
      _id: userId
    }).exec();
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User doesnot exist!!",

      });

    }
    const userDetails = await Schemas.User.aggregate(pipeline.userDetails(userId));

    await deleteUser(userDetails[0]);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Invalid Request",
    });
  }
};
const deleteUser = async (userId) => {
  try {
    //delete userReactions
    const userReactionArray = userDetails.reactions;
    await Schemas.Reaction.deleteMany({
      _id: {
        $in: noticeIdArray
      },
    });
    //delete userPosts
    const userPostArray = userDetails.Posts;
    await Schemas.Post.deleteMany({
      _id: {
        $in: userPostArray
      }
    });
    //delete user
    const user = userDetails._id;
    await Schemas.User.deleteOne({
      _id: user
    });
    //delete User Credentials
    await Schemas.User_Credential.deleteOne({
      _id: user
    });
  } catch (err) {
    throw err;

  }

}