DROP DATABASE IF EXISTS reviews_API;

CREATE DATABASE reviews_API;

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
id SERIAL PRIMARY KEY UNIQUE,
product_id INT NOT NULL,
rating SMALLINT CONSTRAINT check_rating CHECK (rating > 0 AND rating < 6) NOT NULL,
summary VARCHAR(60) NOT NULL,
recommend BOOLEAN NOT NULL,
response VARCHAR(1000) CONSTRAINT check_res CHECK(char_length(response) >= 50) NOT NULL,
body VARCHAR(1000) CONSTRAINT check_min CHECK (char_length(body) >= 50) NOT NULL,
review_date TIMESTAMP NOT NULL,
reviewer_name VARCHAR(255) NOT NULL,
reviewer_email VARCHAR(255) NOT NULL,
helpfulness INT NOT NULL,
reported BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
id SERIAL PRIMARY KEY UNIQUE,
review_id INT NOT NULL,
url VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS characteristics;

CREATE TABLE characteristics (
id SERIAL PRIMARY KEY NOT NULL UNIQUE,
product_id INT NOT NULL,
characteristics_name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS characteristics_reviews;

CREATE TABLE characteristics_reviewss (
id SERIAL PRIMARY KEY NOT NULL UNIQUE,
review_id INT NOT NULL,
characteristic_id INT NOT NULL,
characteristic_rating SMALLINT CONSTRAINT check_char_rating CHECK (characteristic_rating > 0 AND characteristic_rating < 6),
);

ALTER TABLE photos ADD FOREIGN KEY (review_id) REFERENCES reviews(id);

ALTER TABLE characteristics_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews(id);

ALTER TABLE characteristics_reviews ADD FOREIGN KEY (characteristics_id) REFERENCES characteristics(id);