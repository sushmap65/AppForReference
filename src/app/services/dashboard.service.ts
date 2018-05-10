import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as moment from 'moment';
import * as _ from 'lodash';
import {
  revenueDataParser,
  AllEventParser,
  MttrParser,
  UpcomingServiceParser,
  ServiceRealizationParser
} from '../parser';
import {
    ENVIRONMENT,
    AppKeys,
    RevenueData,
    AllEvents
  } from '../constant';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DashboardDataService {
  public dataString: any;
  public creatUrl;
  public createUrl;
  public currentUrl;
  public requestUrl;

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
  // Fleet data
  public getFleetData(apiUrl) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    return this.http.get(apiUrl, options)
      .repeatWhen(() => Observable.interval(60000))
      .map((response) => {
        const myData = response.json();
        return myData.result;
      });
  }

  // Revenue Data
  public getRevenueData(apiUrl, payload) {
    const requestObj = this.setRequestObject(apiUrl, payload);

    return requestObj
      .map((response) => {
        const myData = response.json();
        const revData = revenueDataParser(myData.result.revenue);
        //console.log('revData:-', revData);
        return revData;
      });
  }
  // MTTR Data
  public getMttrData(apiUrl, payload) {
    const requestObj = this.setRequestObject(apiUrl, payload);

    return requestObj
      .map((response) => {
        const myData = response.json();
        const mttData =  MttrParser(myData.result);
      //  console.log('mttData:-', mttData);
        return mttData;
      });
  }

  // get UpcomingService Data
  public getUpcomingServiceData(apiUrl, payload) {
    const requestObj = this.setRequestObject(apiUrl, payload);

    return requestObj
      .map((response) => {
        const myData = response.json();
        const upcomingData = UpcomingServiceParser(myData.result);
       // console.log('upcomingData:-', upcomingData);
        return upcomingData;
      });
  }
  // get serviceRealization Data
  public getServiceRealizationData(apiUrl, payload) {
    const requestObj = this.setRequestObject(apiUrl, payload);

    return requestObj
      .map((response) => {
        const myData = response.json();
        const servicReData = ServiceRealizationParser(myData.result);
      //  console.log('servicReData:-', servicReData);
        return servicReData;
      });
  }
  // Overall Event Data
  public getAllEvents(apiUrl, payload) {
    const requestObj = this.setRequestObject(apiUrl, payload);

    return requestObj
      .repeatWhen(() => Observable.interval(60000))
      .map((response) => {
        const myData = response.json();
        const allData =  AllEventParser(myData.result);
       // console.log('allData:-', allData);
        return allData;
      });
  }

}
