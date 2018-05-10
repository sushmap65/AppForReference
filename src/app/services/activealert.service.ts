import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {
  ENVIRONMENT,
  AppKeys
} from '../constant';
import {
  ActiveAlertCountParse,
  ActiveAlertEventsCountParse
} from '../parser';
import 'rxjs/add/operator/map';

@Injectable()
export class ActiveAlertService {

  constructor(
    private http: Http
  ) { }

  public setRequestObject(apiUrl, payload) {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers });
      let requestObj = this.http.post(apiUrl, payload, options);

      if ( ENVIRONMENT === 'local' ) {
          requestObj = this.http.get(apiUrl, options);
      }
      return requestObj;
  }

public getActiveAlertData(apiUrl, payload) {
    return this.setRequestObject(apiUrl, payload)
      .repeatWhen(() => Observable.interval(60000))
      .map((response) => {
        const responseData = response.json();
        if (responseData && responseData.status === 'success') {
           console.log('getActiveAlertData:-', responseData);
          return ActiveAlertCountParse(responseData.result);
        }
      // console.log(reponse.json());
      });
  }

public getActiveAlertEventData(apiUrl, payload) {
    return  this.setRequestObject(apiUrl, payload)
      .repeatWhen(() => Observable.interval(60000))
      .map((response) => {
        const responseData = response.json();
        if (responseData && responseData.status === 'success') {
           console.log('getActiveAlertData:-', responseData);
          return ActiveAlertEventsCountParse(responseData.result);
        }
      // console.log(reponse.json());
      });
  }
}