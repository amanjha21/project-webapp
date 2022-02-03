const router = require("express").Router();
const Schemas = require("../../models/index");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const uploader = require("../../helpers/uploader");
const addUser = require("./addUser");
const deleteUser = require("./deleteUser");
const getUser = require("./getUser");
const updateUser = require("./updateUser");
const validation = require("../../helpers/validation");
const validationSchema = require("./@validationSchema");

// get user route
router.get("/:id", validation(validationSchema.getUserValidation, "query"), getUser);
// create user route
router.post("/register", validation(validationSchema.addUserValidation), addUser);
// update user route
router.post("/update/:id", validation(validationSchema.updateUserValidation), updateUser);
// delete user route
router.delete("/:id", validation(validationSchema.deleteUserValidation, "query"), deleteUser);

module.exports = router;