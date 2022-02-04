const mongoose = require("mongoose");
const loggerSchema = new mongoose.Schema(
  {
    email: String,
    message: String,
    ip: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Logger", loggerSchema);
