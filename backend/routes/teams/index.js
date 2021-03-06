const router = require("express").Router();
const getTeamById = require("./getTeamById");
const getTeams = require("./getTeams");
const getTeamsByOrganizationId = require("./getTeamsByOrganizationId");
const addTeams = require("./addTeams");
const updateTeams = require("./updateTeams");
const removeUserFromTeam = require("./removeUserFromTeam");
const addUserInTeamsRequest = require("./addUserInTeamsRequest");
const addUserInTeams = require("./addUserInTeams");
const deleteTeamById = require("./deleteTeamById");
const validation = require("../../middlewares/validation");
const validationSchema = require("./@validationSchema");
const verifyToken = require("../../middlewares/verifyToken");
const verifyApproveToken = require("../../middlewares/verifyApproveToken");

//Get Team By Id
router.get("/:id", getTeamById);

//Get all Teams
router.get(
  "/",
  validation(validationSchema.getTeamsValidation, "query"),
  getTeams
);

//Get Teams By OrganizationId
router.get("/organization/:id", getTeamsByOrganizationId);

//Add Team
router.post(
  "/",
  validation(validationSchema.addTeamsValidation),
  verifyToken,
  addTeams
);

//Update Team
router.post(
  "/update/:id",
  validation(validationSchema.updateTeamsValidation),
  verifyToken,
  updateTeams
);

//addUserInTeamRequest
router.post(
  "/add-member-request",
  validation(validationSchema.addUserInTeamValidation),
  verifyToken,
  addUserInTeamsRequest
);

//addUserInTeam
router.get("/add-member-confirm/:token", verifyApproveToken, addUserInTeams);

//removeUserFromTeam
router.post(
  "/remove/:id",
  validation(validationSchema.removeUserFromTeamValidation),
  verifyToken,
  removeUserFromTeam
);

//Delete Team
router.delete("/:id", verifyToken, deleteTeamById);

module.exports = router;
