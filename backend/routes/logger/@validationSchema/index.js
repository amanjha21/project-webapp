const Joi = require("@hapi/joi");
const getLogs = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).optional(),
});
const getLogsByUserId = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).optional(),
});
module.exports = {
  getLogs,
  getLogsByUserId,
};
