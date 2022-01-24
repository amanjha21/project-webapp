const router = require("express").Router();
const Schemas = require("../../models/index");
const mongoose = require("mongoose");
const getOrganizations = require("./getOrganizations");
const addOrganizations = require("./addOrganizations");
const updateOrganizations = require("./updateOrganizations");
const deleteOrganizations = require("./deleteOrganizations");

//Get Organization
router.get("/", getOrganizations);

//Add Organization
router.post("/", addOrganizations);

//Update Organization
router.post("/update" , updateOrganizations)

//Delete Organization
router.delete("/", deleteOrganizations);

module.exports = router;