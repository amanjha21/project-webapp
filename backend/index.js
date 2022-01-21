require("dotenv").config();
require("./helpers/dbconnect");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes/index");

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/", routes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
