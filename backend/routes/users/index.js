const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("this is users");
});
module.exports = router;
