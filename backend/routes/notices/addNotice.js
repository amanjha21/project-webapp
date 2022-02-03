const Schemas = require("../../models/index");
const uploader = require("../../helpers/uploader");
module.exports = async (req, res) => {
  const userId = req.body.userId || "61eaeee6ef856a79a71d19b9";
  const teamId = req.body.teamId || "61f2de8599088e5c1c0cb5ea";
  const content = req.body.content || "abloj";
  const imageData = req.body.imageData;
  try {
    const notice = new Schemas.Notice({
      content,
      image_link: "",
      user: userId,
      team: teamId,
    });
    if (imageData) {
      let imageUrl = await Promise.all(
        imageData.map(async (data) => {
          const url = await uploader(data);
          return url;
        })
      );
      notice.image_link = imageUrl;
    }

    await notice.save();
    res.status(201).json({
      success: true,
      message: "Notice Created Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
