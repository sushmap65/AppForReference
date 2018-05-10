import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { ENVIRONMENT, GetScriptConfigInfo, ruleConfigUpdate } from '../constant';
import {
    DIReportsParser,
    EventReportsParser,
    InsightReportsParser
} from '../parser';

@Injectable()
export class ReportsDataService {
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

    public getAssetReports(apiUrl, payload, assetMap) {
        // console.log('api url:-', apiUrl, payload);
        return this.setRequestObject(apiUrl, payload)
            .map((response) => {
                // console.log('print Reports', response);
                return DIReportsParser(response.json(), assetMap);
            });
    }

    public getEventReports(apiUrl, payload, assetMap) {
        return this.setRequestObject(apiUrl, payload)
            .map((response) => {
                // console.log('print Reports', response);
                return EventReportsParser(response.json(), assetMap);
            });
    }

    public getReports(apiUrl, payload) {
        // console.log('get Report :-', payload);
        return this.setRequestObject(apiUrl, payload)
            .map((response) => {
                // return InsightReportsParser(response.json());
                return response;
            });
    }

    public getReportInsight(apiUrl, payload) {
        console.log(apiUrl);
        const headers = new Headers({
            'Content-Type': 'application/json',
        });
       // headers.append('apikey','A171FEF8AF2A49C093DAA979A32BA53464');
       // headers.append('x-lg-principal-id','b2VtYW13QGdtYWlsLmNvbQ==');
        const options = new RequestOptions({ headers });
        console.log(options);
        /*'apikey':'A171FEF8AF2A49C093DAA979A32BA53464',
            'x-lg-principal-id':'b2VtYW13QGdtYWlsLmNvbQ==',
            'Access-Control-Allow-Origin': '*'*/
        return this.http.post(apiUrl, payload, options)
            .map((response) => {
                // return InsightReportsParser(response.json());
                return response;
            });
    }

}
