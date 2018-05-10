import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from '../../services';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'ng-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
	public subscription: Subscription;
	public isMobileNavVisible = false;
	public mobileNaveClass = 'mobile-left-nav-hide';
	public userName;
	public userImage = 'assets/img/user.png';
	public users = {
	    'mfguseroem' : 'Devendra Negi',
	    'shivam.kumardelear' : 'Rishi Sharma'
	};

  @Input() public message: string;

	constructor(
		private localStorageService: LocalStorageService,
		private router:Router
	) {}

	public ngOnInit() {
		// console.log('Initial app id', this.localStorageService.get('userId'));
		const userId = this.localStorageService.get('userId').split('@')[0];
		if(this.users[userId]) {
			this.userName = this.users[userId];
			this.userImage = 'assets/img/' + userId + '.png';
		} else {
			this.userName = userId;
		}
	}

	public showMobileNav(event) {
		this.isMobileNavVisible = !this.isMobileNavVisible;
		event.stopPropagation();
		// if(this.isMobileNavVisible) {
		// 	this.mobileNaveClass = 'mobile-left-nav-show';
		// }
		console.log('nav:-', this.isMobileNavVisible);
	}
	
}
