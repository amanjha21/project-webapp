const Schemas = require("../../../models/index");
module.exports = async (req, res) => {
    const password = req.body.password;
    const email = res.locals.user.email;
    const userId = res.locals.user._id;

    console.log(password, email, userId);
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