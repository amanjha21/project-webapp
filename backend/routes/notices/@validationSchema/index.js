const Joi = require("@hapi/joi");
const addNoticeValidation = Joi.object({
  teamId: Joi.string().length(24).required(),
  content: Joi.string().required(),
});

const deleteNoticesByTeamIdValidation = Joi.object({
  teamId: Joi.string().length(24).required(),
});
const getNoticesByTeamId = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).optional(),
});
const getNoticesByUserId = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).optional(),
});
const updateNoticeValidation = Joi.object({
  noticeId: Joi.string().length(24).required(),
  content: Joi.string().optional(),
  deleteImageUrl: Joi.boolean().optional(),
});
module.exports = {
  addNoticeValidation,
  getNoticesByTeamId,
  updateNoticeValidation,
  deleteNoticesByTeamIdValidation,
  getNoticesByUserId,
};
