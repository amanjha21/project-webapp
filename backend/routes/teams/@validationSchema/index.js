const Joi = require("@hapi/joi");

const getTeamByIdValidation = Joi.object({
  teamId: Joi.string().length(24).required(),
});

const getTeamsValidation = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(10).optional(),
});

const getTeamsByOrganizationIdValidation = Joi.object({
  organizationId: Joi.string().length(24).required(),
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(10).optional(),
});

const addTeamsValidation = Joi.object({
  name: Joi.string().required(),
  organization: Joi.string().required(),
  admin: Joi.string().length(24).required(),
  moderator: Joi.array().items(Joi.string().length(24)).optional(),
});

const updateTeamsValidation = Joi.object({
  name: Joi.string().optional(),
  admin: Joi.string().length(24).optional(),
  moderator: Joi.string().length(24).optional(),
});

const deleteTeamByIdValidation = Joi.object({
  teamId: Joi.string().length(24).required(),
});

module.exports = {
  getTeamByIdValidation,
  getTeamsValidation,
  getTeamsByOrganizationIdValidation,
  addTeamsValidation,
  updateTeamsValidation,
  deleteTeamByIdValidation,
};
