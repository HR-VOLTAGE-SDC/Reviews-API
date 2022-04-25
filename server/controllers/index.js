require('dotenv').config();
const models = require('../models/index.js');

module.exports = {
  getReviews: (req, res) => {
    models.getReviews(req.query)
    .then((data) => res.status(200).json({
       product: req.query.product_id,
        page: req.query.page ? req.query.page : 1,
        count: req.query.count ? req.query.count: 5,
        results: data.rows,
    }))
    .catch((err) => res.sendStatus(400))
  },
  getMeta: (req, res) => {
    models.getMeta(req.query)
    .then((data) => res.status(200).json(data.rows[0].json_build_object))
    .catch((err) => res.sendStatus(400))
  },
  postReview: (req, res) => {
    models.postReview(req.body)
    .then((data) => res.sendStatus(201))
    .catch((err) => res.sendStatus(500))
  },
  helpfulReview: (req, res) => {
    models.helpfulReview(req.params)
    .then((data) => res.sendStatus(200))
    .catch((err) => res.sendStatus(500))
  },
  reportReview: (req, res) => {
    models.reportReview(req.params)
    .then((data) => res.sendStatus(200))
    .catch((err) => res.sendStatus(500))
  },
};