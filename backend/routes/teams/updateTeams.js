const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");
const uploadImage = require("../../helpers/uploadImage");
const deleteImage = require("../../helpers/deleteImage");

module.exports = async (req, res) => {
  const teamId = req.params.id;
  const profileImage = req.files;
  const name = req.body.name;
  const description = req.body.description;
  const admin = req.body.admin;
  const moderator = req.body.moderator;
  const userId = req.user._id;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  //check if teamId is valid
  if (teamId.length != 24) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }

  //check if there is somthing to update
  if (!name && !admin && !moderator && !profileImage && !description) {
    return res.status(403).json({
      success: false,
      message: "Nothing to update",
    });
  }

  try {
    //check if team exists
    const team = await Schemas.Team.findOne({
      _id: teamId,
    }).exec();

    if (!team) {
      throw new Error("Team doesn't exist");
    }

    const organization = await Schemas.Organization.findOne({
      _id: team.organization,
    });

    //check if logged in user is admin
    if (userId != team.admin) {
      throw new Error("Access Denied");
    }

    //if profileImage == 0 delete team.imageUrl else if profileImage then update team.imageUrl

    if (profileImage === "0") {
      deleteImage(team.teamUrl, "");
      team.imageUrl = "";
      await team.save();
    } else if (profileImage.length > 0) {
      const url = await uploadImage(data, `/team/${teamId}`);
      //Save url in database
      team.imageUrl = url;
      await team.save();
    }

    //check if team name is not same as team.organization name
    if (team.name == organization.name && name != team.name) {
      throw new Error("Access Denied");
    } else {
      //update team.name
      if (name && name != team.name) {
        team.name = name;
        await team.save();
      }
    }

    //updat team.description
    if (description && description !== team.description) {
      team.description = description;
      await team.save();
    }

    //if admin and admin is member of team and admin != team.admin then update team.admin
    if (admin) {
      const adminUser = await Schemas.User.findOne({
        _id: admin,
      });
      if (adminUser._id != team.admin && adminUser.teams.includes(teamId)) {
        team.admin = adminUser._id;
        //if adminUser is team.moderator then remove adminUser from team.moderator
        if (team.moderator.includes(adminUser._id)) {
          const index = team.moderator.indexOf(adminUser._id);
          team.moderator.splice(index, 1);
        }
        await team.save();
      } else {
        throw new Error("Admin must be a member of Team.");
      }
    }

    //if moderator and moderator is member of team
    if (moderator) {
      const modUser = await Schemas.User.findOne({
        _id: moderator,
      });
      if (modUser && modUser.teams.includes(teamId)) {
        if (
          !team.moderator.includes(modUser._id) &&
          modUser._id != team.admin
        ) {
          team.moderator.push(modUser._id);

          await team.save();
        } else {
          if (team.moderator.includes(modUser._id)) {
            const index = team.moderator.indexOf(modUser._id);
            team.moderator.splice(index, 1);
            await team.save();
          }
        }
      } else {
        throw new Error("Moderator must be a member of Team.");
      }
    }

    logger({
      userId: team.admin,
      message: `${team.name} Team Updated with TeamId: ${teamId} By UserId : ${team.admin}.
      New Updated Team -> name: ${team.name} , admin: ${team.admin} , moderator: ${team.moderator} `,
      ip,
    });

    res.status(200).json({
      success: true,
      message: "Team Updated Successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
