const express = require('express');
const controllers = require('./controllers/index.js');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

//set port
app.set('port', PORT);

//middleware
app.use(morgan('dev'));
app.use(express.json());

//routes
app.get('/reviews', controllers.getReviews);
app.get('/reviews/meta', controllers.getMeta);
app.post('/reviews', controllers.postReview);
app.put('/reviews/:review_id/helpful', controllers.helpfulReview);
app.put('/reviews/:review_id/report', controllers.reportReview);

//serve client
// app.use(express.static());

//run server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, ()=> console.log(`Reviews Server listening at port: ${PORT}`));
}

module.exports = app;