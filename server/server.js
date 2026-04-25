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
const questionPortalRoute = require('./routes/questionPortal.js');
const registerRoute = require('./routes/register.js');
const subtopicRoute = require('./routes/subtopic.js');
const teacherPortalRouter = require('./routes/teacherPortal.js');
// Account Routes
const changeEmailRoute = require('./routes/account/changeEmail.js');
const changeNameRoute = require('./routes/account/changeName.js');
const changePasswordRoute = require('./routes/account/changePassword.js');
// Learn / Quiz Route(s)
const questionRoute = require('./routes/question.js');
const questionsRoute = require('./routes/questions.js');
const progressRoute = require('./routes/progress.js');

// API Routes
app.use(
  '/api/credentials', credentialsRoute);
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);
app.use('/api/subtopics', subtopicRoute);
// Account Routes
app.use('/api/change-email', authenticateJWT, changeEmailRoute);
app.use('/api/change-name', authenticateJWT, changeNameRoute);
app.use('/api/change-password', authenticateJWT, changePasswordRoute);
// Learn / Quiz Route(s)
app.use('/api/questions/subtopic', authenticateJWT, questionsRoute);
app.use('/api/questions', authenticateJWT, questionRoute);
app.use('/api/progress', authenticateJWT, progressRoute);

// Guarded Routes
app.use(
  '/api/question-portal',
  authenticateJWT,
  hasRole('educator'), // Only educators can access the question portal
  questionPortalRoute
);
app.use(
  '/api/teacher-portal', 
  authenticateJWT, 
  hasRole('educator'), // Only educators can access the teacher portal
  teacherPortalRouter
);

// --- Listener ---
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});