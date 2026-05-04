-- This is an example file of the schema hosted externally on Supabase, 
-- this file is not explicitly used in the program and only serves as a 
-- viewpoint into what the database structure resembles

-- TABLE DECLARATION --
--
-- Users Declaration
--
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(20),
  surname VARCHAR(20),
  email VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

--
-- Roles Declaration
--
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role CHAR(20) UNIQUE NOT NULL
);

INSERT INTO roles (role)
VALUES 
  ('student'),
  ('educator');

--
-- User_Roles Declaration 
--
CREATE TABLE user_roles (
  user_uuid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id INT NOT NULL REFERENCES roles(id),
  PRIMARY KEY (user_uuid, role_id)
);

-- 
-- ***********************************************
-- 

--
-- Year_Group Declaration
-- 
CREATE TABLE year_group (
  id SMALLINT PRIMARY KEY -- Will only consist of 3, 4, 5, 6
);

INSERT INTO year_group (id)
VALUES 
  (3),
  (4),
  (5),
  (6);

--
-- Topic Declaration
--
CREATE TABLE topic (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  year_group SMALLINT REFERENCES year_group(id),
  UNIQUE (name, year_group)
);

-- Will need to contain each subtopic and its level
-- or a script on the backend that checs if it already exists and makes a new one if not
INSERT INTO topic (name, year_group) 
VALUES 
-- Number
  ('Addition', 3),
  ('Subtraction', 3),
  ('Multiplication', 3),
  ('Division', 3),
-- Fractions
  ('Fraction Addition', 3),
  ('Fraction Count Up', 3),
  ('Fraction Subtraction', 3),
  ('Fractions (Inc. Decimals)', 4),
  ('Fraction Addition', 4),
  ('Fraction Count Up', 4),
  ('Fraction Subtraction', 4),
  ('Fractions (inc. Decimals & Percentages)', 5),
  ('Fraction Addition', 5),
  ('Fraction Count Up', 5),
  ('Fraction Subtraction', 5),
  ('Fractions (inc. Decimals & Percentages)', 6),
  ('Fraction Addition', 6),
  ('Fraction Count Up', 6),
  ('Fraction Subtraction', 6),
-- Number & Place Value
  ('Count Up', 3),
  ('Count Up', 4),
  ('Count Up', 5),
  ('Count Up', 6),
  ('Number & Place Value', 3),
  ('Number & Place Value', 4),
  ('Number & Place Value', 5),
  ('Number & Place Value', 6);
-- 
-- Subtopic Declaration
-- 
CREATE TABLE subtopic (
  id SERIAL PRIMARY KEY,
  topic_id INT REFERENCES topic(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  UNIQUE (topic_id, name)
);

-- 
-- Question_Type Declaration 
-- 
CREATE TABLE question_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO question_type (name)
VALUES
  ('addition'),
  ('subtraction'),
  ('multiplication'),
  ('division'),
  ('fraction_addition');

-- 
-- Questions Declaration
-- 
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  subtopic_id INT REFERENCES subtopic(id) ON DELETE CASCADE,
  educator_uuid UUID REFERENCES users(id),

  question_type_id INT REFERENCES question_type(id),
  title TEXT NOT NULL,
  input JSONB NOT NULL,
  answer JSONB,

  difficulty SMALLINT CHECK (difficulty BETWEEN 1 AND 5), -- Accounts for future functionality of setting difficulties
  version INT DEFAULT 1, -- Accounts for future functionality of altering questions
  is_active BOOLEAN DEFAULT TRUE, -- Allows for soft deletion of questions through querying

  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

--
-- Completions Declaration
--
CREATE TABLE completions (
  id SERIAL PRIMARY KEY,
  user_uuid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  is_correct BOOLEAN NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_uuid, question_id)
);

-- ****************************************************************** -- 

-- 
-- Indexes
-- 
-- questions indexes
CREATE INDEX idx_questions_subtopic ON questions(subtopic_id);
CREATE INDEX idx_questions_creator ON questions(educator_uuid);
CREATE INDEX idx_questions_type ON questions(question_type_id);
-- completions indexes
CREATE INDEX idx_completions_user ON completions(user_uuid);
CREATE INDEX idx_completions_question ON completions(question_id);
-- 
-- 
-- Views
-- 
CREATE OR REPLACE VIEW question_details AS 
SELECT
  q.id          AS question_id,
  q.subtopic_id AS subtopic_id,
  u.id          AS creator_id,
  u.surname     AS creator_surname,
  yg.id         AS year_group,
  t.name        AS topic_name,
  st.name       AS subtopic_name, 
  qt.name       AS question_type,
  q.title       AS question_title,
  q.input       AS question_input,
  q.answer      AS question_answer
FROM questions q 
JOIN subtopic st      ON q.subtopic_id      = st.id
JOIN topic t          ON st.topic_id        = t.id
JOIN year_group yg    ON t.year_group       = yg.id
JOIN question_type qt ON q.question_type_id = qt.id
LEFT JOIN users u     ON q.educator_uuid    = u.id;

CREATE VIEW user_progress AS 
SELECT
  c.user_uuid,
  q.subtopic_id,
  st.name         AS subtopic_name,
  t.name          AS topic_name,
  yg.id           AS year_group,
  COUNT(*) AS questions_seen,
  SUM(CASE WHEN c.is_correct THEN 1 ELSE 0 END) AS correct_count
FROM completions c
JOIN questions q   ON c.question_id = q.id
JOIN subtopic st   ON q.subtopic_id = st.id
JOIN topic t       ON st.topic_id   = t.id
JOIN year_group yg ON t.year_group  = yg.id
GROUP BY c.user_uuid, q.subtopic_id, st.name, t.name, yg.id;
