require("dotenv").config();
require("./helpers/dbconnect");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes/index");

const cors = require("cors");
const helmet = require("helmet");
const responseTime = require("response-time");

const multer = require("multer");
const upload = multer();

const compression = require("compression");

//gzip compression
app.use(compression());

// Set security headers
app.use(helmet());

// CORS
const corsOptions = {
  exposedHeaders: "authorization",
};
app.use(cors(corsOptions));

// Response time
app.use(responseTime({ suffix: false }));

//Express Parser
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
// for parsing multipart/form-data
app.use(upload.array("imageData"));

//Routes
app.use("/", routes);

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome, This is App's Backend",
  });
});

//Server Start
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
