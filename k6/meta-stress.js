import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse:false,
  stages: [
    { duration: '15s', target: 100 },
    { duration: '30s', target: 100 },
    { duration: '15s', target: 250 },
    { duration: '30s', target: 250 },
    { duration: '15s', target: 500 },
    { duration: '30s', target: 500 },
    { duration: '15s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '60s', target: 0 }
  ],
};
//load test setup
export default function () {
  let id = Math.floor(Math.random()*99999);
  const url = `http://localhost:3000/reviews/meta/?product_id=${id}`
  http.get(url);
  sleep(1);
};

