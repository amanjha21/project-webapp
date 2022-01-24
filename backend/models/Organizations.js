const mongoose = require("mongoose");
const organizationSchema = new mongoose.Schema({
  name: String,
  email_format: String,
},
{
  timestamps: true
}
);
module.exports = mongoose.model("Organizations", organizationSchema);
