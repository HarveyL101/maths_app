const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
    const client = await pool.connect();
    try {
        const { year, topic } = req.query;
        // Fetches all subtopics by year and topic
        const subtopics = await getSubtopics(client, year, topic);
        res.json({ subtopics });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
});

// -- WIP --
const getSubtopics = async (client, year, topic) => {
    const result = await client.query(`
        SELECT 
            st.id AS subtopic_id,
            st.name as subtopic_name
        FROM questions q
        JOIN subtopic st ON q.subtopic_id = st.id
        JOIN topic t ON st.topic_id = t.id
        WHERE t.year_group = $1
            AND t.name = $2
        ORDER BY st.name ASC;
    `, [year, topic]);

    return result.rows; // Array of chosen subtopics
};

module.exports = router;