const Joi = require("@hapi/joi");
const login = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 3, tlds: { allow: ["in"] } })
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});
module.exports = {
  login,
};
