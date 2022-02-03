const Joi = require("@hapi/joi");
const addNoticeValidation = Joi.object({
  userId: Joi.string().length(24).required(),
  teamId: Joi.string().length(24).required(),
  content: Joi.string().required(),
  imageData: Joi.array().items(Joi.string()).optional(),
});
const deleteNoticeByIdValidation = Joi.object({
  userId: Joi.string().length(24).required(),
});
const deleteNoticesByUserIdValidation = Joi.object({
  userId: Joi.string().length(24).required(),
});
const deleteNoticesByTeamIdValidation = Joi.object({
  teamId: Joi.string().length(24).required(),
});
const getNotices = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).optional(),
});
const updateNoticeValidation = Joi.object({
  userId: Joi.string().length(24).required(),
  noticeId: Joi.string().length(24).required(),
  content: Joi.string().optional(),
  imageData: Joi.array().items(Joi.string()).optional(),
});
module.exports = {
  addNoticeValidation,
  deleteNoticeByIdValidation,
  getNotices,
  updateNoticeValidation,
  deleteNoticesByUserIdValidation,
  deleteNoticesByTeamIdValidation,
};
