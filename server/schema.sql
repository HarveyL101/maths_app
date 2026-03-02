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
  role CHAR(30) UNIQUE NOT NULL
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
-- Questions Declaration
-- 
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  subtopic_id INT REFERENCES subtopic(id) ON DELETE CASCADE,
  educator_uuid UUID REFERENCES users(id),

  title TEXT NOT NULL,
  question_text TEXT NOT NULL,
  input JSONB,
  answer JSONB,

  difficulty SMALLINT CHECK (difficulty BETWEEN 1 AND 5),
  version INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,

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
