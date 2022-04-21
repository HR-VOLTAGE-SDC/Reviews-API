\c reviews_api;

\COPY reviews FROM '/Users/eunkim/Desktop/SDC/Data/reviews.csv' DELIMITER ',' CSV HEADER;

\COPY photos FROM '/Users/eunkim/Desktop/SDC/Data/reviews_photos.csv' DELIMITER ',' CSV HEADER;

\COPY characteristics FROM '/Users/eunkim/Desktop/SDC/Data/characteristics.csv' DELIMITER ',' CSV HEADER;

\COPY characteristics_reviews FROM '/Users/eunkim/Desktop/SDC/Data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
