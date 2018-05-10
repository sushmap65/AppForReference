import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { CsvService } from 'angular2-json2csv';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';
import * as moment from 'moment';
import { forkJoin } from 'rxjs/observable/forkJoin';

import {
	ReportsDataService,
	LocalStorageService
} from '../../services';

import {
	InsightReportsParser1,
	InsightReportsParser,
	HaltReportsParser,
	StopReportsParser,
	UtilizationReportsParser,
	TotalODOParser
} from '../../parser';

import {
	AppKeys,
	GetAssetDIDetails,
	AllEventsReports,
	InsightReport,
	UtilizationReport,
	TotalODO,
	ENVIRONMENT,
	insightsAlerts
} from '../../constant';

@Component({
  selector: 'reports',
  providers: [ ReportsDataService ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {
	public assetList;
	public reportItemList;
	public isAssetSeached: boolean = false;
	public loading: boolean = false;
	public allAssetsGuid = [];
	public assetsGuid = [];
	public assetMap = {};
	public reportsDataSet = [];
	public uiErrorStartDate;
	public uiErrorEndDate;
	public startDate;
	public endDate;
	public reportListType;
	public isVINchecked: boolean = false;
	public dummyrow:any = {
		assetName: 'no data',
        time: 'no data',
        OverSpeed: 0,
        LowInternalbattery: 0,
        DeviceRemovalFromVehicle: 0,
        LowVehicleBattery: 0,
        HighCoolantTemperature: 0,
        LowOilPressure: 0,
        DeviceConnectedToVehicle: 0,
        guid: 'no data'
    };

	public myDatePickerOptions: IMyOptions = {
		dateFormat: 'dd-mm-yyyy',
		showTodayBtn: true
	};

	constructor(
	    private reportsDataService: ReportsDataService,
	    private localStorageService: LocalStorageService,
	    private csvService: CsvService,
	    private el: ElementRef,
	    public toastr: ToastsManager,
        public vcr: ViewContainerRef
	) {
		this.toastr.setRootViewContainerRef(vcr);
		this.reportListType = [{
			name: 'Historical data',
			type: 'di'
		}, {
			name: 'System Event',
			type: 'event'

		}, {
			name: 'Insight',
			type: 'insight'
		}]
	 }

	public ngOnInit() {
		const haltEventName = 'Total Halt (in minutes)';
		const stopEventName = 'Total Stop (in minutes)';
		const utilizationEventName = 'Total Utilization (in minutes)';
		const odoClosing = 'ODO Closing';
		const periodOdo = 'Period ODO';

		const allAssetList = this.localStorageService.get('allAssetsList');
		_.forEach(allAssetList, (o) => {
			this.assetMap[o.guid] = o.name;
			this.allAssetsGuid.push(o.guid);
		});

		this.dummyrow[haltEventName] = 0;
		this.dummyrow[stopEventName] = 0;
		this.dummyrow[utilizationEventName] = 0;
		this.dummyrow[odoClosing] = 0;
		this.dummyrow[periodOdo] = 0;
	}
	public onDateChanged(event: IMyDateModel, dateType: string) {
		if (dateType === 'startDate') {
			if (event.jsdate === null) {
				this.uiErrorStartDate = true;
			}
			this.startDate = moment.utc(event.formatted, 'DD-MM-YYYY').unix() * 1000;
			this.uiErrorStartDate = false;
		}

		if (dateType === 'endDate') {
			if (event.jsdate === null) {
				this.uiErrorEndDate = true;
			}
			this.endDate = (moment.utc(event.formatted, 'DD-MM-YYYY').add('days', 1).unix() - 1) * 1000;
			this.uiErrorEndDate = false;
		}
	}

	public searchAssets(vin) {
		this.assetsGuid = [];
		this.isAssetSeached = true;
		const searchBox = this.el.nativeElement.querySelector('#vin-parent');
		const allAssetList = this.localStorageService.get('allAssetsList');
	    const asset: any = _.find(allAssetList, (o) => {
	    		return o.serialNumber === vin;
	    	});
	    if ( asset ) {
	    	const title = `Message : `;
	    	const error = 'VIN number found';
			const errorMessage = `<span style="color: green"> ${error}</span>`;
			this.toastr.error(errorMessage, title, {enableHTML: true});
			searchBox.style.border = '2px solid green';
	    	this.assetsGuid.push(asset.guid);
	    } else {
	    	// show message if asset not found
	    	const title = `Error : `;
	    	const error = 'VIN number not found';
			const errorMessage = `<span style="color: red"> ${error}</span>`;
			this.toastr.error(errorMessage, title, {enableHTML: true});
			searchBox.style.border = '2px solid red';
	    	this.assetsGuid = [];
	    }
	}

	public downloadReports() {
		if( !this.validation() ) {
			return;
		} else {
			this.loading = true;
		    _.forEach(this.reportListType, (report) => {
		    	if(report.checked) {
		    		this.getReportByType(report.type);
		    	}
		    })
		}
		this.isAssetSeached = false;
	}
	public validation() {
		const title = `Error : `;
		let error = '';
		let errorMessage = '';
		const isReportSelected = this.reportListType.find((o) => o.checked === true  );
		if ( !this.startDate && !this.endDate ) {
			error = 'Please select start and end date';
			errorMessage = `<span style="color: red"> ${error}</span>`;
			this.toastr.error(errorMessage, title, {enableHTML: true});
			return false;
		} else if (this.isAssetSeached && !this.assetsGuid.length) {
			error = 'Please provide valid VIN';
			errorMessage = `<span style="color: red"> ${error}</span>`;
			this.toastr.error(errorMessage, title, {enableHTML: true});
			return false;
		} else if (!isReportSelected) {
			error = 'Please select a report type';
			errorMessage = `<span style="color: red"> ${error}</span>`;
			this.toastr.error(errorMessage, title, {enableHTML: true});
			return false;
		} else {
			return true;
		}
	}

	public getReportByType(type) {
		// clear  all select items
		this.el.nativeElement.querySelector('#vin-parent').style.border = '2px solid white';
		this.el.nativeElement.querySelector('#searchByVin').value = '';
		this.isVINchecked = false;
		this.reportListType.forEach((o) => o.checked = false );
		let insightReport = [];
		const filters = [{
                'time': [
                    { 'gte': this.startDate },
                    { 'lte': this.endDate },
                    { 'op': '&' }
              	]
            }];

		if ( !this.isAssetSeached ) {
			//console.log('asset searched', this.isAssetSeached);
	    	this.assetsGuid = this.allAssetsGuid;
	    } else {
	    	;
	    }

		let payload = {
			guids: this.assetsGuid
		}
		let models ={
			guid: "0_d40ecd40-e676-4a67-a42d-baf12f16893b",
			assets : this.assetsGuid,
			dis : insightsAlerts
		}
		/*let models ={
			guids : this.assetsGuid,
			dis : insightsAlerts
		}*/
		let InsightPayload = {
			models: [models]
		}
		/*let InsightPayload = {
			guids : this.assetsGuid,
			dis : insightsAlerts
		}*/

		if (type !== 'insight')  {
			const ids = _.values(this.localStorageService.get('assetdilist')) || [];
			payload['ids'] = ids;
		}

		if(type === 'event') {
			delete payload['ids'];
		}

		if( this.startDate && this.endDate) {
			payload['filters'] = filters;
			InsightPayload['filters'] = filters;
		}

		if(type === 'di') {
			console.log('payload is:---', payload);
			let apiUrl = GetAssetDIDetails + '?appId=' + AppKeys.assetDashBoard;
		    if (ENVIRONMENT === 'local') {
		    	apiUrl = GetAssetDIDetails;
		    }
		    const assetMap = this.assetMap;
		    //console.log('payload is:---', payload);
			this.reportsDataService
				.getAssetReports(apiUrl, payload, assetMap)
				.subscribe((data: any) => {
						this.loading = false;
						this.csvService.download(data, 'DataItemsReport');
				});

		} else if(type === 'event') {
			let apiUrl = AllEventsReports + '?appId=' + AppKeys.assetDashBoard;
			if (ENVIRONMENT === 'local') {
		    	apiUrl = AllEventsReports;
		    }
		    const assetMap = this.assetMap;
		    this.reportsDataService
				.getEventReports(apiUrl, payload, assetMap)
				.subscribe((data: any) => {
					this.loading = false;
					this.csvService.download(data, 'Event');
				});

		} else if(type === 'insight') {
			console.log('payload insight', InsightPayload);
			const assetMap = this.assetMap;
		    const promiseObj = {};
		    //need changes in future
		    /*let commonInsightApi = InsightReport;*/
			let commonInsightApi = InsightReport
				+ '?appId=' + AppKeys.assetDashBoard;
			if (ENVIRONMENT === 'local') {
		    	commonInsightApi = InsightReport;
		    }

			let reportApi = UtilizationReport
				+ '?appId=' + AppKeys.assetDashBoard
				+ '&function=COUNT';
			if (ENVIRONMENT === 'local') {
		    	reportApi = UtilizationReport;
		    }
		    const haltOp = { 'op': 'haltreport' };
		    const get = {'gte': this.startDate};
		    const lte = {'lte': this.endDate};
		    const timeHalt = [ get, lte, haltOp];
		    //const ids = _.values(this.localStorageService.get('assetdilist')) || [];
			//payload['ids'] = ids;
			const ids = ['0_515c85f0-71b8-4293-89ec-9fb422d60c8e','0_4f855d1e-c16a-4997-b62b-b6b5dcacca13'];

		    const haltreportPayload = {
				guids: this.assetsGuid,
				ids: ids,
				filters : [{
	                time: timeHalt
	            }]
			}

		    const stopOp = {'op': 'stopreport' };
		    const timeStop = [ get, lte, stopOp];

		    const stopreportPayload = {
				guids: this.assetsGuid,
				ids: ids,
				filters : [{
	                time: timeStop
	            }]
			}

			const utilizationOp = {'op': 'utilization' };
		    const timeUtilization = [ get, lte, utilizationOp];

		    const utilizationPayload = {
				guids: this.assetsGuid,
				ids: ids,
				filters : [{
	                time: timeUtilization
	            }]
			}

			let apiTotalODOUrl = TotalODO + '?appId=' + AppKeys.assetDashBoard;
		    if (ENVIRONMENT === 'local') {
		    	apiTotalODOUrl = TotalODO;
		    }
			const timeODO = [ get, lte, {'op': '&'}];
			const totalODOPayload = {
					guids: this.assetsGuid,
					ids: ['0_ee675d16-bd00-459d-8893-9a3929bfc787'],
					filters : [{
			            time: timeODO
			        }]
				}

			const combined = forkJoin(
				this.reportsDataService.getReports(commonInsightApi, InsightPayload),
				this.reportsDataService.getReports(reportApi, haltreportPayload),
				this.reportsDataService.getReports(reportApi, stopreportPayload),
				this.reportsDataService.getReports(reportApi, utilizationPayload),
				this.reportsDataService.getReports(apiTotalODOUrl, totalODOPayload)
				);
			combined.subscribe(latestValues => {
			    const [ commonInsightData , haltData, stopData, reportData, odoData ] = latestValues;
			    console.log('common insight data response', commonInsightData);
			    const report = this.generateInsigthreport(commonInsightData, 'commonInsight');
			    const insightRepotValue: any = this.__mapToAssetName(report);
				insightReport.push(...insightRepotValue);

				const haltReport = this.generateInsigthreport(haltData, 'haltreport');
				insightReport = this.__mergeReports(insightReport, haltReport);

				const stopReport = this.generateInsigthreport(stopData, 'stopreport');
				insightReport = this.__mergeReports(insightReport, stopReport);

				const utilizationReport = this.generateInsigthreport(reportData, 'utilization');
				insightReport = this.__mergeReports(insightReport, utilizationReport);

				const totalODOReport = this.generateInsigthreport(odoData, 'odoData');

				_.forEach(totalODOReport, (o) => {
					insightReport = this.__mergeReports(insightReport, o);
				});

				if (!_.isEmpty(insightReport)) {
					this.loading = false;
					this.csvService.download(insightReport, 'InsightReport');
				}
			});
		}
	}

	public generateInsigthreport(data, key) {
		if (key === 'commonInsight' ) {
			return InsightReportsParser1(data.json());
		} else if( key === 'haltreport' ) {
			return HaltReportsParser(data.json());
		} else if( key === 'stopreport' ) {
			return StopReportsParser(data.json());
		} else if (key === 'utilization' ) {
			return UtilizationReportsParser(data.json());
		} else if (key === 'odoData' ) {
			return TotalODOParser(data.json());
		}
	}

	private __mapToAssetName(assetData) {
		console.log('map to assetname',assetData);
		const assetMap = this.assetMap;
		const result = [];
		_.forEach(assetData, (data) => {
			const assetName = assetMap[data.key];
			_.forEach(data.value, (row: any) => {
				row['assetName'] = assetName;
				row['guid'] = data.key;
				result.push(row);
			});
		})
		//console.log('result from map',result);
		return result;
	}

	private __mergeReports(report, reportData) {
		const assetMap = this.assetMap;
		// console.log(report, reportData);
		_.forEach(reportData, (o, key) => {
			const keyArray = key.split('__');
			const eventGuid = keyArray[0];
			const eventTime = keyArray[1];
			const matchedRow = _.find(report, (row: any) => {
				return (row.guid === eventGuid && row.time === eventTime);
			});
			if( matchedRow ) {
				matchedRow[o.name] = o.value;
			} else {
				const tempRow = _.assign({}, this.dummyrow);
				tempRow['assetName']  = assetMap[eventGuid];
				tempRow['guid'] = eventGuid;
				tempRow['time'] = eventTime;
				tempRow[o.name] = o.value;
				// console.log('temp Row :-', tempRow);
				report.push(tempRow);
			}
		});

		console.log('reportData new', report);
		return report;
	}
}