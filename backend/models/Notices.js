const mongoose = require("mongoose");
const noticeSchema = new mongoose.Schema(
  {
    content: String,
    image_link: [String],
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Notices", noticeSchema);
