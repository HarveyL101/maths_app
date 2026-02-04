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

const PORT = process.env.PG_PORT || 8080;

// --- Route Definitions ---
app.get("/api", (req, res) => {
  res.json({ lessons: ["Addition", "Subtraction", "Multiplication", "Division"] });
});

// --- Register User ---
app.post("/register", async (req, res) => {
  try {
    console.log("BODY RECEIVED: ", req.body);

    const { name, email, password, isEducator } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (id, name, email, password_hash, isEducator)
      VALUES (gen_random_uuid(), $1, $2, $3, $4)
      RETURNING id, name, email, isEducator`,
      [name, email, hashed, isEducator]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") { // violation of UNIQUE condition
      return res.status(409).json({ error: "Email already registered" });
    }
    console.log(error);
    res.status(500).json({ error: "Registrations Failed" });
  }
  
});

// --- Login User ---
app.post("/login", async (req, res) => {
  console.log("BODY RECEIVED: ", req.body);

  const { email, password, isEducator } = req.body;

  const userQuery = await pool.query(
    `SELECT * 
     FROM users 
     WHERE email = $1 
     AND isEducator = $2`,
    [email]
  );

  const user = userQuery.rows[0];

  if (!user) return res.status(401).json({ body: req.body, message: "Invalid email" });

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// --- Change Email ---
app.post("/change-email", async (req, res) => { // need to add error handling
  console.log("BODY RECEIVED: ", req.body);

  const { oldEmail, newEmail } = req.body;

  const userQuery = await pool.query(
    `UPDATE users
     SET email = $1
     WHERE email = $2`,
     [newEmail, oldEmail]
  );

  const result = userQuery.rows[0];
  // should probably log the user out to aqcuire a new web token 
});

// --- Listener ---
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});