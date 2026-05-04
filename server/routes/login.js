const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");


// --- Login User ---
router.post("/", async (req, res) => {

  const client = await pool.connect();

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const userQuery = await pool.query(
      `SELECT * 
      FROM users 
      WHERE email = $1`,
      [email]
    );

    const user = userQuery.rows[0];

    if (!user) return res.status(401).json({ body: req.body, message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    // fetch roles
    const rolesQuery = await pool.query(
      `
      SELECT r.role
      FROM roles r
      JOIN user_roles ur ON ur.role_id = r.id
      WHERE ur.user_uuid = $1      
      `,
      [user.id]
    );

    const roles = rolesQuery.rows.map(r => r.role);

    const token = jwt.sign(
      { 
        uuid: user.id,
        roles
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: "2h" }
    );

    return res.json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name,
        email: user.email,
        roles 
      } 
    });
  } catch(error) {
    return res.status(401).json({ error: "Invalid Credentials" });
  } finally {
    client.release();
  }
});

module.exports = router;
