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

CREATE TABLE characteristics_data AS SELECT c.characteristic_id, c.product_id, c.name, r.review_id, r.value
FROM (SELECT generate_series(min(id), max(id))::BIGINT AS characteristic_id, product_id, name FROM characteristics GROUP BY product_id, name) c LEFT JOIN characteristics_reviews r ON c.characteristic_id = r.characteristic_id ORDER BY c.product_id;

ALTER TABLE characteristics_data ADD id BIGSERIAL PRIMARY KEY UNIQUE;

ALTER TABLE characteristics_data ADD FOREIGN KEY (review_id) REFERENCES reviews_data(id);

ALTER TABLE reviews_data ALTER reported SET DEFAULT false;

ALTER TABLE reviews_data ALTER response SET DEFAULT null;

ALTER TABLE reviews_data ALTER helpfulness SET DEFAULT 0;

ALTER TABLE reviews_data ALTER photos SET DEFAULT '[]';

DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS characteristics CASCADE;
DROP TABLE IF EXISTS characteristics_reviews CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS photos_data;