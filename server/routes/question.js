const express = require("express");
const router = express.Router();
const pool = require("../db");

// Performs a simple fetch and retrieval of desired questions
router.get("/", async (req, res) => {
    const client = await pool.connect();
    try {
        const { year, topic, subtopic } = req.query;

        let query = `
            SELECT 
                question_id,
                subtopic_id,
                creator_id,
                creator_surname,
                year_group,
                topic_name,
                subtopic_name,
                question_title,
                question_input
            FROM question_details
            WHERE 1=1
        `;

        const values = [];
        let index = 1;

        // Adds dynamic filtering for more general/ specific search results
        if (year) {
            query += ` AND year_group = $${index++}`;
            values.push(year);
        }

        if (topic) {
            query += ` AND topic_name = $${index++}`;
            values.push(topic);
        }

        if (subtopic) {
            query += ` AND subtopic_name = $${index++}`;
            values.push(subtopic);
        }

        if (creator) {
            query += `AND LOWER(creator_surname) = LOWER($${index++})`;
            values.push(creator);
        }
        
        query += `ORDER BY subtopic_name, creator_surname`;

        const result = await client.query(query, values);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    } finally {
        client.release();
    }
});

module.exports = router;