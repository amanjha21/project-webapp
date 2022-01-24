const router = require("express").Router();
const Schemas = require("../../models/index");
const uploader = require("../../helpers/uploader");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const getPosts = require("./getPosts");
const getPostById = require("./getPostById");
const addPost = require("./addPost");
const updatePost = require("./updatePost");
const deletePost = require("./deletePostById");

//get post route
router.get("/", getPosts);
//get post by postid route
router.get("/:id", getPostById);

//add post route
router.post("/", addPost);

//update post route
router.post("/update", updatePost);

//delete post
router.delete("/", deletePost);
module.exports = router;
