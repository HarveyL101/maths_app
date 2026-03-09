const express = require("express");
const router = express.Router();
const pool = require("../db");

module.exports = (authenticateJWT, hasRole) => {
    // --- Post Questions ---
    router.post("/", authenticateJWT, hasRole("educator"), async (req, res) => {
        console.log("BODY RECEIVED:", req.body);

        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            const question = await createQuestion(req.body);

            await client.query("COMMIT");

            res.status(201).json(question);

        } catch(error) {
            await client.query("ROLLBACK");
            res.status(500).json({ error: error.message });
        } finally {
            client.release();
        }
    });

    // -- Get Questions -- 
    // Will be used in the /Learn functionality
    router("/", async (req, res) => {
        return console.log("bean");
    });


    // -- Update Question (WIP) --
    // Will be used by teachers to alter existing created questions (/TeacherPortal)

    router.patch("/", async (req, res) => {
        const client = await pool.connect();

        console.log("Question PATCH hit");
        try {
            const question = await fetchQuestion(arg, arg, arg)
        } catch (error) {

        } finally {
            client.release();
        }
    });
}


const createQuestion = async (data) => {
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
        input
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
    const result = await client.query(`
        SELECT id 
        FROM question_type
        WHERE name = $1    
    `, [questionType]);

    if (result.rowCount === 0) {
        throw new Error("Invalid question type");
    }

    return result.rows[0].id;
}

const getTopicId = async (topic, year) => {
    const result = await client.query(`
        INSERT INTO topic(name, year_group)
        VALUES ($1, $2)
        ON CONFLICT (name, year_group)
        DO UPDATE SET name = EXCLUDED.name
        RETURNING id    
    `, [topic, year]);

    return result.rows[0].id;
};

const getSubtopicId = async (topicId, subtopic) => {
    const result = await client.query(`
        INSERT INTO subtopic (topic_id, name) 
        VALUES ($1, $2)
        ON CONFLICT (topic_id, name)
        DO UPDATE SET name = EXCLUDED.name
        RETURNING id    
    `, [topicId, subtopic]);

    return result.rows[0].id;
};

const insertQuestion = async ({ subtopicId, creator, questionTypeId, title, input }) => {
    const result = await client.query(`
        INSERT INTO questions (subtopic_id, educator_uuid, question_type_id, title, input)
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *   
    `, [subtopicId, creator, questionTypeId, title, input]);

    return result.rows[0];
};

const validateInput = (type, input) => {
    switch(type) {
        case "addition":
            if (
                typeof input.a !== "number" ||
                typeof input.b !== "number"
            ) {
                throw new Error("Addition questions require a and b");
            }
            break;
        case "subtraction":
            if (
                typeof input.a !== "number" ||
                typeof input.b !== "number"
            ) {
                throw new Error("Subtraction questions require a and b");
            }
            break;
        case "multiplication":
            if (
                typeof input.a !== "number" ||
                typeof input.b !== "number"
            ) {
                throw new Error("Multiplication questions require a and b");
            }
            break;
        case "division":
            if (
                typeof input.a !== "number" ||
                typeof input.b !== "number"
            ) {
                throw new Error("Division questions require a and b");
            }
            break;
    }
}

// -- WIP --
const fetchQuestion = async (req, res) => {
    return;
}