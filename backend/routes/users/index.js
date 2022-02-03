const router = require("express").Router();
const Schemas = require("../../models/index");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const uploader = require("../../helpers/uploader");
const addUser = require("./addUser");
const deleteUser = require("./deleteUser");
const getUserById = require("./getUserById");
const updateUser = require("./updateUser");
const getUsersByOrganizationId = require("./getUsersByOrganizationId");
const getUsersByTeamId = require("./getUsersByTeamId");
const validation = require("../../middlewares/validation");
const validationSchema = require("./@validationSchema");

// get user route
router.get("/:id", validation(validationSchema.getUserValidation, "query"), getUserById);
// create user route
router.post("/register", validation(validationSchema.addUserValidation), addUser);
// update user route
router.post("/update/:id", validation(validationSchema.updateUserValidation), updateUser);
// delete user route
router.delete("/:id", validation(validationSchema.deleteUserValidation, "query"), deleteUser);
// get user by TeamId route
router.get("/", validation(validationSchema.getUsersByTeamId), getUsersByTeamId);
// get user by OrganizationId router
router.get("/", validation(validationSchema.getUsersByOrgainzationId), getUsersByOrganizationId);


module.exports = router;