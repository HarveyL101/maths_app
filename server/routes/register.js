const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const saltRounds = 10;

// --- Register User ---
router.post("/", async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  const client = await pool.connect();

  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hashed = await bcrypt.hash(password, saltRounds);

    await client.query("BEGIN");

    const insertUser = await client.query(
      `
      INSERT INTO users (id, name, email, password_hash)
      VALUES (gen_random_uuid(), $1, $2, $3)
      RETURNING id, name, email
      `,
      [name, email, hashed]
    );

    const newUser = insertUser.rows[0];

    await client.query(
      `
      INSERT INTO user_roles (user_uuid, role_id)
      SELECT $1, id
      FROM roles
      WHERE role = $2
      `,
      [newUser.id, role]
    );

    await client.query("COMMIT");

    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      token,
      user: { ...newUser, roles: [role] },
    });

  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);

    if (error.code === "23505") {
      return res.status(409).json({
        error: "Email already registered, please use another.",
      });
    }

    res.status(500).json({ error: "Registration Failed" });

  } finally {
    client.release();
  }
});

module.exports = router;