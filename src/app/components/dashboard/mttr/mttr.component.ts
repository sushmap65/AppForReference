import { Component, OnInit } from '@angular/core';
import { DashboardDataService, LocalStorageService } from '../../../services';
import { ENVIRONMENT, AppKeys, Mttr } from '../../../constant';
@Component({
  selector: 'mttr',
  providers: [ DashboardDataService ],
  templateUrl: './mttr.component.html',
  styleUrls: ['./mttr.component.css']
})

export class MttrComponent implements OnInit {
	public chartData;
	public yLabel= 'Hrs';
	constructor(
		public dashboardDataService: DashboardDataService,
		public localStorageService: LocalStorageService
	) { }

	public ngOnInit() {
		const userId = this.localStorageService.get('userId');
		const today = new Date();
		const tempDate = new Date(today.getFullYear(), today.getMonth(), 1);
		let toDate = '';
		toDate += parseInt((tempDate.getTime() / 1000).toFixed(0), 10) * 1000;
		let fromDate = '';
		fromDate += parseInt((tempDate.setMonth(tempDate.getMonth() - 6) / 1000).toFixed(0), 10) * 1000;
		const sixMontOldDate = tempDate.setMonth(tempDate.getMonth() - 6);
		let mttrApiUrl = Mttr + '?appId=' + AppKeys.main;

		if ( ENVIRONMENT === 'local' ) {
			mttrApiUrl = Mttr;
		}

		const encodedUrl = encodeURI(mttrApiUrl);
		const payload = {
			prop: 'mttr',
			user: userId,
			from: fromDate,
			to: toDate
		};
		console.log('mttr payload:-', payload);
		this.dashboardDataService
			.getMttrData(encodedUrl, payload)
			.subscribe((data) => {
				this.chartData = data;
	      });
	}
}
