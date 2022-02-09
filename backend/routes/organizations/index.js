const router = require("express").Router();
const getOrganizationById = require("./getOrganizationById");
const getOrganizations = require("./getOrganizations");
const addOrganizations = require("./addOrganizations");
const updateOrganizations = require("./updateOrganizations");
const deleteOrganizations = require("./deleteOrganizations");
const validation = require("../../middlewares/validation");
const validationSchema = require("./@validationSchema");
const verifyToken = require("../../middlewares/verifyToken");

//Get Organization By Id
router.get(
  "/:id",
  validation(validationSchema.getOrganizationByIdValidation, "query"),
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
  verifyToken,
  updateOrganizations
);

//Delete Organization
router.delete(
  "/:id",
  validation(validationSchema.deleteOrganizationsValidation, "query"),
  verifyToken,
  deleteOrganizations
);

module.exports = router;
