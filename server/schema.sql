-- TABLE DECLARATION --

-- USERS TABLE --
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(20),
  email VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  isEducator BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- YEAR GROUP TABLE -- 
CREATE TABLE year_group (
  year_group SMALLINT PRIMARY KEY -- Will only consist of 3, 4, 5, 6
);

-- IMAGE PATHS TABLE --
CREATE TABLE image_paths (
  id serial PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  path TEXT UNIQUE NOT NULL
);

-- SUBCATEGORY TABLE --
CREATE TABLE subcategory (
  id serial PRIMARY KEY,
  subcategory CHAR(40) NOT NULL
);

-- CATEGORY TABLE --
CREATE TABLE category (
  id serial PRIMARY KEY,
  year_group SMALLINT REFERENCES year_group(year_group),
  subcategory_id INT REFERENCES subcategory(id),
  name VARCHAR(20) NOT NULL UNIQUE
);

-- QUESTIONS TABLE --
CREATE TABLE questions (
  -- Identifiers 
  id serial PRIMARY KEY,
  category_id INT REFERENCES category(id),
  educator_email VARCHAR(50) REFERENCES users(email),
  image_path TEXT REFERENCES image_paths(path),
  title TEXT NOT NULL,
  input TEXT NOT NULL,
  answer TEXT NOT NULL
);

-- COMPLETIONS TABLE (Student <-> Questions) --
CREATE TABLE completions (
  user_id UUID NOT NULL REFERENCES users(id),
  question_id INT NOT NULL REFERENCES questions(id),
  has_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP DEFAULT NULL,
  PRIMARY KEY (user_id, question_id)
);

-- TOOLTIPS TABLE -- 
CREATE TABLE tooltips (
  id serial PRIMARY KEY,
  category_id INT REFERENCES category(id),
  image_path TEXT REFERENCES image_paths(path),
  tooltip TEXT NOT NULL
);

-- ****************************************************************** -- 

-- ROLES --
CREATE ROLE user;
CREATE ROLE educator;

-- INDEXES --
CREATE INDEX
ON users (email, isEducator); -- lowers time complexity for frequently used searches



-- Change password of user WIP
-- UPDATE users SET password = new_password
--   WHERE users.id = 2

-- LESSONS TABLE -- 
-- CREATE TABLE lessons (
--   -- lesson identifiers
--   id UUID PRIMARY KEY,
--   year_group SMALLINT NOT NULL, -- E.g. 3, 4, 5 or 6
--   category CHAR(20) NOT NULL, -- Number, Measurement, Geometry, Statistics 
--   subcategory CHAR(20) NOT NULL, -- Number -> Addition and subtraction

--   -- Tracking characteristics
--   created_at TIMESTAMP DEFAULT NOW()
-- );