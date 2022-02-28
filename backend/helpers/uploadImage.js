const cloudinary = require("./cloudinary");
const sharp = require("sharp");
const uploadImage = async (data, folder = "") => {
  //file type check
  if (
    data.mimetype !== "image/jpeg" &&
    data.mimetype !== "image/png" &&
    data.mimetype !== "image/jpg"
  ) {
    throw new Error("unsupported image format");
  }
  if (data.size > 3155728) {
    throw new Error("file size must be <= 3MB");
  }
  //convert to jpg if png
  if (data.mimetype === "image/png") {
    data.buffer = await sharp(data.buffer)
      .flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .jpeg()
      .toBuffer();
  }
  //buffer to base 64
  const base64Data = "data:image/jpeg;base64," + data.buffer.toString("base64");
  //upload image
  const result = await cloudinary.uploader.upload(base64Data, {
    folder: `synoarx${folder}`,
  });
  return result.secure_url;
};

module.exports = uploadImage;
