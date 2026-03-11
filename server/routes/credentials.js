const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");

// --- Credentials ---
router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Malformed token" });

    // Verify token
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET); // Checks if invalid or expired
    } catch(error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const userId = payload.id; // Extract userID from token payload

    // Fetch user from DB
    const userQuery = await pool.query(
      `
      SELECT id, email
      FROM users
      WHERE id = $1
      `, [userId] 
    );

    const user = userQuery.rows[0];
    if (!user) return res.status(401).json({ error: "User not found" });

    // Fetch roles
    const rolesQuery = await pool.query(
      `
      SELECT r.role
      FROM roles r
      JOIN user_roles ur
      ON ur.role_id = r.id
      WHERE ur.user_uuid = $1
      `, [userId]
    );

    const roles = rolesQuery.rows.map(r => r.role);

    res.json({ user: { id: user.id, email: user.email, roles } });

  } catch(error) {
    console.error("Error in /credentials:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;