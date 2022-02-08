require("dotenv").config();
require("./helpers/dbconnect");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes/index");

//Express Parser
app.use(express.urlencoded({
  limit: "50mb",
  extended: true
}));

//Routes
app.use("/", routes);

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome, This is App's Backend"
  });
});

//Server Start
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));