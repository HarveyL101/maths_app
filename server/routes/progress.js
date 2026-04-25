const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  const { subtopicId, questionId, answer, isCorrect } = req.body;
  const userUUID = req.user.uuid;
  const client = await pool.connect();

  try {
    await client.query(`
      INSERT INTO completions (user_uuid, question_id, is_correct)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_uuid, question_id)
      DO UPDATE SET is_correct = EXCLUDED.is_correct,
                  completed_at = CURRENT_TIMESTAMP    
    `, [userUUID, questionId, isCorrect]);

    res.json({ success: true });
  } catch (error) {
    console.log("Failed to save progress:", error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

module.exports = router;