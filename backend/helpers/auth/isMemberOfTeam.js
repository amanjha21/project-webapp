const Schemas = require("../../models/index");
module.exports = async (userId, teamId) => {
  const user = await Schemas.User.findOne({
    _id: userId,
    team: teamId,
  });
  if (!user) return false;
  return true;
};
