const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema(
  {
    name: String,
    organization: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Organizations",
    },
    admin: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
    moderator: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Teams", teamSchema);
