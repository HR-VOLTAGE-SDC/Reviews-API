\c reviews_api;

CREATE INDEX review_id ON reviews_data (id);
CREATE INDEX product_id ON reviews_data (product_id);

CREATE INDEX char_id ON characteristics_data (characteristic_id);

CREATE INDEX char_product_id ON characteristics_data (product_id);

CREATE INDEX helpfulness ON reviews_data (helpfulness);
CREATE INDEX date ON reviews_data (date);