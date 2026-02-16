const express = require('express');
const cors = require('cors');
const corsOptions = { origin: ["http://localhost:5173"] }
const dotenv = require('dotenv').config();
const pg = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- Middleware for JWT Authentication ---
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Malformed token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id }; // attach the user's id 
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Defining role-based access control middleware
const hasRole = (requireRole) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;

      const result = await pool.query(
        `
        SELECT r.role
        FROM user_roles ur
        JOIN roles r ON ur.role_id = r.id
        WHERE ur.user_uuid = $1
        `, [userId]
      );

      const roles = result.rows.map(r => r.role);

      if (!roles.includes(requiredRole)) {
        return res.status(403).json({ error: "Forbidden: missing role" });
      }

      next();
    } catch (err) {
      console.error("Error in hasRole middleware:", err);
      res.status(500).json({ error: "Server error during role check" });
    }
  };
};

const saltRounds = 10;

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const PORT = process.env.PORT || 5000;

// --- Route Definitions ---
app.get("/api", (req, res) => {
  res.json({ lessons: ["Addition", "Subtraction", "Multiplication", "Division"] });
});

// --- Register User ---
app.post("/register", async (req, res) => {
  console.log("BODY RECEIVED: ", req.body);
  const client = await pool.connect();
  try {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hashed = await bcrypt.hash(password, saltRounds)// password is always encrypted during storage

    await client.query('BEGIN');

    const insertUser = await client.query(
      `
      INSERT INTO users (id, name, email, password_hash)
      VALUES (gen_random_uuid(), $1, $2, $3)
      RETURNING id, name, email
      `, [name, email, hashed]
    );
    const newUser = insertUser.rows[0];

    await client.query(
      `
      INSERT INTO user_roles (user_uuid, role_id)
      SELECT 
        $1, id 
      FROM 
        roles
      WHERE 
        role = $2
      `, [newUser.id, role]
    )

    await client.query('COMMIT');

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "2hr",
    });

    res.status(201).json({ token, user: { ...newUser, roles:[role] } });
  } catch (error) {
    await client.query('ROLLBACK'); // cancels transaction on fail
    console.log(error);
    if (error.code === "23505") return res.status(409).json({ error: "Email already registered, please use another." }); // error code for UNIQUE constraint violations
    res.status(500).json({ error: "Registrations Failed" });
  } finally {
    client.release();
  }
});

// --- Login User ---
app.post("/login", async (req, res) => {
  try {
    console.log("BODY RECEIVED: ", req.body);

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
      { id: user.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "2hr" }
    );

    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email,
        roles 
      } 
    });
  } catch(error) {

  }
});

// --- Credentials ---
app.get("/credentials", async (req, res) => {
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
      SELECT 
        id, email
      FROM 
        users
      WHERE 
        id = $1
      `, [userId] 
    );

    const user = userQuery.rows[0];
    if (!user) return res.status(401).json({ error: "User not found" });

    // Fetch roles
    const rolesQuery = await pool.query(
      `
      SELECT 
        r.role
      FROM
        roles r
      JOIN 
        user_roles ur
      ON 
        ur.role_id = r.id
      WHERE
        ur.user_uuid = $1
      `, [userId]
    );

    const roles = rolesQuery.rows.map(r => r.role);

    res.json({
      token, 
      user: {
        id: user.id,
        email: user.email,
        roles
      }
    });

  } catch(error) {
    console.error("Error in /credentials:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// --- Change Email ---
app.patch("/profile/:userId/change-email", async (req, res) => {
  const { userId } = req.params;
  const { newEmail } = req.body;
  const authUserId = req.user.id;

  if (userId !== authUserId) {
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
        email = $1
      WHERE 
        id = $2
      `, [newEmail, authUserId]
    );

    await client.query("COMMIT")

    res.json({ message: "Email updated" });
  } catch(error) {
    await client.query("ROLLBACK");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error during /change-email"});
  } finally {
    client.release();
  }
});

app.get(
  "/teacher-portal",
  authenticateJWT,
  hasRole("educator"), // Needs to match the DB role
  (req, res) => {
    res.json({ message: "Welcome to the Teacher Portal!" });
  }
);


// --- Listener ---
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});