require("dotenv").config();
const mongoose = require("mongoose");

function dbConnect() {
  mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
  });
  //   mongoose.Promise = Promise;
  mongoose.connection.on("connected", () => {
    console.log(`Connected to the Database`);
  });
  mongoose.connection.on("error", (err) => {
    console.log(`Connection to the Database Failed: ${err}`);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from the Database");
  });
}

module.exports = dbConnect();