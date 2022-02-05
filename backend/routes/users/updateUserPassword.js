const Schemas = require("../../models/index");
const bcrypt = require("bcrypt");
require("dotenv").config();
module.exports = async (req, res) => {

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
        const salt = await bcrypt.genSalt(process.env.SALT);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        userCredential.password = newHashedPassword;
        await userCredential.save();
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