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
const verifyToken = require("../../middlewares/verifyToken");
//get Notice route
router.get(
  "/",
  validation(validationSchema.getNotices, "query"),
  verifyToken,
  getNotices
);
//get Notice by Noticeid route
router.get("/:id", verifyToken, getNoticeById);
//get Notices by userid route
router.get(
  "/user/:id",
  validation(validationSchema.getNotices, "query"),
  verifyToken,
  getNoticesByUserId
);
//get Notices by teamid route
router.get(
  "/team/:id",
  validation(validationSchema.getNotices, "query"),
  verifyToken,
  getNoticesByTeamId
);

//add Notice route
router.post(
  "/",
  validation(validationSchema.addNoticeValidation),
  verifyToken,
  addNotice
);

//update Notice route
router.post(
  "/update",
  validation(validationSchema.updateNoticeValidation),
  verifyToken,
  updateNotice
);

//delete Notice
router.delete(
  "/:id",
  validation(validationSchema.deleteNoticeByIdValidation),
  verifyToken,
  deleteNoticeById
);
//delete all Notices by a user
router.delete(
  "/user/delete-all",
  validation(validationSchema.deleteNoticesByUserIdValidation),
  verifyToken,
  deleteNoticesByUserId
);
//delete all Notice by a team
router.delete(
  "/team/delete-all",
  validation(validationSchema.deleteNoticesByTeamIdValidation),
  verifyToken,
  deleteNoticesByTeamId
);
router.use("/reaction", reactions);
module.exports = router;
