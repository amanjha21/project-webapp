const Schemas = require("../../models/index");
module.exports = async (req, res) => {
    const type = req.body.type;
    const comment = req.body.comment;
    const user = req.body.userId;
    const post = req.body.postId;

}