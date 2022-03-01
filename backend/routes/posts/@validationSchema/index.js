const Joi = require("@hapi/joi");
const addPostValidation = Joi.object({
  content: Joi.string().required(),
});
const getPosts = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).optional(),
});
const updatePostValidation = Joi.object({
  postId: Joi.string().length(24).required(),
  content: Joi.string().optional(),
  deleteImageUrl: Joi.boolean().optional(),
});
module.exports = {
  addPostValidation,
  getPosts,
  updatePostValidation,
};
