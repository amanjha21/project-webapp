const router = require("express").Router();
const Schemas = require("../../models/index");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const uploader = require("../../helpers/uploader");
const createUser = require("./addUser");
const deleteUser = require("./deleteUser");
const getUser = require("./getUser");
const updateUser = require("./updateUser");

// get user route
router.get("/:id", getUser);
// create user route
router.post("/register", createUser);
// update user route
router.post("/update/:id", updateUser);
// delete user route
router.delete("/:id", deleteUser);

module.exports = router;