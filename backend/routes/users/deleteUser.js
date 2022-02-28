const Schemas = require("../../models/index");
pipeline = require("../../helpers/pipeline");
const logger = require("../../helpers/logger");
const deleteImage = require("../../helpers/deleteImage");
module.exports = async (req, res) => {
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const userId = req.user._id;
  const newAdminEmail = req.body.newAdminEmail;

  try {
    const user = await Schemas.User.findOne({
      _id: userId,
    }).exec();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesnot exist!!",
      });
    }
    const userDetails = await Schemas.User.aggregate(
      pipeline.userDetails(userId)
    );

    // if user is admin and hasnt passed successor adminId
    // send err request as new admin email required
    const adminCheck = await Schemas.Team.find({
      admin: userId,
    });
    if (adminCheck.length > 0) {
      if (!newAdminEmail || newAdminEmail == user.email) {
        return res.status(400).json({
          success: false,
          message: "new admin email required!!",
        });
      } else {
        const newAdmin = await Schemas.User.findOne(
          { email: newAdminEmail },
          { _id: 1 }
        );
        console.log(newAdmin._id);
        await Schemas.Team.updateMany(
          {
            admin: userId,
          },
          {
            admin: newAdmin._id,
          }
        );
      }
    }
    // check if moderator exists
    const modCheck = await Schemas.Team.find({
      moderator: {
        $in: userId,
      },
    });
    //if true  change userId of Notice to admin's userId of that particular team member//
    if (modCheck.length > 0) {
      const adminFetch = modCheck.map((obj) => obj.admin);
      for (let i = 0; i < modCheck.length; i++) {
        // find and update all the userId for the Notices sent by the mod to admin's id
        await Schemas.Notice.updateMany(
          {
            user: userId,
            team: modCheck[i]._id,
          },
          {
            user: adminFetch[i],
          }
        );

        await Schemas.Notice_Reaction.updateMany(
          {
            user: userId,
            team: modCheck[i]._id,
          },
          {
            user: adminFetch[i],
          }
        );

        const index = modCheck[i].moderator.indexOf(userId);
        modCheck[i].moderator.splice(index, 1);
      }
      await modCheck.save();
    }

    // change the userId for notices and notice_reactions sent by old admin to the newly appointed one

    // delete notice_reaction by userId of the mod

    await deleteUser(userDetails[0], user);

    logger({
      email: user.email,
      message: `User deleted successfully with userId: ${userId} `,
      ip,
    });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Invalid Request",
    });
  }
};
const deleteUser = async (userDetails, user) => {
  try {
    //delete userReactions
    const userReactionArray = userDetails.reactions;
    await Schemas.Reaction.deleteMany({
      _id: {
        $in: userReactionArray,
      },
    });
    //delete userPosts
    const userPostArray = userDetails.Posts;
    await Schemas.Post.deleteMany({
      _id: {
        $in: userPostArray,
      },
    });
    userDetails.imageUrl.map((imageUrlArray) => {
      deleteImage("", imageUrlArray);
    });
    //delete user

    await Schemas.User.deleteOne({
      _id: userDetails._id,
    });

    deleteImage(user.imageUrl);

    //delete User Credentials
    await Schemas.User_Credential.deleteOne({
      _id: userDetails._id,
    });
  } catch (err) {
    throw err;
  }
};
