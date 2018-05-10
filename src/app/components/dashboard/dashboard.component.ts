import {
  Component,
  OnInit
} from '@angular/core';
import { AssetDataService, LocalStorageService } from '../../services';

@Component({
  selector: 'dash-board',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	public userType;

	constructor(
		private localStorageService: LocalStorageService
	) { }

	public ngOnInit() {
		//window.history.pushState({}, 'Home', '/home');
		// console.log('window history',window.history);
		this.userType = this.localStorageService.get('userType');
	}
}
