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
const signUp = require("../auth/user/signup");
const updateUserPassword = require("./updateUserPassword");
const verifyToken = require("../../middlewares/verifyToken");
const addUserVerifyEmail = require("./addUserVerifyEmail");
const verifyApproveToken = require("../../middlewares/verifyApproveToken");

// get user route
router.get(
  "/:id",
  validation(validationSchema.getUserValidation, "query"),
  getUserById
);

router.post(
  "/updatePassword/:id",
  validation(validationSchema.updateUserPasswordValidation),
  verifyToken,
  updateUserPassword
);
router.get("/add/:token", verifyApproveToken, addUser, signUp);
// create user route
router.post(
  "/register",
  validation(validationSchema.addUserValidation),
  addUserVerifyEmail
);
// update user route
router.post(
  "/update/:id",
  validation(validationSchema.updateUserValidation),
  verifyToken,
  updateUser
);
// delete user route
router.delete(
  "/:id",
  validation(validationSchema.deleteUserValidation, "query"),
  verifyToken,
  deleteUser
);
// get user by TeamId route
router.get(
  "/team/:id",
  validation(validationSchema.getUsersByTeamId),
  verifyToken,
  getUsersByTeamId
);
// get user by OrganizationId router
router.get(
  "/organization/:id",
  validation(validationSchema.getUsersByOrgainzationId),
  verifyToken,
  getUsersByOrganizationId
);

module.exports = router;
