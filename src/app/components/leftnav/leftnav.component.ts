import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import {
  MissionService,
  LocalStorageService,
  AuthenticationService
} from '../../services';

@Component({
  selector: 'left-nav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})

export class LeftnavComponent {
	@Input() public navStatus: string;
	public subscription: Subscription;

  constructor(
    private missionService: MissionService,
    private storageService: LocalStorageService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public logout() {
    this.storageService.delete('userId');
    this.storageService.delete('userType');
    this.missionService.sendMessage({text: 'pre-login'});
      // var cookie_date = new Date ( );  // current date & time
      // cookie_date.setTime ( cookie_date.getTime() - 1 );
      // var cookie_name = "vertx-web.session"
      // document.cookie = cookie_name += "=; expires=" + cookie_date.toUTCString();
    // window.location = "https://ams.lgamn.com/logout";
    // this.authenticationService.logout();
    //return true;
  }
}
