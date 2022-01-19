const router = require("express").Router();
router.use("/", (req, res) => {
  res.send("hi, its working");
});
module.exports = router;
