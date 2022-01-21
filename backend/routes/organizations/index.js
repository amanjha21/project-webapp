const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("this is organizations");
});
module.exports = router;
