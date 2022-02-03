const router = require("express").Router();
const addComment = require("./addComment");
const deleteComment = require("./deleteComment");
const updateReaction = require("./updateReaction");

router.post("/", addComment);
router.post("/update", updateReaction);
router.delete("/", deleteComment);
module.exports = router;
