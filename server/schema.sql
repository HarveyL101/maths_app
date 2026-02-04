-- TABLE DECLARATION --

-- USERS TABLE --
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(20),
  email VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ROLES TABLE --
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role CHAR(30) UNIQUE NOT NULL
);

-- USER_ROLES TABLE --
CREATE TABLE user_roles (
  user_uuid UUID NOT NULL REFERENCES users(id),
  role_id INT NOT NULL REFERENCES roles(id),
  PRIMARY KEY (user_uuid, role_id)
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

-- CATEGORY_SUBCATEGORIES TABLE --
CREATE TABLE category_subcategories (
  category_id INT REFERENCES category(id),
  subcategory_id INT REFERENCES subcategory(id),
  PRIMARY KEY (category_id, subcategory_id)
);

-- QUESTIONS TABLE --
CREATE TABLE questions (
  -- Identifiers 
  id serial PRIMARY KEY,
  category_id INT REFERENCES category(id),
  educator_uuid UUID REFERENCES users(id),
  image_path TEXT REFERENCES image_paths(path),
  title TEXT NOT NULL,
  input TEXT NOT NULL,
  answer TEXT NOT NULL
);

-- COMPLETIONS TABLE (Student <-> Questions) --
CREATE TABLE completions (
  user_uuid UUID NOT NULL REFERENCES users(id),
  question_id INT NOT NULL REFERENCES questions(id),
  completed_at TIMESTAMP NOT NULL,
  PRIMARY KEY (user_uuid, question_id)
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
-- CREATE ROLE user;
-- CREATE ROLE educator;

-- INDEXES --
-- CREATE INDEX
-- ON users (email, isEducator); -- lowers time complexity for frequently used searches

-- INSERT STATEMENTS -- 

-- ROLES --
INSERT INTO roles (role)
VALUES 
  ('student'),
  ('educator');

-- YEAR_GROUP --
INSERT INTO year_group (year_group)
VALUES 
  (3),
  (4),
  (5),
  (6);

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