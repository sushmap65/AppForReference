import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ENVIRONMENT, GetServiceInfo , GetScriptConfigInfo } from '../constant';
// import * as moment from 'moment';
// import * as _ from 'lodash';

import 'rxjs/add/operator/map';

@Injectable()
export class AppServicesService {
  private dataString: any;
  private creatUrl;
  private createUrl;
  private currentUrl;
  private requestUrl;
  constructor( private http: Http) {}

  public getAvailableAndSubscribeServices() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // ANUJ TO DO
    const baseUrl = GetServiceInfo + '?appId=AssetDashboard';
    return this.http
            .get(baseUrl, { headers })
            .map((response) => {
              return response.json();
            });
  }
  public getScriptDetailsById(guid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let baseUrl = GetScriptConfigInfo + '?appId=AssetDashboard';

    // let baseUrl = window.location.protocol
    //                 + '//' + window.location.host
    //                 + '/lg/GetScriptConfigInfo?'
    //                 + 'appId=AssetDashboard';
    const dataBody = { 'guid' : guid };
    const fullUrl =  encodeURI(baseUrl);

    return this.http
            .post(fullUrl, dataBody, { headers })
            .map((response) => {
              console.log("0011..." + JSON.stringify(response.json()));
              return response.json();
            });
  }

  public subscribeServices(list) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let baseUrl = this.getURL();
    const fullUrl =  encodeURI(baseUrl);
    const scriptGuid = list;
    const dataBody = { scriptGuid };
    return this.http
            .post(fullUrl, dataBody , { headers })
            .map((response) => {
              return response.json();
            });
  }

  public postUpdateScriptDetails(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // const baseUrl = '/lg/UpdateConfigInfo/?' + 'appId=AssetDashboard';
    const baseUrl = '/lg/asset/configurationitems/?' + 'appId=AssetDashboard';
    const fullUrl =  encodeURI(baseUrl);
    return this.http
            .post(fullUrl, data , { headers })
            .map((response) => {
              console.log("response..." + JSON.stringify(response));
              return response.json();
            });
  }
  public getURL() {
    const baseUrl = window.location.protocol
                    + '//' + window.location.host
                    + '/lg/scriptInstance/create/?'
                    + 'appId=AssetDashboard';
    return baseUrl;
  }
  public getAllAssetsByUser( ) {
    let dataArray = [];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let baseUrl = window.location.protocol
                    + '//' + window.location.host
                    + '/lg/user/asset/get/?appId=AssetDashboard';
    const fullUrl =  encodeURI(baseUrl);
    return this.http.get(fullUrl)
      .map((response) => {
        console.log('response data', response);
        return response.json();
      });
  }
}
