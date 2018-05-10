import { Injectable } from '@angular/core';
import { ServiceCostParser } from '../parser';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ENVIRONMENT } from '../constant';
import 'rxjs/add/operator/map';

@Injectable()
export class ServiceCostDataService {
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
  public getServiceCostData(apiUrl, payload) {
    const requestObj = this.setRequestObject(apiUrl, payload);
    return requestObj
  .map((response) => {
    const responseData = response.json();
    if (responseData && responseData.status === 'success') {
      return ServiceCostParser(responseData.result);
      // return ServiceCostParser(objData.result);
    }
    // console.log(response.json());
  });
  }
}
