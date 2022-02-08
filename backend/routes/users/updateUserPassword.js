const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");
const bcrypt = require("bcrypt");
require("dotenv").config();
module.exports = async (req, res) => {
    const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const userId = req.params.id;


    try {

        const userCredential = await Schemas.User_Credential.findOne({
            _id: userId
        });

        // check if user exists and the old password matches with the database
        if (!userCredential) {

            return res.status(404).json({
                success: false,
                message: 'Invalid Request',

            });
        }

        const isEqual = await bcrypt.compare(oldPassword, userCredential.password);
        if (!isEqual) {
            return res.status(404).json({
                success: false,
                message: "Incorrect Password!"
            });
        }
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        userCredential.password = newHashedPassword;
        const userCred = await userCredential.save();
        logger({
            userId: userCred._id,
            message: `User password updated successfully by user with userId: ${userCred._id}`,
            ip,
        });
        res.status(200).json({
            success: true,
            message: "password updated successfully",
        })

    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        });
    }
}