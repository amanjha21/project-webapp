const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("this is notices");
});
module.exports = router;
