DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name  VARCHAR(50),
  department_name VARCHAR(50),
  price DECIMAL(10,2),
  stock_quantity INTEGER(10),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Razer Blade 15", "Laptops", 2499.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro", "Laptops", 2999.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ASUS ROG GX800VH", "Laptops", 12699.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NVidia GTX 2080ti", "Computer Accessories", 1199.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Intel Core i9 CPU", "Computer Accessories", 899.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ASUS Gaming Pro Motherboard", "Computer Accessories", 699.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dell 34in Curved Monitor", "Monitors", 1099.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung 32in 4k Monitor", "Monitors", 499.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Acer 27in 2k Monitor", "Monitors", 299.99, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bose A20 AVIATION HEADSET", "Headsets", 999.99, 6);