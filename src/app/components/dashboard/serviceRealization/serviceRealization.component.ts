import { Component, OnInit } from '@angular/core';
import { DashboardDataService, LocalStorageService } from '../../../services';
import { ENVIRONMENT, AppKeys, ServiceRealization } from '../../../constant';
@Component({
  selector: 'service-realization',
  providers: [ DashboardDataService ],
  templateUrl: './serviceRealization.component.html',
  styleUrls: ['./serviceRealization.component.css']
})

export class ServiceRealizationComponent implements OnInit {
	public chartData;
	public keys;
	public yLabel= 'count';

	constructor(
		public dashboardDataService: DashboardDataService,
		public localStorageService: LocalStorageService
	) { }

	public ngOnInit() {
		this.keys = ['Service Alerts', 'Actual Services'];
		const userId = this.localStorageService.get('userId');
		const today = new Date();
		const tempDate = new Date(today.getFullYear(), today.getMonth(), 1);
		let toDate = '';
		toDate += parseInt(((tempDate.getTime() - 1) / 1000).toFixed(0), 10) * 1000;
		let fromDate = '';
		fromDate += parseInt((tempDate.setMonth(tempDate.getMonth() - 6) / 1000).toFixed(0), 10) * 1000;
		const sixMontOldDate = tempDate.setMonth(tempDate.getMonth() - 6);
		let serviceRealizationApi = ServiceRealization + '?appId=' + AppKeys.main;

		if ( ENVIRONMENT === 'local' ) {
			serviceRealizationApi = ServiceRealization;
		}

		// const serviceRealizationApi =  ServiceRealization;
		const encodedUrl = encodeURI(serviceRealizationApi);
		const payload = {
			prop: 'realization',
			user: userId,
			from: fromDate,
			to: toDate
		};
		this.dashboardDataService
			.getServiceRealizationData(encodedUrl, payload)
			.subscribe((data) => {
				this.chartData = data;
	      });
	}
}
