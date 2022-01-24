const router = require("express").Router();
const Schemas = require("../../models/index");
const mongoose = require("mongoose");
const getTeamById = require("./getTeamById");
const getTeams = require("./getTeams");
const addTeams = require("./addTeams");
const updateTeams = require("./updateTeams");
const deleteTeams = require("./deleteTeams");

//Get Organization By Id
//router.get("/:id", getTeamById);

//Get all Organizations
router.get("/", getTeams);

//Add Organization
router.post("/", addTeams);

//Update Organization
//router.post("/update/:id" , updateTeams)

//Delete Organization
router.delete("/:id", deleteTeams);

module.exports = router;