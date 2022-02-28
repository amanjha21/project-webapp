const Schemas = require("../../models/index");
module.exports = async (userId, teamId) => {
  const team = await Schemas.Team.findOne({
    _id: teamId,
    moderator: userId,
  });
  if (!team) return false;
  return true;
};
