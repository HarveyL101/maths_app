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
  // define variables
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email`,
    [name, email, hashed]
  );

  res.json(result.rows[0]);
});

// --- Login User ---
app.post("/login", async (req, res) => {
  console.log("BODY RECEIVED: ", req.body);

  const { email, password } = req.body;

  const userQuery = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  const user = userQuery.rows[0];

  if (!user) return res.status(401).json({ body: req.body, message: "Invalid email" });

  const isMatch = await bcrypt.compare(password, user.password);

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