const Schemas = require("../../models/index");
module.exports = async (userId, teamId) => {
  const user = await Schemas.User.findOne({
    _id: userId,
    team: { $elemMatch: teamId },
  });
  if (user.length == 0) return false;
  return true;
};
