import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { ENVIRONMENT, GetScriptConfigInfo, ruleConfigUpdate } from '../constant';

@Injectable()
export class RulesDataService {
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

    public getServiceInfo(apiUrl) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });
        const requestObj = this.http.get(apiUrl, options);

        return requestObj
            .map((response) => {
                return response.json();
            });
    }

    public getScriptDetailsById(apiurl, payload) {
        return this.setRequestObject(apiurl, payload);
    }

    public postUpdateScriptDetails(apiUrl, data) {
        return this.setRequestObject(apiUrl, data)
            .map((response) => {
              console.log("response..." + JSON.stringify(response));
              return response.json();
            });
    }
}
