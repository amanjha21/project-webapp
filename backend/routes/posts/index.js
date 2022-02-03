const router = require("express").Router();
const getPosts = require("./getPosts");
const getPostById = require("./getPostById");
const getPostsByUserId = require("./getPostsByUserId");
const addPost = require("./addPost");
const updatePost = require("./updatePost");
const deletePostById = require("./deletePostById");
const deletePostsByUserId = require("./deletePostsByUserId");
const validation = require("../../middlewares/validation");
const validationSchema = require("./@validationSchema");
const reactions = require("./reactions/index");
//get post route
router.get("/", validation(validationSchema.getPosts, "query"), getPosts);
//get post by postid route
router.get("/:id", getPostById);
//get posts by userid route
router.get(
  "/user/:id",
  validation(validationSchema.getPosts, "query"),
  getPostsByUserId
);

//add post route
router.post("/", validation(validationSchema.addPostValidation), addPost);

//update post route
router.post(
  "/update",
  validation(validationSchema.updatePostValidation),
  updatePost
);

//delete post
router.delete(
  "/:id",
  validation(validationSchema.deletePostByIdValidation),
  deletePostById
);
//delete all post for user
router.delete(
  "/user/delete-all",
  validation(validationSchema.deletePostsByUserIdValidation),
  deletePostsByUserId
);
router.use("/reaction", reactions);
module.exports = router;
