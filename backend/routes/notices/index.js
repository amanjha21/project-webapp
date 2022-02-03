const router = require("express").Router();
const getNotices = require("./getNotices");
const getNoticeById = require("./getNoticeById");
const getNoticesByUserId = require("./getNoticesByUserId");
const addNotice = require("./addNotice");
const updateNotice = require("./updateNotice");
const deleteNoticeById = require("./deleteNoticeById");
const deleteNoticesByUserId = require("./deleteNoticesByUserId");

//get Notice route
router.get("/", getNotices);
//get Notice by Noticeid route
router.get("/:id", getNoticeById);
//get Notice by userid route
router.get("/user/:id", getNoticesByUserId);

//add Notice route
router.post("/", addNotice);

//update Notice route
router.post("/update", updateNotice);

//delete Notice
router.delete("/:id", deleteNoticeById);
//delete all Notice for user
router.delete("/user/delete-all", deleteNoticesByUserId);
module.exports = router;
