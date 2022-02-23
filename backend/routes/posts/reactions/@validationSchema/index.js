const Joi = require("@hapi/joi");

const addCommentValidation = Joi.object({
  comment: Joi.string().required(),

  postId: Joi.string().length(24).required(),
});

const deleteCommentValidation = Joi.object({
  postId: Joi.string().length(24).required(),
  comment: Joi.string().required(),
});

const updateCommentValidation = Joi.object({
  type: Joi.string().valid("like", "dislike").required(),

  postId: Joi.string().length(24).required(),
});

module.exports = {
  addCommentValidation,
  deleteCommentValidation,
  updateCommentValidation,
};
