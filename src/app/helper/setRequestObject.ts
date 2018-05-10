import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ENVIRONMENT } from '../constant';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestObjectHelper {

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
}
