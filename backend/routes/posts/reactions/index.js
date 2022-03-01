const router = require("express").Router();
const addComment = require("./addComment");
const deleteComment = require("./deleteComment");
const updateCommentById = require("./updateCommentById");
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
  "/:id",
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
module.exports = router;
