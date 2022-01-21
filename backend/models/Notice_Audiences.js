const mongoose = require("mongoose");
const notice_audienceSchema = new mongoose.Schema({
  notice: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Notices",
  },
  audience: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
});
module.exports = mongoose.model("Notice_Audiences", notice_audienceSchema);
