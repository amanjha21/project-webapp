const router = require("express").Router();
const Schemas = require("../../models/index");
const mongoose = require("mongoose");
const getOrganizations = require("./getOrganizations");
const addOrganizations = require("./addOrganizations");
const updateOrganizations = require("./updateOrganizations");
const deleteOrganizations = require("./deleteOrganizations");

//Get Organization
router.get("/:id", getOrganizations);

//Add Organization
router.post("/", addOrganizations);

//Update Organization
router.post("/update/:id" , updateOrganizations)

//Delete Organization
router.delete("/:id", deleteOrganizations);

module.exports = router;