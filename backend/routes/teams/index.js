const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("this is teams");
});
module.exports = router;
