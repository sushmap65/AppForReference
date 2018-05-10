import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import * as _ from 'lodash';
import { UtilizationDataService, LocalStorageService, RulesDataService } from '../../services';
import { ENVIRONMENT, 
          AppKeys, 
          GetUtilizationBarChart, 
          GetUtilizationBarChart1,
          GetUtilizationByAssetId ,
          GetServiceInfo,
          ruleConfigUpdate,
          GetScriptConfigInfo,
          rulesCategories } from '../../constant';
import { dataHelper } from '../../data';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
    toCamelCase,
    CamelCaseToNormalString
  } from '../../helper';
@Component({
  selector: 'utilization-comp',
  providers: [ UtilizationDataService , RulesDataService],
  templateUrl: './utilization.component.html',
  styleUrls: ['./utilization.component.css']
})

export class UtilizationComponent implements OnInit  {
    public chartData: any;
    public userType;
    public assetUrl;
    public yLabel= 'hours/day';
    public uiErrorStartDate = false;
    public uiErrorEndDate = false;
    public startDate;
    public endDate;
    public assetName;
    public assetSerialNo;
    public disableSubmit = true;
    public checkDate;
    public startInput;
    public endInput;
    public loading;
    public appIdAssetDashBoard = AppKeys.assetDashBoard;
    public ServiceGuid = '';
    public myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd-mm-yyyy',
        showTodayBtn: true
    };
    public serviceDue;
    public serviceDueDate;
    public ConfigResponse;
    constructor(
        private utilizationDataService: UtilizationDataService,
        private localStorageService: LocalStorageService,
        private rulesDataService: RulesDataService,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,
    ) { this.toastr.setRootViewContainerRef(vcr);}

    public ngOnInit() {
        this.loading = true;
        this.assetName = this.localStorageService.get('currentAssetLocation').name;
        console.log("Asset Name---------------------",this.assetName);
        this.assetSerialNo = this.localStorageService.get('currentSerialNumber');
         console.log("Asset Serial  Name---------------------",this.assetSerialNo);

        this.serviceDue = this.localStorageService.get('utilizationAlert');
        _.forEach(this.serviceDue,(o)=>{
          if(o.name === 'Next_Service_Date'){
            this.serviceDueDate = o.value;
          }
        })
        // initial dates for api payload
        this.startDate = (moment.utc().startOf('day').subtract(6,'days').unix()) * 1000;
        this.endDate = (moment.utc().endOf('day').unix()) * 1000;
        this.checkDate = (moment.utc().startOf('day').add(1,'days').unix()) * 1000;
        console.log('start end check',this.startDate,this.endDate,this.checkDate);
        this.userType = this.localStorageService.get('userType');
        // set default initial dates for input fields
        const startField = moment().subtract(6, 'days');
        this.endInput= { date: { year: moment().year(), month: moment().month()+1, day: moment().date() } };
        this.startInput= { date: { year:  startField.year(),
                                 month: startField.month()+1, 
                                 day:  startField.date() } };
        // console.log('foormat date', moment(this.startDate).format('DD-MM-YYYY').split('-')[0]);
        const appId = AppKeys.assetDashBoard;
        let apiUrl = GetUtilizationBarChart + '?appId=' + appId;
        const ids  = ["0_515c85f0-71b8-4293-89ec-9fb422d60c8e",
                      "0_4f855d1e-c16a-4997-b62b-b6b5dcacca13"]

        if ( ENVIRONMENT === 'local' ) {
            apiUrl = GetUtilizationBarChart;
        }
        const currentAssetId = this.localStorageService.get('currentAssetId');
        this.assetUrl = '#asset/' + currentAssetId;
        const guids = [currentAssetId];
        const payload = { guids, ids, "filters": [
            {
                "time": [
                    { "gte": this.startDate },
                    {"lte": this.endDate },
                {
                  "op": "utilization"
                }
              ]
            }
        ]};
            this.utilizationDataService
            .getUtilizationBarChart(apiUrl, payload)
            .subscribe((data) => {
               this.loading = false;
              this.chartData = data;
              console.log("bar chart-----",this.chartData);
            });

            // init for service due 
        let serviceUrl = GetServiceInfo + '?appId=' + appId;
            this.rulesDataService
            .getServiceInfo(serviceUrl)
            .subscribe((data) => {
                if (data && data.status === 'success' && data.result ) {
                    const availableServicesList = {};
                    _.forEach(data.result.availableServices, (o) => {
                        availableServicesList[o.name] = [];
                    });
                    const subscribedObj = data.result.subscribedServices;
                    _.forEach(subscribedObj, (o) => {
                        const name = o.name.split('_')[0];
                        if (availableServicesList[name]) {
                          availableServicesList[name].push(o);
                        } else {
                          availableServicesList[name] = [o];
                        }
                    });
                    console.log('subscribed object',subscribedObj);
                    this.updateServiceList(availableServicesList);
                    
                }
            });

    }
    public updateServiceList(list: any){
      let apirUrl = GetScriptConfigInfo +'?appId=' + this.appIdAssetDashBoard;

      if(ENVIRONMENT === 'local') {
        apirUrl = GetScriptConfigInfo;
      }
      _.forEach(list, (value, key) => {
          const serviceListPromise = [];
          if (value) {
              _.forEach(value, (o) => {
                  // this.allServicesObj[o.name] = o.guid;
                  o.rulePromise = this.rulesDataService.getScriptDetailsById(apirUrl, {guid: o.guid} );
              });
          }
      });
      _.forEach(list, (value, key) => {
          if (value) {
              _.forEach(value, (o) => {
                  if (o.rulePromise) {
                      o.rulePromise.subscribe( (data: any) => {
                              const ruelsData = data.json();
                              console.log('json from rules',ruelsData);
                              if(ruelsData.status === 'success' && ruelsData.result && ruelsData.result.config.length > 0) {
                                const config = ruelsData.result.config;
                                const tempResult = ruelsData.result.asset;
                                const tempGuid = [];
                                const currentAssetId = this.localStorageService.get('currentAssetId');
                                console.log('currentAssetId', currentAssetId);
                                o.result = config;
                                o.isVisible = false;
                                o.type = rulesCategories[key];
                                console.log('rulesCategories[key]', o.type, key);
                                _.forEach(tempResult,(data)=>{
                                    tempGuid.push(data.guid);
                                  });
                                if(o.type === 'serviceDue'){
                                    if(tempGuid.indexOf(currentAssetId) === -1){
                                      value.splice(value.indexOf(o),1);
                                    }
                                    else if(o.type === 'serviceDue'){
                                      console.log('inside service due info',o);
                                      console.log('value from list',value);
                                      this.localStorageService.set('serviceDueInfo',o)
                                      this.getScriptDetails(o);
                                    }
                            }
                              }
                      });
                  }
              });
          }
      });

    }

    // for service due;   
    // const serviceDueData = this.localStorageService.get('serviceDueInfo');
    // console.log('service due info', serviceDueData);
    // this.getScriptDetails(serviceDueData);
      public getScriptDetails(ServiceInfo){
        this.ServiceGuid = ServiceInfo.guid;
            this.ConfigResponse = ServiceInfo.result;
            _.forEach(this.ConfigResponse,(o)=>{
              if(o.name.toLowerCase() === 'lastservicedone'){
                o.value = ((moment().unix())*1000).toString(); // pass the date when service due is complete// GMT time
                console.log('todays date',o.value);
              }
              delete o.name; // can be a problem later
             })
            console.log('config response service',this.ConfigResponse);

      }

     public onDateChanged(event: IMyDateModel, dateType: string) {
    console.log("event.." + JSON.stringify(event));
    console.log('jsdate value', event.jsdate);
    if (dateType === 'startDate') {
      if (event.jsdate === null) {
        this.uiErrorStartDate = true;
      }
      this.startDate = moment.utc(event.formatted, 'DD-MM-YYYY').unix() * 1000;
      // to check for 7 days date range
      this.checkDate = (moment.utc(event.formatted, 'DD-MM-YYYY').add(7,'days').unix() - 1) * 1000;
      this.endDate = this.checkDate;
      if(this.startDate){
      const endField =  moment.utc(event.formatted, 'DD-MM-YYYY').add(7, 'days').subtract(1,'s');
      this.endInput = { date: { year:  endField.year(),
                                 month: endField.month()+1, 
                                 day:  endField.date() } };
      console.log('this end input',this.endInput , (endField.unix()*1000));
    }
      this.uiErrorStartDate = false;
    }
    if (dateType === 'endDate') {
      if (event.jsdate === null) {
        this.uiErrorEndDate = true;
      }
      this.endDate = (moment.utc(event.formatted, 'DD-MM-YYYY').add(1,'days').unix() - 1) * 1000;
      this.uiErrorEndDate = false;
    }
    this.localStorageService.set('endDate', this.endDate);
    this.localStorageService.set('startDate', this.startDate);
  }

  public getUtilizationData() {
    if(!this.startDate || !this.endDate) {
      this.toastr.info('Please enter the Start and End dates');
    } else if(this.startDate > this.endDate ) {
      this.toastr.info('Start date cannot be greater than end date');
    } else if (this.checkDate < this.endDate) {
      this.toastr.info('Date range should be within 7 days');
    }
    else {
    this.userType = this.localStorageService.get('userType');
    const appId = AppKeys.assetDashBoard;
    let apiUrl = GetUtilizationBarChart + '?appId=' + appId;
    if ( ENVIRONMENT === 'local' ) {
        apiUrl = GetUtilizationBarChart1;
    }
    const currentAssetId = this.localStorageService.get('currentAssetId');
    this.assetUrl = '#asset/' + currentAssetId;
    const guids = [currentAssetId];
    const ids  = ["0_515c85f0-71b8-4293-89ec-9fb422d60c8e","0_4f855d1e-c16a-4997-b62b-b6b5dcacca13"]
    const payload = { guids, ids,
        "filters": [
            {
                "time": [
                    { "gte": this.startDate },
                    {"lte": this.endDate },
                {
                  "op": "utilization"
                }
              ]
            }
        ]
    };
    console.log('payload from dates',payload);
    this.utilizationDataService
        .getUtilizationBarChart(apiUrl, payload)
        .subscribe((data) => {
          console.log('utilization:-', data);
          this.chartData = data;
        });
    }

  }
  public ServiceCompleted() {
        const baseUrl = ruleConfigUpdate + '?appId=' + AppKeys.assetDashBoard;
        const currentAssetId = this.localStorageService.get('currentAssetId');
        const payload = {
          'scriptGuid':this.ServiceGuid,
          'config':this.ConfigResponse,
          'appliesList':[{
            'label':'asset',
            'guid':currentAssetId
          }]
        }
        console.log('payload from service due completed',payload);
        this.rulesDataService
        .postUpdateScriptDetails(baseUrl, payload)
        .subscribe((data) => {
           this.toastr.info('Service Completed');
          console.log('postUpdateScriptDetails:-', data);
        });
  }
}
