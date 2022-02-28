const router = require("express").Router();
const addComment = require("./addComment");
const deleteComment = require("./deleteComment");
const updateReaction = require("./updateReaction");
const verifyToken = require("../../../middlewares/verifyToken");
const validation = require("../../../middlewares/validation");
const validationSchema = require("./@validationSchema");
const getCommentsByNoticeId = require("./getCommentsByNoticeId");
const getReactionsByNoticeId = require("./getReactionsByNoticeId");
router.post(
  "/",
  validation(validationSchema.addCommentValidation),
  verifyToken,
  addComment
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
router.get(
  "/comment/:id",
  validation(validationSchema.getCommentsValidation, "params"),
  verifyToken,
  getCommentsByNoticeId
);
router.get(
  "/:id",
  validation(validationSchema.getCommentsValidation, "params"),
  verifyToken,
  getReactionsByNoticeId
);
module.exports = router;
