const Joi = require("@hapi/joi");
const addUserValidation = Joi.Object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    organization: Joi.string().length(24).required(),
    team: Joi.string().length(24).required(),
});

const deleteUserValidation = Joi.Object({
    id: Joi.string().length(24).required(),
});
const updateUserValidation = joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    teams: Joi.array().items(Joi.string().length(24)),
});

const getUserValidation = Joi.Object({
    id: Joi.string().length(24),

});