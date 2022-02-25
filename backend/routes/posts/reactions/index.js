const router = require("express").Router();
const addComment = require("./addComment");
const deleteComment = require("./deleteComment");
const updateReaction = require("./updateReaction");
const validation = require("../../../middlewares/validation");
const validationSchema = require("./@validationSchema");
const verifyToken = require("../../../middlewares/verifyToken");
const getCommentsByPostId = require("./getCommentsByPostId");
const getReactionsByPostId = require("./getReactionsByPostId");

router.post(
  "/",
  validation(validationSchema.addCommentValidation),
  verifyToken,
  addComment
);
router.get(
  "/comment/:id",
  validation(validationSchema.getCommentsValidation, "params"),
  verifyToken,
  getCommentsByPostId
);
router.get(
  "/reaction/:id",
  validation(validationSchema.getCommentsValidation, "params"),
  verifyToken,
  getReactionsByPostId
);
router.post(
  "/update",
  validation(validationSchema.updateCommentValidation),
  verifyToken,
  updateReaction
);
router.delete(
  "/",
  validation(validationSchema.deleteCommentValidation),
  verifyToken,
  deleteComment
);
module.exports = router;
