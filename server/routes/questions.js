const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get('/:subtopicId', async (req, res) => {
  const { subtopicId } = req.params;
  const client = await pool.connect();

  try {
    const result = await client.query(`
      SELECT
        question_id,
        creator_id,
        creator_surname,
        year_group,
        topic_name,
        subtopic_name,
        question_title,
        question_input
      FROM question_details
      WHERE subtopic_id = $1
      ORDER BY question_id ASC  
    `, [subtopicId]);
    
    res.json(result.rows);
  } catch (error) {
    console.log("API: Failed to fetch desired results");
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

module.exports = router;