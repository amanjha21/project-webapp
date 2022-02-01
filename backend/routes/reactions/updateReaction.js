const Schemas = require("../../models/index");
module.exports = async (req, res) => {
    const type = req.body.type;
    const user = req.body.userId;
    const post = req.body.postId;
    try {
        const result = await Schemas.Reaction.findOne({
            post: post,
            user: user
        }).exec();

        if (result.type === type) {
            await Schemas.Reaction.deleteOne({
                _id: result._id.toString()
            }).exec();

            if (result.deletedCount == 1) {
                res.status(200).json({
                    success: true,
                    message: "Reaction deleted successfully!!"
                });
            }
        } else {
            result.type = type;
            await result.save();
            res.status(200).json({
                success: true,
                message: "Reaction updated successfully!!"
            });

        }

    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        });

    }


}