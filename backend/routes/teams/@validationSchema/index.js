const Joi = require("@hapi/joi");

const getTeamsValidation = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(10).optional(),
});

const getTeamsByOrganizationIdValidation = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(10).optional(),
});

const addTeamsValidation = Joi.object({
  name: Joi.string().required(),
});

const addUserInTeamValidation = Joi.object({
  teamId: Joi.string().length(24).required(),
  email: Joi.string()
    .email({ minDomainSegments: 3, tlds: { allow: ["in"] } })
    .required(),
});

const removeUserFromTeamValidation = Joi.object({
  member: Joi.string().length(24).required(),
});

const updateTeamsValidation = Joi.object({
  imageData: Joi.string().optional(),
  name: Joi.string().optional(),
  description: Joi.string().max(150).optional(),
  admin: Joi.string().length(24).optional(),
  moderator: Joi.string().length(24).optional(),
});

module.exports = {
  getTeamsValidation,
  getTeamsByOrganizationIdValidation,
  addTeamsValidation,
  updateTeamsValidation,
  removeUserFromTeamValidation,
  addUserInTeamValidation,
};
