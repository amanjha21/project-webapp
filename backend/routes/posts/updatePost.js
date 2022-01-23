module.exports = async (req, res) => {
  const userId = req.body.userId || "61eaeee6ef856a79a71d19b9";
  const postId = req.body.postId || "61eb01253b5a09f2341e84b0";
  const content = req.body.content;
  const imageData = req.body.imageData;

  if (!content && !imageData) {
    return res.status(403).json({
      success: false,
      message: "Nothing to update",
    });
  }
  try {
    //check if this post exists and belongs to this user
    const post = await Schemas.Post.findOne({ _id: postId }).exec();
    if (!post) {
      return res.status(400).json({
        success: false,
        message: `Post doesn't exist`,
      });
    }
    if (post.user != userId) {
      return res.status(403).json({
        success: false,
        message: "Post doesn't exist ",
      });
    }
    //update content if exists
    if (content) {
      post.content = content;
    }
    // update image if exixts
    if (imageData) {
      let imageUrl = await Promise.all(
        imageData.map(async (data) => {
          const url = await uploader(data);
          return url;
        })
      );
      post.image_link = imageUrl;
      console.log(post);
    }
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
