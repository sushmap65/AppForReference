import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import {
    AlertService,
    AuthenticationService,
    MissionService,
    AuthGuardService,
    LocalStorageService,
    UserDataService
} from '../../services';

@Component({
    selector: 'login',
    providers: [ UserDataService ],
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    public types: string[] = ['OEM', 'Dealer'];
    public loading = false;
    public loginError = false;
    public loginUserType = 'OEM';
    public backgroundImg;
    public returnUrl: string;
    public model: any = {};
    public history: string[] = [];
    public message: string;
    public userId: string;
    public loginerrorStatus: string;
    @Input() private userType: string;

    constructor(
        private sanitizer: DomSanitizer,
        private missionService: MissionService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private authGuardService: AuthGuardService,
        private localStorageService: LocalStorageService,
        private userDataService: UserDataService,
    ) { }

    public ngOnInit() {
        this.backgroundImg = this.sanitizer.
                             bypassSecurityTrustStyle(`url('ams/assets/img/login6.jpg')`);
        this.loginUserType = this.route.snapshot.params['type'];
        this.localStorageService.set('userType', this.userType);
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }
    public login() {
        console.log('login:--');
        this.loading = true;
        this.authenticationService.login(this.model.userid,
                                         this.model.password,
                                         this.model.userType)
            .subscribe(
                (data: any) => {
                    if( data && data.status === 'success') {
                        this.loginError = false;
                        this.router.navigate([this.returnUrl]);
                        this.userDataService.changeMessage(data.result.userid);
                        this.sendMessage('login-success');
                        this.authGuardService.isLoggedIn = true;
                    } else if(data && data.status === 'error') {
                        this.loginError = true;
                        this.alertService.error(data.error.message);
                        this.loading = false;
                        this.authGuardService.isLoggedIn  = false;
                    } else {
                        ;
                    }
                    
                },
                (error) => {
                    this.loginError = true;
                    this.alertService.error(error);
                    this.loading = false;
                    this.authGuardService.isLoggedIn  = false;
                });
    }

    public sendMessage(message): void {
        // send message to subscribers via observable subject
        this.missionService.sendMessage({text: message});
    }

    public goToPrelogin() {
        this.missionService.sendMessage({text: 'pre-login'});
    }
}
