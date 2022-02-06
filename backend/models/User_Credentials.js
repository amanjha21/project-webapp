const mongoose = require("mongoose");
const userCredSchema = new mongoose.Schema({
  _id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
  email: String,
  password: String,
  token: String,
});
module.exports = mongoose.model("User_Credentials", userCredSchema);
