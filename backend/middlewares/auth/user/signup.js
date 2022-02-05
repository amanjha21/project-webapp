const Schemas = require("../../../models/index");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = async (req, res) => {

    const unhashedPassword = req.body.password;

    const salt = await bcrypt.genSalt(process.env.SALT);

    const hashedPassword = await bcrypt.hash(unhashedPassword, salt);
    const password = hashedPassword;

    const userId = res.locals.user._id;
    const email = res.locals.user.email;

    const newUserCred = new Schemas.User_Credential({
        email,
        password,
        _id: userId,
    });
    const result = await newUserCred.save();

    if (!result._id) {
        await Schemas.User.deleteOne({
            _id: userId
        });
        res.status(404).json({
            success: false,
            message: "Failed to create User!!",
        })


    }
    res.status(200).json({
        success: true,
        message: "User created successfully",
    });



}