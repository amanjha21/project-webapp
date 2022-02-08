const Joi = require("@hapi/joi");

const addUserValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).required(),

});
const updateUserPasswordValidation = Joi.object({
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required(),
})

const deleteUserValidation = Joi.object({
    id: Joi.string().length(24).required(),
});
const updateUserValidation = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    teams: Joi.array().items(Joi.string().length(24)),
    newAdminId: Joi.string().email().optional(),
});

const getUserValidation = Joi.object({
    id: Joi.string().length(24),

});

const getUsersByTeamId = Joi.object({
    teamId: Joi.string().length(24).required(),
})

const getUsersByOrgainzationId = Joi.object({
    organizationId: Joi.string().length(24).required(),
})
module.exports = {
    addUserValidation,
    deleteUserValidation,
    updateUserValidation,
    getUsersByTeamId,
    getUsersByOrgainzationId,
    getUserValidation,
    updateUserPasswordValidation,
};