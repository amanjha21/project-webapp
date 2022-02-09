const Joi = require("@hapi/joi");

const addCommentValidation = Joi.object({
  noticeId: Joi.string().length(24).required(),
  comment: Joi.string().required(),
});

const deleteCommentValidation = Joi.object({
  noticeId: Joi.string().length(24).required(),
  comment: Joi.string().required(),
});

const updateCommentValidation = Joi.object({
  noticeId: Joi.string().length(24).required(),
  type: Joi.string().required(),
});

module.exports = {
  addCommentValidation,
  deleteCommentValidation,
  updateCommentValidation,
};
