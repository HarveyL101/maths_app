-- USERS TABLE --
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name CHAR(20) NOT NULL,
  email VARCHAR(40) UNIQUE NOT NULL,
  password VARCHAR(20) NOT NULL
  created_at CURRENT_TIMESTAMP(2)
);

INSERT INTO users (name, email, password) VALUES
  ('Admin', 'Admin@gmail.com', 'admin123'),
  ('Ella', 'Ellajoyce50@gmail.com', 'EllasPassword'),
  ('Harvey', 'Harveylopez50@gmail.com', 'HarveysPassword'),
  ('Alex', 'Alexnicholson50@gmail.com', 'AlexsPassword');

-- EDUCATORS TABLE --
CREATE TABLE educators (
  id SERIAL PRIMARY KEY,
  first_name CHAR(20) NOT NULL,
  surname CHAR(20) NOT NULL,
  email VARCHAR(40) UNIQUE NOT NULL,
  password VARCHAR(20) NOT NULL,
  created_at CURRENT_TIMESTAMP(2)
);

INSERT INTO users (first_name, surname, email, password) VALUES
  ('Gareth', 'Holvey', 'goat@gmail.com', 'password123');

-- LESSONS TABLE -- 
CREATE TABLE lessons (
  -- lesson identifiers
  id SERIAL PRIMARY KEY,
  year_group SMALLINT NOT NULL, -- E.g. 3, 4, 5 or 6
  category CHAR(20) NOT NULL, -- Number, Measurement, Geometry, Statistics 
  subcategory CHAR(20) NOT NULL, -- Number -> Addition and subtraction

  -- Tracking characteristics
  created_at CURRENT_TIMESTAMP(2)
);

-- QUESTIONS TABLE --
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  category CHAR,
  type CHAR(20)
  FOREIGN KEY category REFERENCES lessons(category)
  FOREIGN KEY (created_by) REFERENCES educators(email) SET NULL
);

-- TOOLTIPS TABLE -- 
CREATE TABLE tooltips (
  id SERIAL PRIMARY KEY,
  -- Image to be stored with tooltip will go here (Can be Null) 
  tooltip text NOT NULL,
  type CHAR 
);

-- Change password of user WIP
-- UPDATE users SET password = new_password
--   WHERE users.id = 2