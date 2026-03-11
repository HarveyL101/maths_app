const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome Educator!" });

  return router;
});

module.exports = router;