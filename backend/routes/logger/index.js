const router = require("express").Router();
const getLogs = require("./getLogs");
const getLogsByUserId = require("./getLogsByUserId");
const validation = require("../../middlewares/validation");
const validationSchema = require("./@validationSchema");
const verifyToken = require("../../middlewares/verifyToken");

//get all Logs with pagination route
router.get("/", validation(validationSchema.getLogs), verifyToken, getLogs);

//get all Logs with pagination using usreId route
router.get(
  "/user/:id",
  validation(validationSchema.getLogs),
  verifyToken,
  getLogsByUserId
);
module.exports = router;
