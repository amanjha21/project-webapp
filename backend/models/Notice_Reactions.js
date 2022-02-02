const mongoose = require("mongoose");
const reactionSchema = new mongoose.Schema(
  {
    type: String,
    comment: String,
    notice: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Notices",
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
module.exports = mongoose.model("Notice_Reactions", reactionSchema);
