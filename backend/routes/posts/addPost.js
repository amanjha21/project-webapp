const Schemas = require("../../models/index");
const uploadImage = require("../../helpers/uploadImage");
const logger = require("../../helpers/logger");
module.exports = async (req, res) => {
  const userId = req.user._id;
  const content = req.body.content || "abcd";
  const imageData = req.files;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  try {
    const post = new Schemas.Post({
      content,
      image_link: "",
      user: userId,
    });
    if (imageData) {
      let imageUrl = await Promise.all(
        imageData.map(async (data) => {
          const url = await uploadImage(data);
          return url;
        })
      );
      post.image_link = imageUrl;
    }
    const newPost = await post.save();
    logger({
      userId: userId,
      message: `New Post Created with postId: ${newPost._id} by user with userId: ${userId} `,
      ip,
    });
    res.status(201).json({
      success: true,
      message: "Post Created Successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
