const Joi = require("@hapi/joi");

const addUserValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),


});

const deleteUserValidation = Joi.object({
    id: Joi.string().length(24).required(),
});
const updateUserValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    teams: Joi.array().items(Joi.string().length(24)),
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
};