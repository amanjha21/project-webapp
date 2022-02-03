const Schemas = require("../../models/index");
module.exports = async (req, res) => {

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const userId = req.params.id;

    try {

        const userCredential = await Schemas.User_Credential.findOne({
            _id: userId
        });
        // check if user exists and the old password matches with the database
        if (!userCredential || (userCredential.password !== oldPassword)) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Request',

            });
        }

        userCredential.password = newPassword;
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