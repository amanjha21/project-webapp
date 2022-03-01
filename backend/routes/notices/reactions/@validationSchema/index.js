const Joi = require("@hapi/joi");

const addCommentValidation = Joi.object({
  noticeId: Joi.string().length(24).required(),
  comment: Joi.string().required(),
});

const deleteCommentValidation = Joi.object({
  id: Joi.string().length(24).required(),
});

const updateCommentValidation = Joi.object({
  noticeId: Joi.string().length(24).required(),
  type: Joi.string().valid("like", "dislike").required(),
});
const getCommentsValidation = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});
module.exports = {
  addCommentValidation,
  deleteCommentValidation,
  updateCommentValidation,
  getCommentsValidation,
};
