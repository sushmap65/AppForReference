import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {
  ENVIRONMENT,
  FindAsset,
  AssetStatus,
  GetOrgByAssetIdAndType,
  GetHealthAlertByIds
} from '../constant';
import { UtilizationParse, UtilizationBarParser } from '../parser';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilizationDataService {
  public dataString: any;

  constructor(
    private http: Http
  ) { }

  public getUtilizationBarChart(apiUrl, payload) {
    // PROD
    const headers = new Headers({
          'Content-Type': 'application/json'
        });
    const options = new RequestOptions({ headers });
    let requestObj = this.http.post(apiUrl, payload, options);

    if ( ENVIRONMENT === 'local' ) {
      requestObj = this.http.get(apiUrl, options);
    }
    return requestObj
  .map((response) => {
    const responseData = response.json();
    if (responseData && responseData.status === 'success') {
      return UtilizationBarParser(responseData.result);
    }
     console.log(response.json());
  });
  }
}
