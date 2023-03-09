import http from 'k6/http';
import { sleep, check} from 'k6';

export const options = {
    duration: '5m',
    vus: 5,
};

export default function () {
    let res = http.get('https://test.k6.io', {tags: {name: '01_Get time duration'}})
    check(res,{
        'is status 200': (r) => r.status === 200,
        'text verification': (r) => r.body.includes("Collection of simple web-pages suitable for load testing.")
    })
  

  sleep(Math.round( ) * 5);
}