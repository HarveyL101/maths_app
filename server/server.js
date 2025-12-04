const express = require('express');
const cors = require('cors');
const corsOptions = { origin: ["http://localhost:5173"] }

const app = express();

// Global server variables
const PORT = 8080; // Local hosting
const URL = `http://localhost:${PORT}`;

app.use(cors(corsOptions));


app.get("/api", (req, res) => {
  res.json({ lessons: ["Addition", "Subtraction", "Multiplication", "Division"] });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} @ ${URL}.`);
  console.log(`API route: ${URL}/api`);
})