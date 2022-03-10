/* Replace with your SQL commands */
/* Replace with your SQL commands */
CREATE TABLE order_products (
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id),
    quantity integer
);