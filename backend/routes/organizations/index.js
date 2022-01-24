const router = require("express").Router();
const Schemas = require("../../models/index");
const mongoose = require("mongoose");
const getOrganizationById = require("./getOrganizationById");
const getOrganizations = require("./getOrganizations");
const addOrganizations = require("./addOrganizations");
const updateOrganizations = require("./updateOrganizations");
const deleteOrganizations = require("./deleteOrganizations");

//Get Organization By Id
router.get("/:id", getOrganizationById);

//Get all Organizations
router.get("/", getOrganizations);

//Add Organization
router.post("/", addOrganizations);

//Update Organization
router.post("/update/:id" , updateOrganizations)

//Delete Organization
router.delete("/:id", deleteOrganizations);

module.exports = router;