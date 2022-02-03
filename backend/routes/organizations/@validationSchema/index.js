const Joi = require("@hapi/joi");

const getOrganizationByIdValidation = Joi.object({
  organizationId: Joi.string().length(24).required(),
});

const getOrganizationsValidation = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(10).optional(),
});

const addOrganizationsValidation = Joi.object({
  name: Joi.string().required(),
  adminName: Joi.string().required(),
  adminEmail: Joi.string()
    .email({ minDomainSegments: 3, tlds: { allow: ["in"] } })
    .required(),
});

const updateOrganizationsValidation = Joi.object({
  organizationId: Joi.string().length(24).required(),
  name: Joi.string().optional(),
  email_format: Joi.string().optional(),
});

const deleteOrganizationsValidation = Joi.object({
  organizationId: Joi.string().length(24).required(),
});

module.exports = {
  getOrganizationByIdValidation,
  getOrganizationsValidation,
  addOrganizationsValidation,
  updateOrganizationsValidation,
  deleteOrganizationsValidation,
};
