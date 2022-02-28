const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");
const deleteImage = require("../../helpers/deleteImage");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  try {
    //find all posts by this userId and get a array of postId
    const result = await Schemas.Post.aggregate([
      {
        $match: {
          user: new ObjectId(userId),
        },
      },
      {
        $group: {
          _id: "post",
          posts: {
            $push: "$_id",
          },
          imageUrl: {
            $push: "$image_link",
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    if (result.length == 0) {
      throw new Error("Post/s doesn't exist");
    } else {
      const postIdArray = result[0].posts;
      result[0].imageUrl.map((linkArray) => {
        deleteImage("", linkArray);
      });
      await deletePostsByUserId(postIdArray);
      logger({
        userId: userId,
        message: `All Posts by user with userId: ${userId} Deleted `,
        ip,
      });
      res.status(200).json({
        success: true,
        message: "Post/s deleted successfully",
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

const deletePostsByUserId = async (postIdArray) => {
  try {
    //delete post reactions
    await Schemas.Reaction.deleteMany({
      post: { $in: postIdArray },
    });
    //delete post/s
    await Schemas.Post.deleteMany({
      _id: { $in: postIdArray },
    });
  } catch (error) {
    throw error;
  }
};
