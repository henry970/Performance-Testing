import http from 'k6/http';
import { sleep, check} from 'k6';

export default function () {
  var domain = 'https://test.k6.io/'

  let res = http.get(domain, {tags: { name: '01_home'}});
  check(res, {
    'is status 200': (r) => r.status === 200,
    'text verification': (r) => r.body.includes("Collection of simple web-pages suitable for load testing.")
  });
  sleep(1);

  res = http.get(domain + 'flip_coin.php', {
    tags: {name: '02_VisitFlipCoin'}});
  check(res, {
    'is status 200': (r) => r.status === 200,
    'text verification': (r) => r.body.includes("Your bet")
  });
// send a message

  let data = {bet:'head'}
  res = http.post(domain + 'flip_coin.php', data, {
  tags: {name: '03_clickheads' }});
  check(res, {
     'is status 200': (r) => r.status === 200,
     'text verification': (r) => r.body.includes("Your bet: heads.")
  });

}

