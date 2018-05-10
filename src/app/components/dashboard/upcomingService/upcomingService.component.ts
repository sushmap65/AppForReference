import { Component, OnInit } from '@angular/core';
import { DashboardDataService, LocalStorageService } from '../../../services';
import { ENVIRONMENT, AppKeys, UpcomingService } from '../../../constant';
@Component({
  selector: 'upcoming-serice',
  providers: [ DashboardDataService ],
  templateUrl: './upcomingService.component.html',
  styleUrls: ['./upcomingService.component.css']
})

export class UpcomingServiceComponent implements OnInit {
	public chartData;
	public yLabel= 'count';

	constructor(
		public dashboardDataService: DashboardDataService,
		public localStorageService: LocalStorageService
	) { }

	public ngOnInit() {
		const userId = this.localStorageService.get('userId');
		const tempDate = new Date();
		let fromDate = '';
		tempDate.setMonth(tempDate.getMonth() + 1);
		fromDate += parseInt((tempDate.getTime() / 1000).toFixed(0), 10) * 1000;
		let toDate = '';
		toDate += parseInt((tempDate.setMonth(tempDate.getMonth() + 6) / 1000).toFixed(0), 10) * 1000;
		const sixMontOldDate = tempDate.setMonth(tempDate.getMonth() + 6);
		let upcomingServiceApi = UpcomingService + '?appId=' + AppKeys.main;
		console.log('upcoming services fromDate:-', fromDate, 'upcoming services toDate:-', toDate);
		if ( ENVIRONMENT === 'local' ) {
			upcomingServiceApi = UpcomingService;
		}

		// const upcomingServiceApi =  UpcomingService;
		const encodedUrl = encodeURI(upcomingServiceApi);
		const payload = {
			prop: 'upcomingServices',
			user: userId,
			from: fromDate,
			to: toDate
		};
		this.dashboardDataService
			.getUpcomingServiceData(encodedUrl, payload)
			.subscribe((data) => {
				this.chartData = data;
	      });
	}
}
