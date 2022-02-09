const Joi = require("@hapi/joi");

const addCommentValidation = Joi.object({
  notice: Joi.string().length(24).required(),
  comment: Joi.string().required(),
});

const deleteCommentValidation = Joi.object({
  notice: Joi.string().length(24).required(),
  comment: Joi.string().required(),
});

const updateCommentValidation = Joi.object({
  notice: Joi.string().length(24).required(),
  type: Joi.string().required(),
});

module.exports = {
  addCommentValidation,
  deleteCommentValidation,
  updateCommentValidation,
};
