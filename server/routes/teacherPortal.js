const express = require("express");
const router = express.Router();

module.exports = (authenticateJWT, hasRole) => {
  router.get("/", authenticateJWT, hasRole("educator"), (req, res) => {
    res.json({ message: "Welcome to the Teacher Portal!" });
  });

  return router;
}
