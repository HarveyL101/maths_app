const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  // Receives a completions object containing { is_correct, questionId, studentAnswer }
  // completions table requires { id, user_uuid, question_id, is_correct, completed_at }
  const {  subtopicId, completions } = req.body;

  console.log(req.body);

  if (!Array.isArray(completions)) return res.status(400).json({ error: "Missing completions"});

  let client;

  try {
    client = await pool.connect();
    const userUUID = req.user.uuid;

    await client.query("BEGIN");

    for (const item of completions) {
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
      `, [userUUID, item.questionId, item.is_correct]);
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