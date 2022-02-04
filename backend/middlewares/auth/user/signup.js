const Schemas = require("../../../models/index");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
module.exports = async (req, res) => {
    const unhashedPassword = req.body.password;

    const salt = await bcrypt.genSalt(dotenv.SALT);

    const hashedPassword = await bcrypt.hash(unhashedPassword, salt);
    const password = hashedPassword;
    const email = res.locals.user.email;
    const userId = res.locals.user._id;

    const newUserCred = new Schemas.User_Credential({
        email,
        password,
        _id: userId,
    });
    await newUserCred.save();
    res.status(200).json({
        success: true,
        message: "User created successfully",
    });


}