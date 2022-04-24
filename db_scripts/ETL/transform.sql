\c reviews_api;

UPDATE reviews SET date = date/1000;
ALTER TABLE reviews ALTER date TYPE TIMESTAMP WITHOUT TIME ZONE USING to_timestamp(date) AT TIME ZONE 'UTC';

DROP TABLE IF EXISTS photos_data;
CREATE TABLE photos_data as SELECT photos.review_id, JSON_AGG(JSON_BUILD_OBJECT('url', url)) as photos FROM photos GROUP BY photos.review_id;

DROP TABLE IF EXISTS reviews_data CASCADE;
CREATE TABLE reviews_data AS SELECT reviews.*, photos_data.photos FROM reviews LEFT JOIN photos_data ON reviews.rev_id = photos_data.review_id ORDER BY reviews.rev_id;

ALTER TABLE reviews_data ADD id BIGSERIAL PRIMARY KEY UNIQUE;

ALTER TABLE reviews_data DROP rev_id;

DROP TABLE IF EXISTS characteristics_data;

CREATE TABLE characteristics_data as SELECT characteristics_reviews.id,  characteristics.product_id,characteristics_reviews.characteristic_id, characteristics_reviews.review_id, characteristics.name, characteristics_reviews.value FROM characteristics INNER JOIN characteristics_reviews on characteristics.id = characteristics_reviews.characteristic_id ORDER BY characteristics_reviews.id;

ALTER TABLE characteristics_data DROP id;
ALTER TABLE characteristics_data ADD id BIGSERIAL PRIMARY KEY UNIQUE;

DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS characteristics CASCADE;
DROP TABLE IF EXISTS characteristics_reviews CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS photos_data;

ALTER TABLE characteristics_data ADD FOREIGN KEY (review_id) REFERENCES reviews_data(id);

ALTER TABLE reviews_data ALTER reported SET DEFAULT false;

ALTER TABLE reviews_data ALTER response SET DEFAULT null;

ALTER TABLE reviews_data ALTER helpfulness SET DEFAULT 0;

-- should leave me with exactly two tables!
-- update would not work for me whatsoever...
