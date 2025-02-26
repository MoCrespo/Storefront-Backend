-- create orders table 
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64) NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL
)