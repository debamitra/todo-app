

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
  
);


CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  message VARCHAR(255),
  status boolean DEFAULT false,
  completed_on BIGINT,
  user_id UUID REFERENCES users(user_id)
);

CREATE TABLE list(
  list_id SERIAL PRIMARY KEY,
  list_name VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(user_id) 
);

ALTER TABLE todo 
ADD user_list_id INT REFERENCES list(user_list_id);

ALTER TABLE list 
ADD user_list_id INT ;





INSERT INTO todo (message, user_id) VALUES ('this is a test todo', '8a13ed04-01da-4e8f-b34a-e62ba9927dae');

INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly213@gmail.com', 'kthl8822');





