import http from 'k6/http';
import {check, sleep, group } from 'k6';


export let options = {
    stages:[
        {duration: '4m',target:200},
        {duration: '2m',target:200},
        {duration: '1m',target:0},
    ],
    thresholds: {
        http_req_duration: [{threshold:'p(99.9) < 400', abortOnFail:false}]
      },
    };

const SLEEP_DURATION = 0.5;

export default function(){

    let params={
        Headers:{
            "Content-Type":"application/json",

            "X-API-KEY":"3pEExJN3f7AGQ7XWVuQIeZycaE7FdNCp",
            "X-Country-code": "ZMB"
            
        },
        tags:{
            name:"Customer_onboarding",
        },
    };

    group('Customer_onboarding', function(){
        let Customer_onboarding = http.get(
        'https://preprod.api.mtn.com/tmf-api/party/v4/individual',
        params,
        );
        check(Customer_onboarding,{'is status 200':(r)=>r.status === 200,
    //'is api key present':(r)=> r.json().hasOwnProperty('api_key'),
});
    //params.headers['api-key']=login_response.json()['api_key']; sleep(SLEEP_DURATION);
});
}