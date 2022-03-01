const router = require("express").Router();
const addComment = require("./addComment");
const deleteComment = require("./deleteComment");
const updateCommentById = require("./updateCommentById");
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
  "/comment/delete/:id",
  validation(validationSchema.deleteCommentValidation, "params"),
  verifyToken,
  deleteComment
);
router.post(
  "/comment/update/:id",
  validation(validationSchema.deleteCommentValidation, "params"),
  verifyToken,
  updateCommentById
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
