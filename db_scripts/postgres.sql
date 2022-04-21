DROP DATABASE IF EXISTS reviews_API;

CREATE DATABASE reviews_API;

\c reviews_api;

DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews (
id SERIAL PRIMARY KEY UNIQUE,
product_id INT NOT NULL,
rating SMALLINT CONSTRAINT check_rating CHECK (rating > 0 AND rating < 6) NOT NULL,
date BIGINT NOT NULL,
summary VARCHAR(255) NOT NULL,
body VARCHAR(1000) NOT NULL,
recommend BOOLEAN NOT NULL,
reported BOOLEAN NOT NULL,
reviewer_name VARCHAR(255) NOT NULL,
reviewer_email VARCHAR(255) NOT NULL,
response VARCHAR(1000) NOT NULL,
helpfulness INT NOT NULL
);

DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE photos (
id SERIAL PRIMARY KEY UNIQUE,
review_id INT NOT NULL,
url VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS characteristics CASCADE;

CREATE TABLE characteristics (
id SERIAL PRIMARY KEY NOT NULL UNIQUE,
product_id INT NOT NULL,
name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS characteristics_reviews CASCADE;

CREATE TABLE characteristics_reviews (
id SERIAL PRIMARY KEY NOT NULL UNIQUE,
characteristic_id INT NOT NULL,
review_id INT NOT NULL,
value SMALLINT CONSTRAINT check_char_rating CHECK (value > 0 AND value < 6)
);

ALTER TABLE photos ADD FOREIGN KEY (review_id) REFERENCES reviews(id);

ALTER TABLE characteristics_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews(id);

ALTER TABLE characteristics_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics(id);