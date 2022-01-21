const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("this is reactions");
});
module.exports = router;
