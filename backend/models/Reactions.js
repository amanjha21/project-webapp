const mongoose = require("mongoose");
const reactionSchema = new mongoose.Schema(
  {
    type: String,
    comment: String,
    post: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Posts",
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Reactions", reactionSchema);
