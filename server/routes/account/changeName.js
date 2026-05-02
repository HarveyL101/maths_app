const express = require("express");
const router = express.Router();
const pool = require("../../db.js");

router.patch("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { newName } = req.body;

  if (!userId || !newName) return res.status(400).json({ error: "Missing required fields" })
  
  const authUserId = req.user.uuid;

  if (String(userId) !== String(authUserId)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
      UPDATE
        users
      SET 
        name = $1
      WHERE 
        id = $2
      `, [newName, userId]
    );

    await client.query("COMMIT")

    res.json({ message: "Name updated" });
  } catch(error) {
    await client.query("ROLLBACK");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error during /change-name"});
  } finally {
    client.release();
  }
});

module.exports = router;