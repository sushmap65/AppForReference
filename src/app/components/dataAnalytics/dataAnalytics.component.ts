import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { UtilizationDataService, 
         LocalStorageService, 
         AssetDataService 
} from '../../services';
import { ENVIRONMENT, 
         AppKeys, 
         GetUtilizationByAssetId,
         GetAggregatedData
} from '../../constant';
import { dataHelper } from '../../data';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import {
  toCamelCase,
  CamelCaseToNormalString
} from '../../helper';
@Component({
  selector: 'utilization-comp',
  providers: [ AssetDataService, LocalStorageService ],
  templateUrl: './dataAnalytics.component.html',
  styleUrls: ['./dataAnalytics.component.css']
})

export class DataAnalyticsComponent implements OnInit  {
    public userType;
    public elementRef: ElementRef;
    public assetUrl;
    public activeItems;
    public graph;
    public dataItems = [];
    public currentAssetId;
    public lineChartData;
    public data;
    public selectedDataFormat;
    public aggregatedData;
    public uiErrorStartDate;
    public uiErrorEndDate;
    public startDate;
    public endDate;
    public functionNames;
    public resolutionsName;
    public uiErrorFunction;
    public uiErrorResolution;
    public showFirstChart;
    public selectedItemId;
    public selectedItemName;
    public latestSelectedItemId;
    public modalDisplay = false;
    public loading = false;

    public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd-mm-yyyy',
    showTodayBtn: true
  };

    public functions = [
    { code: 'Select', name: 'Select' },
    { code: 'COUNT', name: 'Count' },
    { code: 'MAX', name: 'Max' },
    { code: 'MIN', name: 'Min' }
  ];

  public resolutions = [
    { code: 'Select', name: 'Select' },
    { code: '10m', name: '10 Min' },
    { code: '1h', name: '1 Hour' },
    { code: '1d', name: '1 Day' },
    { code: '1w', name: '1 Week' }
  ];

  public page = {
    childrens: [
    ]
  };

  public selectedFunction = 'Select';
  public selectedresolutions = 'Select';
    constructor(
        private localStorageService: LocalStorageService,
        private el: ElementRef,
        public assetDataService: AssetDataService
    ) { }

    public ngOnInit() {
        this.loading = true;
        this.userType = this.localStorageService.get('userType');
        const appId = AppKeys.assetDashBoard;
        const userId = this.localStorageService.get('userId'); 
        this.currentAssetId = this.localStorageService.get('currentAssetId');
        this.assetUrl = '#asset/' + this.currentAssetId;
        const guids = [this.currentAssetId];
        const dashBoardAppId = AppKeys.assetDashBoard;
          this.assetDataService
          .getAssetStatusById(this.currentAssetId, userId, dashBoardAppId)
          .subscribe((data) => {
              this.loading = false;
              this.dataItems = [];
              if ( data ) {
                  if ( data.dataItem && data.dataEvent.typeDiArray ) {
                      _.forEach(data.dataItem, (o) => {
                          _.forEach(data.dataEvent.typeDiArray, (i) => {
                              if(o.name === i.name) {
                                  this.activeItems = {
                                                      name: CamelCaseToNormalString(o.name),
                                                      itemName: o.name,
                                                      time: o.time,
                                                      val: o.val,
                                                      guid: i.guid,
                                                      type: i.type,
                                                      checked: false,
                                                      valueType: typeof o.val

                                                     };                  
                              }
                              
                          });
                          this.dataItems.push(this.activeItems);
                      });   
                  } else {
                    this.loading = false;
                  }
                 // console.log('dataitems in dataa', this.dataItems);
              }
          });
          this.uiErrorStartDate = false;
          this.uiErrorEndDate = false;
          this.aggregatedData = false;           
    }

   public updateFunctions(functionName: string) {
    if (functionName !== 'Select') {
      this.uiErrorFunction = false;
      this.functionNames = functionName;
    }
  }
  public closeModal() {
   // console.log('close it');
    this.modalDisplay = true;
    //this.modalDisplay = false;
  }

   public drawChartForDataItem(isChecked: Boolean, itemName: string, itemGuid: string) {
     //console.log('chart data', isChecked,itemName);
      this.latestSelectedItemId = itemGuid;
      this.localStorageService.set('endDate', this.endDate);
      if(isChecked) {
        this.uiErrorStartDate = false;
        this.uiErrorEndDate = false;
        this.showFirstChart = true;

        if(this.page.childrens.length < 4) {
          this.localStorageService.set('dataItemSelected', itemName);
          this.localStorageService.set('itemName', itemName);
          this.selectedItemId = itemGuid;

          if(!this.aggregatedData) {
            this.drawChart(itemGuid, itemName, 'raw', null);

          } else if(this.aggregatedData) {
              if(this.validateAggregate()) {
               // console.log('validate is invoked');
                this.drawChart(itemGuid, itemName, 'aggregated', null);
              } else {
                 _.forEach(this.dataItems, (o) => {
                    if (o.guid === itemGuid) {
                      o.checked = false;
                    }
                });
              }
          } 
        }
       } else {
        this.removeChartById(itemGuid);
      }     
    }

    public onSelectionChange(selectedDataFormat: string) {
      //console.log('data format',selectedDataFormat);
      this.selectedDataFormat = selectedDataFormat;
      let chartDataType;
      if (this.selectedDataFormat === 'aggregated') {
        this.aggregatedData = true;
      } else {
        this.resetAggregateFunction();
        this.aggregatedData = false;
        this.toggleChartType('raw');
      }
   }

   public resetAggregateFunction() {
    this.startDate = null;
    this.endDate = null;
    this.selectedFunction = 'Select';
    this.selectedresolutions = 'Select';
    this.uiErrorEndDate = false;
    this.uiErrorStartDate = false;
    this.uiErrorFunction = false;
    this.uiErrorResolution = false
  }

  public aggregatedFilterChanged() {
    if(this.validateAggregate()) {
      this.toggleChartType('aggregated');
    }
  }

   public onDateChanged(event: IMyDateModel, dateType: string) {
     if (dateType === 'startDate') {
      if (event.jsdate === null) {
        this.uiErrorStartDate = true;
      }
      this.startDate = moment.utc(event.formatted, 'DD-MM-YYYY').unix() * 1000;
      //console.log('start date is:--', this.startDate);
      this.uiErrorStartDate = false;
    }
    if (dateType === 'endDate') {
      if (event.jsdate === null) {
        this.uiErrorEndDate = true;
      }
      this.endDate = (moment.utc(event.formatted, 'DD-MM-YYYY').add('days', 1).unix() - 1) * 1000;
     // console.log('start date is:--', this.endDate);
      this.uiErrorEndDate = false;
    }
      this.localStorageService.set('endDate', this.endDate);
      if (this.selectedDataFormat === 'aggregated') {
      this.aggregatedFilterChanged();
    }
  }

   public validateAggregate() {
     const isChecked = JSON.parse(localStorage.getItem('lg-isChecked'));
     const itemName = JSON.parse(localStorage.getItem('lg-itemName'));
     if (this.startDate === undefined || this.startDate === null) {
      this.uiErrorStartDate = true;
    } else {
      this.uiErrorStartDate = false;
    }
    if (this.endDate === undefined || this.endDate === null) {
      this.uiErrorEndDate = true;
    } else {
      this.uiErrorEndDate = false;
    }
    if (this.selectedFunction === 'Select') {
      this.uiErrorFunction = true;
    } else {
      this.uiErrorFunction = false;
    }
    if (this.selectedresolutions === 'Select') {
      this.uiErrorResolution = true;
    } else {
      this.uiErrorResolution = false;
    }
    if (!this.uiErrorFunction && !this.uiErrorResolution && !this.uiErrorStartDate && !this.uiErrorEndDate) {
        return true;
    }
    return false;
   }

   public drawChart(itemGuid, itemName, dataType, index) {
     if(this.latestSelectedItemId === itemGuid) {
       let chartData = [];
       if(dataType === 'raw') {
        this.assetDataService
        .getAssetHistoricalData(this.currentAssetId,itemGuid, itemName)
        .subscribe((data: any) => {
          if(data) {
           // console.log('data for historical', data);
            chartData = data;
            if(chartData !== undefined && chartData.length >= 0) {
              let newChart = {
                              itemName,
                              itemGuid,
                              chartData,
                              type:'lineChart',
                              dataType
                            };
              if(index !== null) {
                //console.log('push to index', index);
                this.page.childrens[index] = newChart;
               // console.log('print childrens', this.page.childrens);
              } else {
                this.page.childrens.push(newChart);
                //console.log('print childrens', this.page.childrens);
              }
            }
          }
        });
       } else {
          this.assetDataService
          .getAssetAggregatedData(this.currentAssetId, itemName, this.startDate, this.endDate, itemGuid, this.selectedFunction, this.selectedresolutions)
          .subscribe((data: any) => {
            if(data) {
              //console.log('data from aggregated', data);
              chartData = data;
              if(chartData !== undefined && chartData.length >= 0) {
                let newChart = {
                              itemName,
                              itemGuid,
                              chartData,
                              type:'lineChart',
                              dataType
                            };
                if(index !== null) {
                 // console.log('push to index', index);
                  this.page.childrens[index] = newChart;
                 // console.log('print childrens', this.page.childrens);
                } else {
                  this.page.childrens.push(newChart);
                 // console.log('print childrens', this.page.childrens);
                }
              }
            }
          });
        }
        
    } else {
      //console.log("Out...");
    }
  }

  public toggleChartType(chartDataType) {
    _.forEach(this.page.childrens, (o, i) => {
     // console.log('o.name,chartData', o.name,o.itemName, chartDataType, i);
        this.drawChart(o.itemGuid, o.itemName, chartDataType, i);
    });
  }

  public removeChart(e, id) {
    e.stopPropagation();
    this.removeChartById(id);
  }

  public removeChartById(id) {
    let totalChart = this.page.childrens.length;
    let chartIndex = this.checkAndRemoveChat(id);
    let showNext = chartIndex + 1;
    let selectedItem;
    if (totalChart > 1 && totalChart > showNext) {
      selectedItem = this.page.childrens[chartIndex];
    } else if (totalChart > 1 && totalChart === showNext) {
      selectedItem = this.page.childrens[chartIndex - 1];
    }

    if (selectedItem) {
      this.selectedItemId = selectedItem.itemId;
      this.selectedItemName = selectedItem.itemName;
      this.el.nativeElement.querySelector('#' + selectedItem.itemName).click();
    }
    _.forEach(this.dataItems, (o) => {
      if (o.guid === id) {
        o.checked = false;
      }
    });
    return;
  }

  public checkAndRemoveChat(id) {
    let chartIndex = _.findIndex(this.page.childrens, (o) => { 
      return o.itemGuid === id; 
    });

    this.page.childrens = _.remove(this.page.childrens, (child) => {
      return child.itemGuid !== id;
    });
    return chartIndex;
  }

  public setSelectedChartDetails(id, name) {
    this.selectedItemId = id;
    this.selectedItemName = name;
   // console.log("Selected Id..." + this.selectedItemId);
   // console.log("Selected Name..." + this.selectedItemName);
    this.latestSelectedItemId = this.selectedItemId;
  }
}