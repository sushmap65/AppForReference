import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import {
  ENVIRONMENT,
  FindAsset,
  AssetStatus,
  GetOrgByAssetIdAndType,
  GetHealthAlertByIds,
  GetUtilizationByAssetId,
  GetAggregatedData,
  AppKeys
} from '../constant';
import {
  AssetStatusDIParse,
  AssetStatusEventParser,
  AssetEventCountParse,
  AssetAlertCountParse,
  AlertDiParser,
  AlerthealthParser,
  ActiveAlertCountParse,
  historicalDataForLineChart,
  AggregatedDataForLineChart
} from '../parser';
import 'rxjs/add/operator/map';

@Injectable()
export class AssetDataService {
  public dataString: any;

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
  public findAssetQuery(query, $userId, $appId) {
    const payload = {
      query,
      $appId,
      $userId,
      pageOffset: '0'
    };

    return this.setRequestObject(FindAsset, payload)
      .map((response) => {
          return response.json();
      }).catch(this.handleError);
  }

  public findAssetById(id, $userId, $appId) {
    const query = 'guid|' +  id;
    const payload = {
      query,
      $appId,
      $userId,
      pageOffset: '0'
    };

    return this.setRequestObject(FindAsset, payload)
      .map((response) => {
        const responseData = response.json();
        if (responseData && responseData.status === 'success') {
          return responseData.result;
        }
      });
  }

  public getParentData(apiurl) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    let requestObj = this.http.get(apiurl, options);
      return requestObj
     .map(response => {
       const responseData = response.json();
       if (responseData && responseData.status === 'success') {
           const orgId = responseData.result.org[0].guid;
           // console.log('orgid is:-', orgId)
           return orgId;
       }
     });

  }

  public getAssetData(apiurl, payload) {
    return this.setRequestObject(apiurl, payload)
     .map(response => {
       const responseData = response.json();
       if (responseData && responseData.status === 'success') {
           const assetdetails = responseData.result;
          // console.log('assetdetails:::', assetdetails);
           return assetdetails;
       }
     });
  }

  public getAssetStatusById(id, user, appId) {
    // PROD
    let url = AssetStatus + '?appId=' + appId;
    const guids = [id];
    const payload = { guids };
    if ( ENVIRONMENT === 'local' ) {
      url = AssetStatus;
    }
    return this.setRequestObject(url, payload)
    .repeatWhen(() => Observable.interval(60000))
    .map((response) => {
      const responseData = response.json();
      if (responseData && responseData.status === 'success') {
        const dataItem = AssetStatusDIParse(responseData.result);
        const dataEvent = AssetStatusEventParser(responseData.result);
        const healthData = AlerthealthParser(dataItem);
        return {
          dataItem,
          dataEvent,
          healthData
        };
      }
    });
  }

  public getAssetHistoricalData(assetId, id, name) {
    let createUrl;
    let baseUrl = GetUtilizationByAssetId+'?appId='+AppKeys.assetDashBoard;
    const dataItemName = name;
    const dataBody = { guids: [assetId], ids: [ id ] };
    return this.setRequestObject(baseUrl, dataBody)
      .map((response) => {
        return historicalDataForLineChart(response.json(), dataItemName);
      });
  }

  getAssetAggregatedData(assetId, itemName, startdate, enddate, ids, fName, resolution) {
    const dataItemName = itemName;
    const url = GetAggregatedData+'?appId='+AppKeys.assetDashBoard;
    const dataBody = {"guids": [assetId] ,"ids":[{"guid": ids ,"function": fName,"resolution": resolution}],
      "filters": [
      { 

        "time": [
          {

            "gte": startdate

          },

          {

            "lte": enddate

          },

          {

            "op": "&"

          }

        ]

      }

    ] };
    return this.setRequestObject(url, dataBody)
    .map((response) => {
        return AggregatedDataForLineChart(response.json(), dataItemName);
    });
  }

  public getOrgByAssetIdAndType(assetGuid, type, appId) {
    // TODO-CHANGE
    let url = GetOrgByAssetIdAndType + '?appId=' + appId;
    const payload = { assetGuid, type };
    if ( ENVIRONMENT === 'local' ) {
      url = GetOrgByAssetIdAndType;
    }

    return this.setRequestObject(url, payload)
      .map((response) => {
        const responseData = response.json();
        if (responseData && responseData.status === 'success') {
          return responseData.result;
        }
      });
  }

  public getAssetStatusPromiseByIds(id, user, appId, name) {
    // PROD

    let url = AssetStatus + '?appId=' + appId;
    const guids = [id];
    const payload = { guids };

    if ( ENVIRONMENT === 'local' ) {
      url = AssetStatus;
    }
    return this.setRequestObject(url, payload);

  }

  public getAssetStatusByIds(id, user, appId, name) {
    // PROD
    // console.log('id in statusbyId', id);
    let url = AssetStatus + '?appId=' + appId;
    const guids = [id];
    const payload = { guids };
    if ( ENVIRONMENT === 'local' ) {
      url = AssetStatus;
    }
    return this.setRequestObject(url, payload)
      .map((response) => {
        const responseData = response.json();
        if (responseData && responseData.status === 'success') {
          const dataItem = AssetStatusDIParse(responseData.result);
          const dataEvent = AssetStatusEventParser(responseData.result);
          const alertdata = AlertDiParser(dataItem,name);
          return {
            dataItem,
            dataEvent,
            alertdata
          };
        }
      });
  }
  public findHealthAlertById(apiUrl, payload) {
    // LOCAL

    return this.setRequestObject(apiUrl, payload)
      .map((response) => {
        const responseData = response.json();
        if (responseData && responseData.status === 'success') {
          return AssetEventCountParse(responseData.result);
        }
      });
  }

  public findAssetAlertsById(apiUrl, payload) {

    return this.setRequestObject(apiUrl, payload)
      .map((response) => {
        const responseData = response.json();
        if (responseData && responseData.status === 'success') {
          return AssetAlertCountParse(responseData.result);
        }
      // console.log(response.json());
      });
  }

  public getAssetsFromProductClass(apiUrl, payload) {
    return this.getAsset(apiUrl, payload);
  }

  public getAssetsByUser(apiUrl, payload) {
    return this.getAsset(apiUrl, payload);
  }

  public getAsset(apiUrl, payload) {
    return this.setRequestObject(apiUrl, payload)
      .map(response => {
       const responseData = response.json();
       if (responseData && responseData.status === 'success') {
           const assetdetails = responseData.result;
           return assetdetails;
       }
     });
  }

  public getNearDealers(apiUrl, payload) {
    return this.setRequestObject(apiUrl, payload)
      .map(response => {
       const responseData = response.json();
       if (responseData && responseData.status === 'success') {
           const dealers = responseData.result;
           return dealers;
       }
     }).catch(this.handleError);
  }

  public handleError(error: Response) {
   // console.log('error is',error);
    return Observable.throw(error || "server error");
  }
  public getLocation(apiurl) {
    let requestObj = this.http.get(apiurl);
      return requestObj
     .map(response => {
       const responseData = response.json();
           const address = responseData.results;
           //console.log('response from lnglat', address);
            // console.log('response from address', address);
           return address;
     });
  }

  getDistance(apiurl) {
    const headers = new Headers({
      'Access-Control-Allow-Origin': '*'
    });
  //  console.log('apiurl', apiurl);
    const options = new RequestOptions({ headers });
    let requestObj = this.http.get(apiurl,options);
    return requestObj
      .map(response => {
       const distance = response.json();
            // console.log('response from address', distance);
           return distance;
     });
  }
}
