/* tslint:disable no-bitwise "warning" */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ENVIRONMENT, PrivateLogin, AppKeys, LogOutApi } from '../constant';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class AuthenticationService {
    constructor(
        private http: Http,
        private storageService: LocalStorageService,
        private router: Router
        ) { }

    public login(userid: string, simplePassword: string, type: string) {
        // TODO-IMP
        const appid = AppKeys.main;
        const password = Md5.hashStr(simplePassword).toString();
        const urlParams = new URLSearchParams();
        urlParams.append('appid', appid);
        urlParams.append('userid', userid);
        urlParams.append('password', password);

        const headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            });
        const options = new RequestOptions({ headers });
        // TODO-CHANGE
        let  requestObj = this.http.post(PrivateLogin, urlParams, options);
        if (ENVIRONMENT === 'local') {
            requestObj = this.http.get(PrivateLogin, options);
        }

        return requestObj
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let userId = '';
                //let loginError = '';
                const responseData = response.json();
                if (responseData && responseData.status === 'success') {
                    // store user details and jwt token in local storage to
                    // keep user logged in between page refreshes
                    userId = responseData.result.userid;
                    this.storageService.set('userId', userId);
                } else {
                    console.log('');
                }
                return responseData;
            }).catch(this.handleError);
    }

    public handleError(error: Response) {
    console.log('error is',error);
    return Observable.throw(error || "server error");
  }

    public logout() {
        // remove user from local storage to log user out
        // this.storageService.removeItem('currentUser');
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });
        const appid = AppKeys.main;
        const apiUrl = LogOutApi;
        this.http.get(apiUrl, options).map((response: Response) => {
            console.log('response', Response);
            this.router.navigate(['']);
        });
    }
}
