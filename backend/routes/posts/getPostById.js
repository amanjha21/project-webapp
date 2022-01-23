module.exports = async (req, res) => {
  const postId = req.params.id;
  if (postId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
  try {
    const post = await Schemas.Reaction.aggregate(pipeline);
    if (post.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
