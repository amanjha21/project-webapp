const Schemas = require("../../models/index");
module.exports = async (req, res) => {

    const comment = req.body.comment || "";
    const user = req.body.userId;
    const post = req.body.postId || "61ee718fd7fc519c375e7eca";
    try {

        const reaction = Schemas.Reaction({
            type: "comment",
            comment: comment,
            post: post,
            user: user,

        });
        console.log(reaction);
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