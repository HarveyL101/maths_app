const express = require('express');
const cors = require('cors');
const corsOptions = { origin: ["http://localhost:5173"] }
const dotenv = require('dotenv');
const pg = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const PORT = process.env.PORT || 8080;

// --- Route Definitions ---
app.get("/api", (req, res) => {
  res.json({ lessons: ["Addition", "Subtraction", "Multiplication", "Division"] });
});

// --- Register User ---
app.post("/register", async (req, res) => {
  try {
    console.log("BODY RECEIVED: ", req.body);

    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10); // password is always encrypted during storage

    const result = await pool.query(
      `
      BEGIN;

      WITH new_user AS (
        INSERT INTO users (id, name, email, password_hash)
        VALUES (gen_random_uuid(), $1, $2, $3)
        RETURNING id
      )

      INSERT INTO user_roles (user_uuid, role_id)
      SELECT
        new_user.id,
        roles.id
      FROM 
        new_user
      JOIN 
        roles 
      ON 
        roles.role = $4

      COMMIT;
      `, [name, email, hashed, role]
    );

    res.json(result.rows[0]);
  } catch(error) {

  }
  
});

// --- Login User ---
app.post("/login", async (req, res) => {
  console.log("BODY RECEIVED: ", req.body);

  const { email, password } = req.body;

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

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2hr",
  });

  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// --- Listener ---
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});