import { Component, OnInit } from '@angular/core';
import { DashboardDataService } from '../../../services';
import { ENVIRONMENT, AppKeys, AllEvents } from '../../../constant';
@Component({
  selector: 'systemAlerts-board',
  providers: [ DashboardDataService ],
  templateUrl: './systemAlerts.component.html',
  styleUrls: ['./systemAlerts.component.css']
})

export class SystemAlertsComponent implements OnInit  {
	public alertData: any;
	public yLabel= 'count';

	constructor(
		public dashboardDataService: DashboardDataService
	) { }

	public ngOnInit() {
		let eventCountApi = AllEvents + '?appId=' + AppKeys.assetDashBoard;

		if ( ENVIRONMENT === 'local') {
			eventCountApi = AllEvents;
		}

		const payload = {
			filters : [ {
				groupBy: 'category',
				category: [100, 101, 102, 103],
				status: true
				}]
	    };
		this.dashboardDataService
			.getAllEvents(eventCountApi, payload)
			.subscribe((data) => {
		        this.alertData = data;
	      });
		// const dataStr = `[["Index 0",12],["Index 1",16]`;
	}
}
