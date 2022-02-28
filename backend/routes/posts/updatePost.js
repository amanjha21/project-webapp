const Schemas = require("../../models/index");
const uploadImage = require("../../helpers/uploadImage");
const deleteImage = require("../../helpers/deleteImage");
const logger = require("../../helpers/logger");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const postId = req.body.postId;
  const content = req.body.content;
  const imageData = req.files;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  try {
    if (!content && !imageData) {
      throw new Error("Nothing to update");
    }
    //check if this post exists and belongs to this user
    const post = await Schemas.Post.findOne({ _id: postId }).exec();
    if (!post || post.user != userId) {
      throw new Error("Post doesn't exist");
    }

    //update content if exists
    if (content && content != post.content) {
      post.content = content;
    }
    // if image data exists
    if (imageData.length > 0) {
      // delete old images
      deleteImage("", post.image_link);
      //add new images
      let imageUrl = await Promise.all(
        imageData.map(async (data) => {
          const url = await uploadImage(data, `/user/${userId}/post-images/`);
          return url;
        })
      );
      post.image_link = imageUrl;
    }
    await post.save();
    logger({
      userId: userId,
      message: `Post Updated with postId: ${postId} by user with userId: ${userId} `,
      ip,
    });
    res.status(200).json({
      success: true,
      message: "Post Updated Successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
