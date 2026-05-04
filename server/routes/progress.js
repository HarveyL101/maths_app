const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get('/', async (req, res) => {
  const client = await pool.connect();

  try {
    const result = await client.query(`
      SELECT question_id, is_correct
      FROM completions
      WHERE user_uuid = $1  
    `, [req.user.uuid]);

    return res.json(result.rows);
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ error: error.message || "Failed to fetch progress, please try again later" });
  } finally {
    client.release();
  }
});

router.post("/", async (req, res) => {
  // Receives a completions object containing { is_correct, questionId, studentAnswer }
  // completions table requires { id, user_uuid, question_id, is_correct, completed_at }
  const { subtopicId, completions } = req.body;

  if (!Array.isArray(completions)) return res.status(400).json({ error: "Missing completions"});

  const client = await pool.connect();

  try {
    const userUUID = req.user.uuid;

    await client.query("BEGIN");

    for (const item of completions) {
      const isCorrect = item.is_correct === true; // Ensure boolean value

      await client.query(`
        INSERT INTO completions (
          user_uuid,
          question_id, 
          is_correct
        )
        VALUES ($1, $2, $3)
        ON CONFLICT (user_uuid, question_id)
        DO UPDATE SET 
          is_correct = EXCLUDED.is_correct, 
          completed_at = CURRENT_TIMESTAMP  
      `, [userUUID, item.questionId, isCorrect]);
    }

    await client.query("COMMIT");

    return res.status(200).json({ message: "Success! Your progress has been saved."});
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("Error: ", error);
    return res.status(500).json({ error: "Failed to save progress, please try again later" });
  } finally {
    client.release();
  }
});

module.exports = router;