\c reviews_api;

DROP TABLE IF EXISTS photos_data;

CREATE TABLE photos_data as SELECT photos.review_id, STRING_AGG(photos.url, ',') as photos FROM photos GROUP BY photos.review_id;

DROP TABLE IF EXISTS reviews_data;

CREATE TABLE reviews_data AS SELECT reviews.*, photos_data.photos FROM reviews LEFT JOIN photos_data ON reviews.id = photos_data.review_id ORDER BY reviews.product_id;

DROP TABLE IF EXISTS characteristics_data;

CREATE TABLE characteristics_data as SELECT characteristics_reviews.id,  characteristics.product_id,characteristics_reviews.characteristic_id, characteristics_reviews.review_id, characteristics.name, characteristics_reviews.value FROM characteristics INNER JOIN characteristics_reviews on characteristics.id = characteristics_reviews.characteristic_id ORDER BY characteristics.product_id;

DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS characteristics CASCADE;
DROP TABLE IF EXISTS characteristics_reviews CASCADE;
DROP TABLE IF EXISTS photos_data;

-- should leave me with exactly two tables!

