const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
 host: process.env.HOST,
 user: process.env.USER,
 password: process.env.PW,
 database: process.env.DB,
 port: process.env.PORT
});

const db = pool.connect();

db
.then(db => console.log('Connected to: PSQL'))
.catch(err =>
  console.log(err, 'Issue connecting to PSQL'))

module.exports = pool;