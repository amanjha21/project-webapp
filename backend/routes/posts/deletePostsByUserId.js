const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");
module.exports = async (req, res) => {
  const userId = req.body.userId || "61f2df2099088e5c1c0cb5f3";
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
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    if (result.length == 0) {
      return res.status(400).json({
        success: false,
        message: `Post/s doesn't exist`,
      });
    } else {
      const postIdArray = result[0].posts;
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
    console.log(err);
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
