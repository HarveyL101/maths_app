const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
    const client = await pool.connect();
    try {
        const { subtopicId } = req.query;
        const questions = await getQuestionsBySubtopic(client, subtopicId);
        res.json({ questions }); // Returns array of filtered questions
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await client.release();
    }
});

const getQuestionsBySubtopic = async (client, subtopicId) => {
    const result = await client.query(`
        SELECT
            q.id,
            q.title,
            q.input,
            q.answer,
            q.difficulty,
            q.version,
            q.is_active,
            qt.name AS question_type
        FROM questions q
        JOIN question_type qt ON q.question_type_id = qt.id
        WHERE q.subtopic_id = $1
            AND q.is_active = TRUE
        ORDER BY q.created_at ASC
    `, [subtopicId]);

    return result.rows; // Array of matching/ suitable questions
}