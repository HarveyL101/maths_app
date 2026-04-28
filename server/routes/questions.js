const express = require("express");
const router = express.Router();
const pool = require("../db");
const { RESOLVER } = require('../../client/src/utils/questionResolver.js');

// POST /api/questions
// Creates a new question (Locked unless an educator)
router.post("/", async (req, res) => {
  console.log("BODY RECEIVED: ", req.body);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const question = await createQuestion(client, {
      ...req.body,
      creator: req.user.uuid
    });
    await client.query("COMMIT");
    
    res.status(201).json(question);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error inserting question: ", error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// Returns the full grouping of questions (pooling) for use in /Learn searching
router.get("/", async (req, res) => {
  const { year, topic, subtopic } = req.query;
  const client = await pool.connect;

  try {
    const result = await client.query(`
      SELECT 
        question_id,
        creator_id,
        creator_surname,
        year_group,
        topic_name,
        subtopic_name,
        subtopic_id,
        question_title,
        question_input
      FROM question_details
      WHERE
        ($1::text IS NULL OR year_group::text = $1)
        AND ($2::text IS NULL OR topic_name ILIKE $2)
        AND ($3::text IS NULL OR subtopic_name ILIKE $3)
      ORDER BY question_id ASC  
    `, [year || null, topic || null, subtopic || null]);

    res.json(result.rows);
  } catch (error) {
    console.error("API: Failed to fetch a question pool", error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// PATCH /api/questions
// WIP for updating an existing question
router.patch("/", async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Update columns here

    await client.query("COMMIT");

    res.json({ message: "PATCH endpoint WIP" });
  } catch(error) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
})

// Returns all questions for a subtopic by SubtopicID
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

// ***************** Helper Functions *****************

const createQuestion = async (client, data) => {
  const { creator, year, topic, subtopic, questionType, title, input } = data;
  await checkEducator(client, creator);
  const questionTypeId = await checkQuestionType(client, questionType);
  const topicId = await getTopicId(client, topic, year);
  const subtopicId = await getSubtopicId(client, topicId, subtopic);
  return await insertQuestion(client, { subtopicId, creator, questionTypeId, title, input, questionType });
};

const checkEducator = async (client, userId) => {
  const result = await client.query(`
    SELECT 1 FROM user_roles ur
    JOIN roles r ON r.id = ur.role_id
    WHERE ur.user_uuid = $1 AND r.role = 'educator'
  `, [userId]);
  if (result.rowCount === 0) throw new Error("User is not an educator");
};

const checkQuestionType = async (client, questionType) => {
  const insertResult = await client.query(`
    INSERT INTO question_type (name) VALUES ($1)
    ON CONFLICT (name) DO NOTHING
    RETURNING id
  `, [questionType]);
  if (insertResult.rowCount > 0) return insertResult.rows[0].id;

  const selectResult = await client.query(`
    SELECT id FROM question_type WHERE name = $1
  `, [questionType]);
  if (selectResult.rowCount === 0) throw new Error("Failed to fetch or create question type");
  return selectResult.rows[0].id;
};

const getTopicId = async (client, topic, year) => {
  const result = await client.query(`
    INSERT INTO topic(name, year_group) VALUES ($1, $2)
    ON CONFLICT (name, year_group) DO UPDATE SET name = EXCLUDED.name
    RETURNING id
  `, [topic, year]);
  return result.rows[0].id;
};

const getSubtopicId = async (client, topicId, subtopic) => {
  const result = await client.query(`
    INSERT INTO subtopic (topic_id, name) VALUES ($1, $2)
    ON CONFLICT (topic_id, name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id
  `, [topicId, subtopic]);
  return result.rows[0].id;
};

const insertQuestion = async (client, { subtopicId, creator, questionTypeId, title, input, questionType }) => {
  const resolver = RESOLVER[questionType];
  if (!resolver) throw new Error(`Unknown question type: ${questionType}`);
  if (!resolver.validate(input)) throw new Error(`Invalid input for type: ${questionType}`);

  const answer = resolver.solve(input);

  const result = await client.query(`
    INSERT INTO questions (subtopic_id, educator_uuid, question_type_id, title, input, answer)
    VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb)
    RETURNING *
  `, [subtopicId, creator, questionTypeId, title, JSON.stringify(input), JSON.stringify(answer)]);

  return result.rows[0];
};



module.exports = router;