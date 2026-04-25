import { useParams } from React;
const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get('/:SubtopicId', async (req, res) => {
  const { subtopicId } = useParams();

  const client = await pool.connect();
  try {
    let query = `
      SELECT 
        
      FROM

      WHERE
    `;
    
  } catch (error) {
    console.log("API: Failed to fetch desired results");
  } finally {
    client.release();
  }
});