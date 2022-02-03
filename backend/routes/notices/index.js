const router = require("express").Router();
const getNotices = require("./getNotices");
const getNoticeById = require("./getNoticeById");
const getNoticesByUserId = require("./getNoticesByUserId");
const getNoticesByTeamId = require("./getNoticesByTeamId");
const addNotice = require("./addNotice");
const updateNotice = require("./updateNotice");
const deleteNoticeById = require("./deleteNoticeById");
const deleteNoticesByUserId = require("./deleteNoticesByUserId");
const deleteNoticesByTeamId = require("./deleteNoticesByTeamId");
const reactions = require("./reactions/index");
//get Notice route
router.get("/", getNotices);
//get Notice by Noticeid route
router.get("/:id", getNoticeById);
//get Notices by userid route
router.get("/user/:id", getNoticesByUserId);
//get Notices by teamid route
router.get("/team/:id", getNoticesByTeamId);

//add Notice route
router.post("/", addNotice);

//update Notice route
router.post("/update", updateNotice);

//delete Notice
router.delete("/:id", deleteNoticeById);
//delete all Notices by a user
router.delete("/user/delete-all", deleteNoticesByUserId);
//delete all Notice by a team
router.delete("/team/delete-all", deleteNoticesByTeamId);
router.use("/reaction", reactions);
module.exports = router;
