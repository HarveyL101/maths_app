const express = require("express");
const router = express.Router();
const pool = require("../db");
const { RESOLVER } = require('../../client/src/utils/questionResolver.js');

// --- Post Questions ---
router.post("/", async (req, res) => {
    
    console.log("BODY RECEIVED:", req.body);

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const question = await createQuestion(client, {
            ...req.body,
            creator: req.user.uuid
        });

        await client.query("COMMIT");

        res.status(201).json(question);

    } catch(error) {
        await client.query("ROLLBACK");
        console.log("Error creating question: ", error);
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
});

// -- Get Questions -- 
// Will be used in the /Learn functionality
router.get("/", async (req, res) => {
    console.log("bean");
    res.json({ message: "ok" });
});


// -- Update Question (WIP) --
// Will be used by teachers to alter existing created questions (/TeacherPortal)

router.patch("/", async (req, res) => {
    const client = await pool.connect();

    try {
        console.log("Question PATCH hit");
        // const question = await fetchQuestion(arg, arg, arg)
        res.json({ message: "PATCH endpoint WIP" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
});

// ***************** Helper Functions *****************


const createQuestion = async (client, data) => {
    const { creator, year, topic, subtopic, questionType, title, input } = data;

    // Verifies that the user trying to create questions has the necessary role
    await checkEducator(client, creator);

    // Checks the question_type for better context when rendering inputs (e.g. /Learn)
    const questionTypeId = await checkQuestionType(client, questionType);

    // Gets the topic Id, or creates a new one if brand new.
    const topicId = await getTopicId(client, topic, year);

    // Gets the subtopic Id, or creates a new one if brand new.
    const subtopicId = await getSubtopicId(client, topicId, subtopic);

    return await insertQuestion(client, {
        subtopicId,
        creator,
        questionTypeId,
        title,
        input,
        questionType
    });
};

const checkEducator = async (client, userId) => {
    const result = await client.query(`
        SELECT 1 
        FROM user_roles ur
        JOIN roles r ON r.id = ur.role_id
        WHERE ur.user_uuid = $1
        AND r.role = 'educator'    
    `, [userId]);

    if (result.rowCount === 0) {
        throw new Error("User is not an educator");
    }
};

const checkQuestionType = async (client, questionType) => {
    const insertResult = await client.query(`
        INSERT INTO question_type (name) 
        VALUES ($1)
        ON CONFLICT (name) DO NOTHING
        RETURNING id
    `, [questionType]);

    if (insertResult.rowCount > 0) {
        return insertResult.rows[0].id;
    }

    const selectResult = await client.query(`
        SELECT id 
        FROM question_type
        WHERE name = $1
    `, [questionType]);

    if (selectResult.rowCount === 0) {
        throw new Error("Failed to fetch or create question type");
    }

    return selectResult.rows[0].id;
}

const getTopicId = async (client, topic, year) => {
    const result = await client.query(`
        INSERT INTO topic(name, year_group)
        VALUES ($1, $2)
        ON CONFLICT (name, year_group)
        DO UPDATE SET name = EXCLUDED.name
        RETURNING id    
    `, [topic, year]);

    return result.rows[0].id;
};

const getSubtopicId = async (client, topicId, subtopic) => {
    const result = await client.query(`
        INSERT INTO subtopic (topic_id, name) 
        VALUES ($1, $2)
        ON CONFLICT (topic_id, name)
        DO UPDATE SET name = EXCLUDED.name
        RETURNING id    
    `, [topicId, subtopic]);

    return result.rows[0].id;
};

const insertQuestion = async (client, { subtopicId, creator, questionTypeId, title, input, questionType }) => {
    // Ensure input is a JSON object for safe DB storage

    const resolver = RESOLVER[questionType];
    // console.log("questionType received:", questionType);
    // console.log("input type received:", input);
    console.log("available types:", Object.keys(RESOLVER));

    if (!resolver) throw new Error (`Unknown Question Type: ${questionType}`);
    if(!resolver.validate(input)) throw new Error(`Invalid Input for Type: ${questionType}`);

    const answer = resolver.solve(input);

    const result = await client.query(`
        INSERT INTO questions (subtopic_id, educator_uuid, question_type_id, title, input, answer)
        VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb) 
        RETURNING *   
    `, [subtopicId, creator, questionTypeId, title, JSON.stringify(input), JSON.stringify(answer)]);

    return result.rows[0];
};

module.exports = router;