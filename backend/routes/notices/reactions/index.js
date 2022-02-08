const router = require("express").Router();
const addComment = require("./addComment");
const deleteComment = require("./deleteComment");
const updateReaction = require("./updateReaction");
const verifyToken = require("../../../middlewares/verifyToken");

router.post("/", verifyToken, addComment);
router.post("/update", verifyToken, updateReaction);
router.delete("/", verifyToken, deleteComment);
module.exports = router;
