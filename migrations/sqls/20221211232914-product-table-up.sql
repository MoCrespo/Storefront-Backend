-- create products table 
CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price INT NOT NULL
)