import http from 'k6/http';
import { sleep, check} from 'k6';

export default function () {
  let res = http.get('https://test.k6.io');
  check(res, {
    'is status 200': (res) => res.status === 200,
    'text verification': (res) => res.body.includes("Collection of simple web-pages suitable for load testing.")
  });
  sleep(1);
}
