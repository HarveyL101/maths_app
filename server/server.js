const express = require('express');
const cors = require('cors');
const corsOptions = { origin: ["http://localhost:5173"] }
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const pool = require("./db.js");

// 

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

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// --- Route Definitions ---
const credentialsRoute = require('./routes/credentials.js');
const loginRoute = require('./routes/login.js');
const registerRoute = require('./routes/register.js');
const teacherPortalRouter = require('./routes/teacherPortal.js');

app.use('/credentials', credentialsRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/teacher-portal', teacherPortalRouter(authenticateJWT, hasRole));

// --- Change Email (Currently unused, will remain here while so) ---
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


// --- Listener ---
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});