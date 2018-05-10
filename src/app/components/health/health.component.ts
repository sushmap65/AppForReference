import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import * as _ from 'lodash';
import { AssetDataService, LocalStorageService } from '../../services';
import { AppKeys,
         GetHealthAlertByIds, 
         ENVIRONMENT,
         enginAlertDIList,
         batteryAlertDIList,
         allAlertsList,
         batteryAlertEventList,
         safetyAlertList,
         securityAlertList,
         rulesAlerts,
         platformAlerts
} from '../../constant';
import { dataHelper } from '../../data';
import * as moment from 'moment';

import {
  toCamelCase,
  CamelCaseToNormalString
} from '../../helper';

@Component({
  selector: 'health-comp',
  providers: [ AssetDataService ],
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})

export class HealthComponent implements OnInit {
    public healthChartData: any;
    public activeEvent: any;
    public dataItem: any;
    public yLabel= 'count';
    public assetUrl;
    public userType;
    public assetEnginAlert: any;
    public assetBatteryAlert: any;
    public safetyAlert:any;
    public securityAlert:any;
    public assetId;
    public activeEvents;
    public activeItems;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private assetDataService: AssetDataService,
        private localStorageService: LocalStorageService
    ) { }

    public ngOnInit() {
        this.userType = this.localStorageService.get('userType');
        this.assetId = this.localStorageService.get('currentAssetId');
        this.assetUrl = '#asset/' + this.assetId;
        const dashBoardAppId = AppKeys.assetDashBoard;
        const userId = this.localStorageService.get('userId');
          this.assetDataService
          .getAssetStatusById(this.assetId, userId, dashBoardAppId)
          .subscribe((data) => {
              if ( data ) {
                  if ( data.dataEvent ) {
                      this.activeEvents = data.dataEvent.result;
                      this.activeItems = data.dataItem;
                      this.assetEnginAlert = this.getEnginAlert(this.activeEvents, this.activeItems);
                      this.assetBatteryAlert = this.getBatteryAlert(this.activeEvents, this.activeItems);
                     // console.log("Data is undefind",this.assetBatteryAlert);
                      this.safetyAlert = this.getsafetyAlert(this.activeEvents,this.activeItems);
                      this.securityAlert = this.getsecurityAlert(this.activeEvents);
                  }
              }
          });
    }

    public getsafetyAlert(dataEvent,dataItem) {
      let overspeed, normalspeed;
      let speedValue;
      const result = [];
      _.forEach(dataItem ,(item) => {
          if(item.name === 'VehicleSpeedCAN') {
            speedValue = item.val;
          }
      });
      _.forEach(safetyAlertList , (i) =>  {
        _.forEach(dataEvent , (item) => {
          if(i === item.name) {
            if(item.status) {
              result.push({
              name:'Speed',
              stat:'Off',
              color:'red',
              value: speedValue,
              type: 'Kmph'
            });
            } else {
              result.push({
              name:'Speed',
              stat:'On',
              color:'green',
              value: speedValue,
              type: 'Kmph'
            });
            }
          }
        });
      });
      return result;
  }

    public getsecurityAlert(dataEvent) {
      const result = [];
      let speedStatus, devremovalStatus, devConnectedStatus;
      let devremoval, devconnected;
      _.forEach(dataEvent, (item) => {
          if(item.name === 'DeviceRemovalFromVehicle') {
              devremoval = item.time;
              devremovalStatus = item.status;
          }
          if(item.name === 'DeviceConnectedToVehicle') {
              devconnected = item.time;
              devConnectedStatus = item.status;
          }
      });
      if(devremoval && devconnected) {
       speedStatus = moment(devremoval).isAfter(devconnected);
      
          if(speedStatus) {
            result.push({
              name:'Device Removal From Vehicle',
              stat:'Off',
              color:'red',
              time: devremoval
            });
          } else {
            result.push({
              name:'Device Connected To Vehicle',
              stat:'On',
              color:'green',
              time: devconnected
            });
          }
      } else {
          if(devremovalStatus) {
            result.push({
              name:'Device Removal From Vehicle',
              stat:'Off',
              color:'red',
              time: devremoval
            });
          }
          if(devConnectedStatus) {
            result.push({
              name:'Device Connected To Vehicle',
              stat:'On',
              color:'green',
              time: devconnected
            });
          }
      }
      return result;
  }
    public getEnginAlert(dataEvent, dataItem) {
        const result = [];
        let oilpressure,coolant;
          _.forEach(dataItem ,(item) => {
             if(item.name === 'OilPressure') {
                 oilpressure = item.val;
             }
              if(item.name === 'EngineCoolentTemperature') {
                  coolant = item.val;
             }
          });
            _.forEach(dataEvent ,(i) => {
               if(i.name === 'OilPressureAlert_OEMAMW_1518604039038') {
                  if(i.status) {
                    result.push({
                      name: 'Oil Pressure',
                      value: oilpressure,
                      type: 'Pa',
                      stat: 'Off',
                      color: 'red'
                    });
                  } else {
                    result.push({
                      name: 'Oil Pressure',
                      value: oilpressure,
                      type: 'Pa',
                      stat: 'On',
                      color: 'green'
                    });
                  }
               }
            });   
            _.forEach(dataEvent ,(i) => {
              if(i.name === 'EngineCoolentTemperatureAlert_OEMAMW_1518604044230') {
                if(i.status) {
                    result.push({
                      name: 'Engine Coolant Temperature',
                      value: coolant,
                      type: '°C',
                      stat: 'Off',
                      color: 'red'
                    });
                } else {
                    result.push({
                      name: 'Engine Coolant Temperature',
                      value: coolant,
                      type: '°C',
                      stat: 'On',
                      color: 'green'
                    });
                }
              }
            });
           return result;
  }
    public getBatteryAlert (dataEvent, dataItem) {
      const result = [];
      let external,internal;
        _.forEach(dataItem ,(item) => {
           if(item.name === 'ExternalBatteryVoltage') {
               external = item.val; 
           }
            if(item.name === 'InternalBatteryCharge') {
                internal = item.val;
           }
        });
        _.forEach(dataEvent ,(item) => {
          if(item.name === 'ExternalBatteryVoltageAlert_OEMAMW_1518604044428') {
             if(item.status) {
                 result.push({
                    name: 'External Battery Voltage',
                    value: external,
                    type: 'V',
                    stat: 'Off',
                    color: 'red'
                  });
             } else {
                 result.push({
                    name: 'External Battery Voltage',
                    value: external,
                    type: 'V',
                    stat: 'On',
                    color: 'green'
                  });
               }
           }
        }); 
        _.forEach(dataEvent ,(item) => {  
          if(item.name === 'InternalBatteryChargeAlert_OEMAMW_1518604049612') {
              if(item.status) {
                 result.push({
                    name: 'Internal Battery Charge',
                    stat: 'Off',
                    color: 'red',
                    value: internal,
                    type: '%'
                  });
             } else {
                 result.push({
                    name: 'Internal Battery Charge',
                    stat: 'On',
                    color: 'green',
                    value: internal,
                    type: '%'
                  });
             }
           }
        });
      //  console.log('Battery health valuess', result);
      return result;
  }

}
