const app = require('../app.js');
const request = require('supertest');

describe('GET /reviews', function () {
  it('responds with reviews for the correct product_id',  () => {
    request(app)
    .get('/reviews')
    .query({product_id: 11})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.product_id).toBe(11);
      expect(res.results).not.toBeNull();
      expect(200, done);
    })
  }),
  it('responds with 400 if incorrect product_id value provided',  () => {
    request(app)
    .get('/reviews')
    .query({product_id: 'Hello'})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400);
  }),
  it('responds with correct number of reviews based on page and count params',  () => {
    request(app)
    .get('/reviews')
    .query({product_id: 11, page: 1, count: 7})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.results.length).toBe(7);
      expect(200, done);
    })
  }),
  it('does not respond with reviews marked reported',  () => {
    request(app)
    .get('/reviews')
    .query({product_id: 11, page: 1, count: 7})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.results[0].reported).toBe(false);
      expect(200, done);
    })
  })
})

describe('GET /reviews/meta', function () {
  it('responds with meta data for correct product_id', () => {
    request(app)
    .get('/reviews')
    .query({product_id: 25})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.product_id).toBe(25);
      expect(res).not.toBeNull();
      expect(200, done);
    })
  }),
  it('responds with meta data for ratings', () => {
    request(app)
    .get('/reviews')
    .query({product_id: 25})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res).toEqual(
        expect.objectContaining({
          ratings: expect.any(Object),
        }),
      );
      expect(200, done);
    })
  }),
  it('responds with meta data for recommended', () => {
    request(app)
    .get('/reviews')
    .query({product_id: 25})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res).toEqual(
        expect.objectContaining({
          recommended: expect.any(Object),
        }),
      );
      expect(200, done);
    })
  }),
  it('responds with meta data for characteristics', () => {
    request(app)
    .get('/reviews')
    .query({product_id: 25})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res).toEqual(
        expect.objectContaining({
          characteristics: expect.any(Object),
        }),
      );
      expect(200, done);
    })
  }),
  it('total of ratings values should match total of recommended values', () => {
    request(app)
    .get('/reviews')
    .query({product_id: 25})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(Object.values(res.ratings).reduce((a,b) => a + b)).toEqual(
        Object.values(res.recommended).reduce((a,b) => a + b));
      expect(200, done);
     })
  })
})

describe('POST /reviews', function () {
  it('should be able to successfully post a review for the correct product_id', () => {
    request(app)
    .post('/reviews')
    .body({product_id: 15})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201, done);
  })
})

// describe('PUT /reviews/:review_id/helpful', function () {
//   it('', () => {
//     request(app)
//     .get('/reviews')
//     .query({product_id: 11})
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .expect(200, done);
//   })
// })

// describe('PUT /reviews/:review_id/report', function () {
//   it('', () => {
//     request(app)
//     .get('/reviews')
//     .query({product_id: 11})
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .expect(200, done);
//   })
// })