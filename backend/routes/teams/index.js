const router = require("express").Router();
const Schemas = require("../../models/index");
const mongoose = require("mongoose");
const getTeamById = require("./getTeamById");
const getTeams = require("./getTeams");
const getTeamsByOrganizationId = require("./getTeamsByOrganizationId");
const getTeamsByUserId = require("./getTeamsByUserId");
const addTeams = require("./addTeams");
const updateTeams = require("./updateTeams");
const deleteTeams = require("./deleteTeams");

//Get Team By Id
router.get("/:id", getTeamById);

//Get all Teams
router.get("/", getTeams);

//Get Teams By OrganizationId
router.get("/organization/:id", getTeamsByOrganizationId);

//Get Teams By UserId
router.get("/user/:id", getTeamsByUserId);

//Add Team
router.post("/", addTeams);

//Update Team
router.post("/update/:id", updateTeams);

//Delete Team
router.delete("/:id", deleteTeams);

module.exports = router;
