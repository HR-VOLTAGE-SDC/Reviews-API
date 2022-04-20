DROP DATABASE IF EXISTS reviews_API;

CREATE DATABASE reviews_API;

DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS review_characteristics;

CREATE TABLE reviews (
id BIGSERIAL NOT NULL UNIQUE AUTO_INCREMENT,
product_id INT,
rating SMALLINT CONSTRAINT check_rating CHECK (rating > 0 AND rating < 6),
summary VARCHAR(60),
recommend BOOLEAN,
response ,
body VARCHAR(1000) CONSTRAINT check_min CHECK (char_length(body) >= 50),
review_date TIMESTAMP,
reviewer_name VARCHAR(60),
reviewer_email VARCHAR(60),
helpfulness BOOLEAN,
reported BOOLEAN,
//ask Eric about whether photos is necessary //here or if I can combine both
photos VARCHAR ARRAY[5],
);

CREATE TABLE photos (
id BIGSERIAL NOT NULL UNIQUE AUTO_INCREMENT,
review_id INT NOT NULL,
photo_url VARCHAR,
);

CREATE TABLE characteristics (
id BIGSERIAL NOT NULL UNIQUE AUTO_INCREMENT,
product_id INT NOT NULL,
characteristics_name VARCHAR(50),
);

CREATE TABLE review_characteristics (
id BIGSERIAL NOT NULL UNIQUE AUTO_INCREMENT,
review_id INT NOT NULL,
characteristic_id INT NOT NULL,
characteristic_rating SMALLINT CONSTRAINT check_char_rating CHECK (characteristic_rating > 0 AND characteristic_rating < 6),
);

ALTER TABLE photos ADD FOREIGN KEY (review_id) REFERENCES reviews(id);

ALTER TABLE review_characteristics ADD FOREIGN KEY (review_id) REFERENCES reviews(id);

ALTER TABLE review_characteristics ADD FOREIGN KEY (characteristics_id) REFERENCES characteristics(id);