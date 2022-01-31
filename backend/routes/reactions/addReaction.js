const Schemas = require("../../models/index");
module.exports = async (req, res) => {
    const type = req.body.type;
    const comment = req.body.comment || "";
    const user = req.body.userId;
    const post = req.body.postId;
    try {

        const reaction = await Schemas.Reaction({
            type: type,
            comment: comment,
            post: post,
            user: user,

        });
        await reaction.save();
        res.status(201).json({
            success: true,
            message: "Reaction added successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            message: err.message,
        });

    }

};