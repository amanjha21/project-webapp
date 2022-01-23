module.exports = async (req, res) => {
  const userId = req.body.userId || "61eaeee6ef856a79a71d19b9";
  const content = req.body.content || "abcd";
  const imageData = req.body.imageData;
  try {
    const post = new Schemas.Post({
      content,
      image_link: "",
      user: userId,
    });
    if (imageData) {
      let imageUrl = await Promise.all(
        imageData.map(async (data) => {
          const url = await uploader(data);
          return url;
        })
      );
      post.image_link = imageUrl;
    }

    await post.save();
    res.status(201).json({
      success: true,
      message: "Post Created Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
