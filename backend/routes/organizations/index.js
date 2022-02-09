const router = require("express").Router();
const getOrganizationById = require("./getOrganizationById");
const getOrganizations = require("./getOrganizations");
const addOrganization = require("./addOrganization");
const updateOrganization = require("./updateOrganization");
const deleteOrganization = require("./deleteOrganization");
const addOrganizationRequest = require("./addOrganizationRequest");
const updateOrganizationRequest = require("./updateOrganizationRequest");
const deleteOrganizationRequest = require("./deleteOrganizationRequest");
const validation = require("../../middlewares/validation");
const validationSchema = require("./@validationSchema");
const verifyToken = require("../../middlewares/verifyToken");
const verifyApproveToken = require("../../middlewares/verifyApproveToken");

//Get Organization By Id
router.get("/:id", getOrganizationById);

//Get all Organizations
router.get(
  "/",
  validation(validationSchema.getOrganizationsValidation, "query"),
  getOrganizations
);

//Add Organization request
router.post(
  "/",
  validation(validationSchema.addOrganizationsValidation),
  addOrganizationRequest
);

//Update Organization request
router.post(
  "/update/:id",
  validation(validationSchema.updateOrganizationsValidation),
  verifyToken,
  updateOrganizationRequest
);

//Delete Organization request
router.delete("/:id", verifyToken, deleteOrganizationRequest);

//Add Organization with token
router.get("/add/token/:token", verifyApproveToken, addOrganization);

//Update Organization with token
router.get("/update/token/:token", verifyApproveToken, updateOrganization);

//Delete Organization with token
router.get("/delete/token/:token", verifyApproveToken, deleteOrganization);
module.exports = router;
