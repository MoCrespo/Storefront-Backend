-- create order_products table 
CREATE TABLE IF NOT EXISTS order_products(
    id SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id)
)