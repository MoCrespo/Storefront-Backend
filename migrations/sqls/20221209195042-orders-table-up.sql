CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(64),
    user_id BIGINT REFERENCES users(id)
);