const router = require("express").Router();
const getLogs = require("./getLogs");
const getLogsByUserId = require("./getLogsByUserId");
const validation = require("../../middlewares/validation");
const validationSchema = require("./@validationSchema");
//get all Logs with pagination route
router.get("/", validation(validationSchema.getLogs), getLogs);
//get all Logs with pagination using usreId route
router.get("/user/:id", validation(validationSchema.getLogs), getLogsByUserId);
module.exports = router;
