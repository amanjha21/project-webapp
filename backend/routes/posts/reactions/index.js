const router = require("express").Router();
const addComment = require("./addComment");
const deleteComment = require("./deleteComment");
const updateReaction = require("./updateReaction");
const validation = require("../../middlewares/validation");
const validationSchema = require("./@validationSchema");

router.post("/", validation(validationSchema.addCommentValidation), addComment);
router.post("/update", validation(validationSchema.updateReactionValidation), updateReaction);
router.delete("/", validation(validationSchema.deleteReactionValidation), deleteComment);
module.exports = router;