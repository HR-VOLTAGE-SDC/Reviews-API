const pool = require('../db/index.js');
const format = require('pg-format');

module.exports = {
  getReviews: (req) => {
    const product_id = req.product_id;
    const page = req.page > 0 ? `${req.page}` : 1;
    const count = req.count > 0 ? `${req.page}` : 5;
    let sort;
    //pagination
    const offset = (page * count) - count;

    if (!req.sort || req.sort === 'relevance') {
      sort = 'helpfulness DESC, date DESC';
    } else if (req.sort === 'newest') {
      sort = 'date DESC';
    } else if (req.sort === 'helpful') {
      sort = 'helpfulness DESC';
    }

    const text = format(`SELECT * FROM reviews_data WHERE product_id = %L ORDER BY %s LIMIT %L OFFSET %L`, product_id, sort, count, offset);

    return pool.query(text)
      .catch((err) =>
        console.log(err, 'err getting reviews'))
  },
  getMeta: (req) => {
    const product_id = req.product_id;

    const text = format(`SELECT JSON_BUILD_OBJECT(
      'product_id', %L,
      'ratings', (SELECT JSON_OBJECT_AGG(rating, rating_data)
        FROM (SELECT rating, count(*) AS rating_data FROM reviews_data WHERE product_id = %L GROUP BY rating) AS rate),
      'recommended', (SELECT JSON_OBJECT_AGG(recommend, rec_data)
        FROM (SELECT recommend, count(*) AS rec_data FROM reviews_data WHERE product_id = %L GROUP BY recommend) AS rec),
      'characteristics', (SELECT JSON_OBJECT_AGG(name, JSON_BUILD_OBJECT(
              'id', characteristic_id,
              'value', value
        ))
        FROM (SELECT name, characteristic_id, sum(value)/count(*) AS value
          FROM characteristics_data WHERE product_id = %L GROUP BY  name, characteristic_id) AS char)
    )`, product_id, product_id, product_id, product_id)

    return pool.query(text)
      .catch((err) => console.log(err, 'err getting meta data'))
  },
  postReview: (req) => {
    const product_id = req.product_id;
    const rating = req.rating;
    const summary = req.summary;
    const body = req.body;
    const recommend = req.recommend;
    const name = req.name;
    const email = req.email;
    const photos = req.photos.length > 0 ? req.photos : null;
    let photoset = [];
    let text;

    if (photos) {
      photos.forEach((photo) => {
        photoset.push({ url: photo });
      });
      text = format(`INSERT INTO reviews_data (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, photos) VALUES (%L, %L, NOW() AT TIME ZONE 'UTC', %L, %L, %L, %L, %L, %L) RETURNING id AS review_id`, product_id, rating, summary, body, recommend, name, email, photoset);
    } else {
      text = format(`INSERT INTO reviews_data (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email) VALUES (%L, %L, NOW() AT TIME ZONE 'UTC', %L, %L, %L, %L, %L) RETURNING id AS review_id`, product_id, rating, summary, body, recommend, name, email);
    }

    return pool.query(text)
      .then((data) => {
        if (req.characteristics) {
          for (let key in req.characteristics) {
            let textz = format(`INSERT INTO characteristics_data (product_id, characteristic_id, review_id, name, value) VALUES (%L, %L, %L, (SELECT name FROM characteristics_data WHERE characteristics_data.characteristic_id = %L AND characteristics_data.product_id = %L LIMIT 1), %L)`, product_id, key, data.rows[0].review_id, key, product_id, req.characteristics[key]);

            pool.query(textz)
              .catch((err) => console.log(err, 'err posting chars'))
          }
        }
      })
      .catch((err) => console.log(err, 'err posting review'))
  },
  reportReview: (req, res) => {
    const review_id = req.review_id;
    const text = format(`UPDATE reviews_data SET reported = true WHERE id = %L`, review_id);
    return pool.query(text)
      .catch((err) => console.log(err, 'err reporting'))
  },
  helpfulReview: (req, res) => {
    const review_id = req.review_id;
    const text = format(`UPDATE reviews_data SET helpfulness = helpfulness+1 WHERE id = %L`, review_id);
    return pool.query(text)
      .catch((err) => console.log(err, 'err updating helpfulness'))
  },
};