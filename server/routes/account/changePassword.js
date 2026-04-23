const express = require("express");
const router = express.Router();
const pool = require("../../db.js");
const bcrypt = require("bcrypt");

const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);

router.patch("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  const authUserId = req.user?.uuid;
  if (!authUserId) return res.status(401).json({ error: "Unauthorised" });

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (String(userId) !== String(authUserId)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `SELECT id, password_hash FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "User not found" });
    }

    const is_match = await bcrypt.compare(
      currentPassword, 
      result.rows[0].password_hash
    );

    if (!is_match) {
      await client.query("ROLLBACK");
      return res.status(401).json({ message: "Current password is incorrect" });
    } 

    const hashed = await bcrypt.hash(newPassword, saltRounds);


    await client.query(
      `
      UPDATE
        users
      SET 
        password_hash = $1
      WHERE 
        id = $2
      `, [hashed, userId]
    );

    await client.query("COMMIT")

    res.json({ message: "Password updated" });
  } catch(error) {
    await client.query("ROLLBACK");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error during /change-password"});
  } finally {
    client.release();
  }
});

module.exports = router;