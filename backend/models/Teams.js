const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
  name: String,
  organization: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Organizations",
  },
  manager: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
});
module.exports = mongoose.model("Teams", teamSchema);
