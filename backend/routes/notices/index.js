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
const validation = require("../../middlewares/validation");
const validationSchema = require("./@validationSchema");
//get Notice route
router.get("/", validation(validationSchema.getNotices, "query"), getNotices);
//get Notice by Noticeid route
router.get("/:id", getNoticeById);
//get Notices by userid route
router.get(
  "/user/:id",
  validation(validationSchema.getNotices, "query"),
  getNoticesByUserId
);
//get Notices by teamid route
router.get(
  "/team/:id",
  validation(validationSchema.getNotices, "query"),
  getNoticesByTeamId
);

//add Notice route
router.post("/", validation(validationSchema.addNoticeValidation), addNotice);

//update Notice route
router.post(
  "/update",
  validation(validationSchema.updateNoticeValidation),
  updateNotice
);

//delete Notice
router.delete(
  "/:id",
  validation(validationSchema.deleteNoticeByIdValidation),
  deleteNoticeById
);
//delete all Notices by a user
router.delete(
  "/user/delete-all",
  validation(validationSchema.deleteNoticesByUserIdValidation),
  deleteNoticesByUserId
);
//delete all Notice by a team
router.delete(
  "/team/delete-all",
  validation(validationSchema.deleteNoticesByTeamIdValidation),
  deleteNoticesByTeamId
);
router.use("/reaction", reactions);
module.exports = router;
