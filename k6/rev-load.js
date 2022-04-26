import http from 'k6/http';
import { check, sleep } from 'k6';

//load testing setup
export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse:false,
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 100,
      maxVUs: 100
    }
  },
};

//load test setup
export default function () {
  let id = Math.floor(Math.random()*99999);
  const url = `http://localhost:3000/reviews/?product_id=${id}`
  http.get(url);
  sleep(1);
};

