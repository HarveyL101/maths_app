-- TABLE DECLARATION --

-- USERS TABLE --
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name CHAR(20) NOT NULL,
  email VARCHAR(40) UNIQUE NOT NULL,
  password VARCHAR(20) NOT NULL,

  created_at CURRENT_TIMESTAMP(2)
);

-- EDUCATORS TABLE --
CREATE TABLE educators (
  id SERIAL PRIMARY KEY,
  first_name CHAR(20) NOT NULL,
  surname CHAR(20) NOT NULL,
  email VARCHAR(40) UNIQUE NOT NULL,
  password VARCHAR(20) NOT NULL,

  created_at CURRENT_TIMESTAMP(2)
);

-- YEAR GROUP TABLE -- 
CREATE TABLE year_group (
  id SERIAL PRIMARY KEY,
  year_group SMALLINT UNIQUE NOT NULL -- Will only consist of 3, 4, 5, 6
);

-- IMAGE PATHS TABLE --
CREATE TABLE image_paths (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  path TEXT UNIQUE NOT NULL
);

-- SUBCATEGORY TABLE --
CREATE TABLE subcategory (
  id SERIAL PRIMARY KEY,
  subcategory CHAR(20) NOT NULL
);

-- QUESTIONS TABLE --
CREATE TABLE questions (
  -- Identifiers 
  id SERIAL PRIMARY KEY,
  category_name CHAR(20) REFERENCES category(name),
  educator VARCHAR(40) REFERENCES educators(email),
  

  -- Question details
  image_path TEXT REFERENCES image_paths(path),
  title TEXT NOT NULL,
  input TEXT NOT NULL,
  answer TEXT NOT NULL
);

-- COMPLETIONS TABLE (Student <-> Questions) --
CREATE TABLE completions (
  has_completed BOOLEAN NOT NULL DEFAULT false PRIMARY KEY
  user_id INT REFERENCES users(id),
  question_id INT REFERENCES questions(id)
);

-- CATEGORY TABLE --
CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  year_group SMALLINT REFERENCES year_group(year_group),
  subcategory CHAR(20) REFERENCES subcategory(subcategory),
  name CHAR(20) NOT NULL
);

-- TOOLTIPS TABLE -- 
CREATE TABLE tooltips (
  id SERIAL PRIMARY KEY,
  category CHAR(20) REFERENCES category(category),
  image_path TEXT REFERENCES image_paths(path),
  tooltip TEXT NOT NULL
);

-- ****************************************************************** -- 


-- Change password of user WIP
-- UPDATE users SET password = new_password
--   WHERE users.id = 2

-- LESSONS TABLE -- 
-- CREATE TABLE lessons (
--   -- lesson identifiers
--   id SERIAL PRIMARY KEY,
--   year_group SMALLINT NOT NULL, -- E.g. 3, 4, 5 or 6
--   category CHAR(20) NOT NULL, -- Number, Measurement, Geometry, Statistics 
--   subcategory CHAR(20) NOT NULL, -- Number -> Addition and subtraction

--   -- Tracking characteristics
--   created_at CURRENT_TIMESTAMP(2)
-- );