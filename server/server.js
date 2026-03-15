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
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
    
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user's id and roles from the token
    req.user = { 
      uuid: payload.uuid,
      roles: payload.roles || []
    }; 

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Defining role-based access control middleware
const hasRole = (requiredRole) => {
  return async (req, res, next) => {
    console.log("req.user.roles:", req.user?.roles);
    const roleNames = req.user?.roles?.map(r => r.role || r) || [];
    if (!roleNames.includes(requiredRole)) {
      return res.status(403).json({ error: "Forbidden: missing role" });
    }

    next();
  };
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// --- Route Definitions ---
const credentialsRoute = require('./routes/credentials.js');
const loginRoute = require('./routes/login.js');
const questionsRoute = require('./routes/question.js');
const questionPortalRoute = require('./routes/questionPortal.js');
const registerRoute = require('./routes/register.js');
const subtopicRoute = require('./routes/subtopic.js');
const teacherPortalRouter = require('./routes/teacherPortal.js');

// API Routes
app.use('/api/credentials', credentialsRoute);
app.use('/api/login', loginRoute);
app.use('/api/questions', questionsRoute);
app.use('/api/register', registerRoute);
app.use('/api/subtopics', subtopicRoute);
// Guarded Routes
app.use(
  '/api/question-portal',
  questionPortalRoute(authenticateJWT, hasRole)
);
app.use(
  '/api/teacher-portal', 
  authenticateJWT, 
  hasRole, 
  teacherPortalRouter
);


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