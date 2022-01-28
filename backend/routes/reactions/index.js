const router = require("express").Router();
const Schemas = require("../../models/index");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const uploader = require("../../helpers/uploader");
const addReaction = require("./addReaction");
const deleteReaction = require("./deleteReaction");
const updateReaction = require("./updateReaction");

router.post("/", addReaction);
router.post("/", updateReaction);
router.delete("/", deleteReaction);
module.exports = router;