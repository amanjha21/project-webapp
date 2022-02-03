const Schemas = require("../../models/index");
module.exports = async (req, res) => {

    const organizationId = req.params.id;
    try {
        const user = await Schemas.User.findOne({
            organization: organizationId
        }).exec();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User doesnot exist",
            });
        }
        res.status(200).json(user);

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }

}