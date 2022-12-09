CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(64),
    lastName VARCHAR(64),
    password VARCHAR(200)
);