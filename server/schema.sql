-- TABLE DECLARATION --

--
-- Users Declaration
--
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(20),
  email VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

--
-- Roles Declaration
--
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role TEXT UNIQUE NOT NULL
);

INSERT INTO roles (role)
VALUES 
  ('student'),
  ('educator');

--
-- User_Roles Declaration 
--
CREATE TABLE user_roles (
  user_uuid UUID NOT NULL REFERENCES users(id),
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
  name TEXT NOT NULL,
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
  name TEXT NOT NULL,
  UNIQUE (topic_id, name)
);

-- 
-- Question_Type Declaration 
-- 
CREATE TABLE question_type (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
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
-- Attempts Declaration
--
CREATE TABLE attempts (
  id SERIAL PRIMARY KEY,
  user_uuid UUID NOT NULL REFERENCES users(id),
  question_id INT NOT NULL REFERENCES questions(id),
  user_answer JSONB,
  is_correct BOOLEAN NOT NULL,
  time_taken_seconds INT,
  attempted_at TIMESTAMP DEFAULT NOW()
);

-- ****************************************************************** -- 

-- 
-- Indexes
-- 
CREATE INDEX idx_questions_subtopic ON questions(subtopic_id);

CREATE INDEX idx_attempts_user ON attempts(user_uuid);

CREATE INDEX idx_attempts_question ON attempts(question_id);

-- Composite index for any future analytics on user performance
CREATE INDEX idx_attempts_user_question
ON attempts(user_uuid, question_id);

-- 
-- Views
-- 
CREATE VIEW user_accuracy AS  
SELECT 
  user_uuid,
  question_id,
  AVG(CASE WHEN is_correct THEN 1 ELSE 0 END) AS accuracy
FROM 
  attempts
GROUP BY 
  user_uuid, question_id;
