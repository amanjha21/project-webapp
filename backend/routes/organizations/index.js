const router = require("express").Router();
const getOrganizationById = require("./getOrganizationById");
const getOrganizations = require("./getOrganizations");
const addOrganizations = require("./addOrganizations");
const updateOrganizations = require("./updateOrganizations");
const deleteOrganizations = require("./deleteOrganizations");
const validation = require("../../middlewares/validation");
const validationSchema = require("./@validationSchema");

//Get Organization By Id
router.get(
  "/:id",
  validation(validationSchema.getOrganizationByIdValidation),
  getOrganizationById
);

//Get all Organizations
router.get(
  "/",
  validation(validationSchema.getOrganizationsValidation, "query"),
  getOrganizations
);

//Add Organization
router.post(
  "/",
  validation(validationSchema.addOrganizationsValidation),
  addOrganizations
);

//Update Organization
router.post(
  "/update/:id",
  validation(validationSchema.updateOrganizationsValidation),
  updateOrganizations
);

//Delete Organization
router.delete(
  "/:id",
  validation(validationSchema.deleteOrganizationsValidation),
  deleteOrganizations
);

module.exports = router;
