const router = require("express").Router();
const getTeamById = require("./getTeamById");
const getTeams = require("./getTeams");
const getTeamsByOrganizationId = require("./getTeamsByOrganizationId");
const addTeams = require("./addTeams");
const updateTeams = require("./updateTeams");
const deleteTeamById = require("./deleteTeamById");
const validation = require("../../middlewares/validation");
const validationSchema = require("./@validationSchema");

//Get Team By Id
router.get(
  "/:id",
  validation(validationSchema.getTeamByIdValidation),
  getTeamById
);

//Get all Teams
router.get(
  "/",
  validation(validationSchema.getTeamsValidation, "query"),
  getTeams
);

//Get Teams By OrganizationId
router.get(
  "/organization/:id",
  validation(validationSchema.getTeamsByOrganizationIdValidation, "query"),
  getTeamsByOrganizationId
);

//Add Team
router.post("/", validation(validationSchema.addTeamsValidation), addTeams);

//Update Team
router.post(
  "/update/:id",
  validation(validationSchema.updateTeamsValidation),
  updateTeams
);

//Delete Team
router.delete(
  "/:id",
  validation(validationSchema.deleteTeamByIdValidation),
  deleteTeamById
);

module.exports = router;
