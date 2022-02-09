const Joi = require("@hapi/joi");

const addUserValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 3, tlds: { allow: ["in"] } })
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});
const updateUserPasswordValidation = Joi.object({
  oldPassword: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
  newPassword: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});

const updateUserValidation = Joi.object({
  name: Joi.string().optional(),
  teams: Joi.array().items(Joi.string().length(24)),
  newAdminId: Joi.string().email().optional(),
});

const resetUserPasswordValidation = Joi.object({
  newPassword: Joi.string().min(8).required(),
});
module.exports = {
  addUserValidation,
  updateUserValidation,
  updateUserPasswordValidation,
  resetUserPasswordValidation,
};
