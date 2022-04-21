const mongoose = require('mongoose');

const reviewsSchema = mongoose.Schema({
id: Number NOT NULL,
product_id: Number,
rating: {
  type: Number,
  min: 1,
  max: 5,
},
summary: {
  type: String,
  max: 60,
},
recommend: Boolean,
response: {
  type: String,
  min: 50,
  max: 1,000,
},
body: {
  type: String,
  min: 50,
  max: 1,000,
},
review_date: String,
reviewer_name: String,
reviewer_email: String,
helpfulness: Number,
reported: Boolean,
photos: [{
  id: Number,
  url: String,
},
],
});

const prod_reviewsSchema = mongoose.Schema({
  product_id: Number NOT NULL,
  reviews: [reviewsSchema],
  meta: {
    ratings: {
      1: Number,
      2: Number,
      3: Number,
      4: Number,
      5: Number,
    },
    recommended: {
    true: Number,
    false: Number,
  },
  characteristics: {
    Size: {
      id: Number,
      value: Number,
    },
    Width: {
      id: Number,
      value: Number,
    },
    Comfort: {
      id: Number,
      value: Number,
    },
    Quality: {
      id: Number,
      value: Number,
    },
    Length: {
      id: Number,
      value: Number,
    },
    Fit: {
      id: Number,
      value: Number,
    },
  },
  },
})

module.exports = {
  reviewsSchema,
  prod_reviewsSchema,
};