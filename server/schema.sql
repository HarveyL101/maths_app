CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name CHAR(20) NOT NULL,
  email VARCHAR(40) UNIQUE NOT NULL,
  password VARCHAR(20) NOT NULL
  created_at CURRENT_TIMESTAMP(2)
);

-- Test Variables
INSERT INTO users (name, email, password) VALUES
  ('Ella', 'Ellajoyce50@gmail.com', 'EllasPassword'),
  ('Harvey', 'Harveylopez50@gmail.com', 'HarveysPassword'),
  ('Alex', 'Alexnicholson50@gmail.com', 'AlexsPassword');


-- Change password of user
UPDATE users SET password = new_password
  WHERE users.id = 2