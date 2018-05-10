import { Component, OnInit } from '@angular/core';
import { ServiceCostDataService, LocalStorageService } from '../../services';
import { ENVIRONMENT, AppKeys, ServiceCost } from '../../constant';

@Component({
  selector: 'service-cost',
  providers: [ ServiceCostDataService ],
  templateUrl: './serviceCost.component.html',
  styleUrls: ['./serviceCost.component.css']
})

export class ServiceCostComponent implements OnInit {
	public chartData;
	public keys;
	public assetUrl;
	public yLabel = 'inr';

	constructor(
		public serviceCostDataService: ServiceCostDataService,
		public localStorageService: LocalStorageService
	) { }

	public ngOnInit() {
		this.keys = ['Estimated Service Cost', 'Actual Service Cost'];
		const userId = this.localStorageService.get('userId');
		const serialNumber = this.localStorageService.get('currentSerialNumber');
		const currentAssetId = this.localStorageService.get('currentAssetId');
		this.assetUrl = '#asset/' + currentAssetId;
		const today = new Date();
		const tempDate = new Date(today.getFullYear(), today.getMonth(), 1);
		let toDate = '';
		toDate += parseInt(((tempDate.getTime() -1) / 1000).toFixed(0), 10) * 1000;
		const oldDate = new Date(2017, 0, 10);

		// let toDate = '';
		// toDate += parseInt((tempDate.getTime() / 1000).toFixed(0), 10) * 1000;
		let fromDate = '';
		// fromDate += parseInt((tempDate.setMonth(tempDate.getMonth() - 6) / 1000).toFixed(0), 10) * 1000;
		fromDate += parseInt((oldDate.getTime() / 1000).toFixed(0), 10) * 1000;
		let serviceRealizationApi = ServiceCost + '?appId=' + AppKeys.main;

		if ( ENVIRONMENT === 'local' ) {
			serviceRealizationApi = ServiceCost;
		}

		const encodedUrl = encodeURI(serviceRealizationApi);
		const payload = {
			assetId: serialNumber,
			user: userId,
			from: fromDate,
			to: toDate
		};
		console.log('data serviceCostDataService:-', payload);

		this.serviceCostDataService
			.getServiceCostData(encodedUrl, payload)
			.subscribe((data) => {
				this.chartData = data;
				// this.chartData = JSON.parse(dumpData);
	      });
	}
}
