const router = require("express").Router();
const posts = require("./posts/index");
const organizations = require("./organizations/index");
const users = require("./users/index");
const teams = require("./teams/index");
const notices = require("./notices/index");
const logger = require("./logger/index");
const login = require("./auth/user/login");
const logout = require("./auth/user/logout");
const verifyToken = require("../middlewares/verifyToken");

router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.use("/post", posts);
router.use("/organization", organizations);
router.use("/user", users);
router.use("/team", teams);
router.use("/notice", notices);
router.use("/log", logger);

module.exports = router;
