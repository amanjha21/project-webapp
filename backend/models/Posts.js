const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  content: String,
  image_link: [String],
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
});
module.exports = mongoose.model("Posts", postSchema);
