import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import * as _ from 'lodash';
import { AssetDataService, LocalStorageService } from '../../services';
import {
  AppKeys,
  ENVIRONMENT,
  enginAlertEventList,
  enginAlertDIList,
  batteryAlertDIList,
  allAlertsList,
  batteryAlertEventList,
  safetyAlertList,
  securityAlertList,
  rulesAlerts,
  platformAlerts,
  ServiceDueConstantsArray,
  ServiceDueConstants,
  rulesAlias,
  serviceDueAlert,
  mapIcons
} from '../../constant';

import { dataHelper } from '../../data';
//import { toLowerCase } from '../../helper';
import {
  toCamelCase,
  CamelCaseToNormalString
} from '../../helper';
import * as moment from 'moment';


@Component({
  selector: 'asset-details',
  providers: [ AssetDataService ],
  templateUrl: './assetDetails.component.html',
  styleUrls: ['./assetDetails.component.css']
})

export class AssetDetailsComponent implements OnInit {
    public asset: any;
    public latitude;
    public longitude;
    public mapsLists = [];
    public centers: any;
    public dealers;
    public customers;
    public activeEvents;
    public activeItems;
    public eventArray;
    public userType;
    public viewType = 'overview';
    public assetEnginAlert;
    public assetBatteryAlert;
    public assetItemAlert;
    public assetAllAlert;
    public safetyAlert;
    public securityAlert;
    public currentAssetId;
    public lastUpdatedStatus;
    public ignitionStatus;
    public utilizationAlert;
    public ignition;
    public loading = false;
    public modalDisplay = false;
    public config = { zoom: 10 };
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private assetDataService: AssetDataService,
        private localStorageService: LocalStorageService
    ) { }

    public ngOnInit() {
        this.loading = true;
        this.localStorageService.set('currentAssetLocation',{
                  lat: '',
                  lng: '',
                  name: '',
                  IgnitionStatus: '',
                  LastUpdatedStatus: '',
                  iconUrl:mapIcons.locationIcon 

                });
        this.userType = this.localStorageService.get('userType');
        this.currentAssetId = this.localStorageService.get('currentAssetId');
        const assetId = this.route.snapshot.params['id'] || this.currentAssetId;
        this.localStorageService.set('currentAssetId', assetId);
        const userId = this.localStorageService.get('userId');
        const appId = AppKeys.main;
        const assetDashBoardId = AppKeys.assetDashBoard;
          this.assetDataService
            .findAssetById(assetId, userId, appId)
            .subscribe((data) => {
              // this.asset = data.result;
              const assetData = data[0];
              this.asset = assetData;
              this.localStorageService.set('currentSerialNumber', this.asset.serialNumber);
              this.localStorageService.set('currentAssetLocation',{
                  lat: '',
                  lng: '',
                  name: this.asset.name,
                  IgnitionStatus: '',
                  LastUpdatedStatus: '',
                  iconUrl:mapIcons.locationIcon 

                });
            });

        const dashBoardAppId = AppKeys.assetDashBoard;
          this.assetDataService
          .getAssetStatusById(assetId, userId, dashBoardAppId)
          .subscribe((data) => {
            this.loading = false;
              let lngObj;
              let latObj;
              let time1;
              let time2;
              if ( data ) {
                //console.log('data items',data.dataItem);
                //console.log('data events', data.dataEvent);
                  if ( data.dataEvent ) {
                      this.activeEvents = data.dataEvent.result;
                      this.activeEvents = data.dataEvent.result;
                      _.forEach(this.activeEvents, (o) => {
                          if (o.name === 'IgnitionON') {
                             time1 = o.time;
                          }
                      });
                      _.forEach(this.activeEvents, (o) => {
                          if (o.name === 'IgnitionOFF') {
                             time2 = o.time;
                          }
                      });
                      if(time1 && time2) {
                        this.ignitionStatus = moment(time1).isAfter(time2);
                        if(this.ignitionStatus) {
                          this.ignition = "ON";
                          this.lastUpdatedStatus = time1;
                        } else {
                          this.ignition = "OFF";
                          this.lastUpdatedStatus = time2;
                        }
                      } else if(time1) {
                          this.ignition = "ON";
                          this.lastUpdatedStatus = time1;
                      } else if(time2) {
                          this.ignition = "OFF";
                          this.lastUpdatedStatus = time2;
                      } else {
                        ;
                      }
                      this.activeItems = data.dataItem;
                      this.eventArray = data.dataEvent.typeArray;
                       // Filter asset Engine alert
                       // Filter asset battery alert
                       // filter all alerts
                      this.assetAllAlert = this.getAllAlert(this.activeEvents);
                      console.log('this.assetAllAlert-device', this.assetAllAlert);

                      this.assetItemAlert = this.getPlatformAlert(this.activeEvents, this.activeItems);
                        console.log('this.assetItemAlert-paltform', this.assetItemAlert);
                      this.utilizationAlert = this.getUtilizationAlert(this.activeItems);

                       // set alerts
                      this.localStorageService.set('assetAllAlert', this.assetAllAlert);
                      this.localStorageService.set('activeEvents', this.activeEvents);
                      this.localStorageService.set('eventList', this.eventArray);
                      this.localStorageService.set('utilizationAlert', this.utilizationAlert);
                  }
                  if ( data.dataItem ) {
                      this.localStorageService.set('dataItem', data.dataItem);
                      lngObj = _.find(data.dataItem, (o) => {
                          return o.name === 'Longitude';
                      });
                      latObj = _.find(data.dataItem, (o) => {
                          return o.name === 'Latitude';
                      });
                  }
              }
              // TODO: make sure asset name exist (Nandhini)
              const assetName = this.asset || this.asset.name;
              const assetLocation = {
                  lat: latObj.val,
                  lng: lngObj.val,
                  name: this.asset.name,
                  IgnitionStatus: this.ignition,
                  LastUpdatedStatus: this.lastUpdatedStatus,
                  iconUrl:mapIcons.locationIcon 

                }

              this.localStorageService.set('currentAssetLocation', assetLocation);
              let point;
              if ( latObj && lngObj ) {
                  point = {
                      lat: latObj.val,
                      lng: lngObj.val,
                      zoom: 6,
                      radius: 100,
                      color: 'red',
                      IMEI: this.asset.name,
                      LastUpdatedStatus: this.lastUpdatedStatus,
                      IgnitionStatus: this.ignition,
                      iconUrl:mapIcons.locationIcon  

                  };
              } else {
                  point = {};
              }
              this.mapsLists.push(point);
              this.centers = point;
          });

          this.assetDataService
            .getOrgByAssetIdAndType(assetId, 'CustomerOrg', assetDashBoardId)
            .subscribe((data) => {
                this.customers = data;
            });
        if (this.userType === 'OEM') {
            this.assetDataService
            .getOrgByAssetIdAndType(assetId, 'DealerOrg', assetDashBoardId)
            .subscribe((data) => {
                this.dealers = data;
            });
        }
    }

  public setViewType(type) {
        this.viewType = type;
  }
  public getAllAlert(dataEvent) {
   const result = {
      OverSpeed: 0,
      LowInternalbattery: 0,
      NormalSpeed: 0,
      DeviceRemovalFromVehicle: 0,
      DeviceConnectedToVehicle: 0,
      LowVehicleBattery: 0,
      NormalVehicleBattery: 0,
      HighCoolantTemperature: 0,
      NormalCoolantTemperature: 0,
      LowOilPressure: 0,
      NormalOilPressure: 0,
      PowerON: 0
    };
    const alert = [];
       const status = false;
       _.forEach(allAlertsList , (i) =>  {
            _.forEach(dataEvent, (item) => {
                if(i === item.name) {
                  result[item.name] = item.time;
                }
             });
       });

    var speedStatus = moment(result['OverSpeed']).isAfter(result['NormalSpeed']);
     if(speedStatus) {
         alert.push({
           name:'Over Speed',
           time:result['OverSpeed']
         });
     }

    var internalBatteryStatus = moment(result['LowInternalbattery']).isAfter(result['PowerON']);
    if(internalBatteryStatus) {
        alert.push({
           name:'Low Internal Battery',
           time:result['OverSpeed']
         });
    }
     var batteryStatus = moment(result['LowVehicleBattery']).isAfter(result['NormalVehicleBattery']);
     if(batteryStatus) {
         alert.push({
           name: 'Low Vehicle Battery',
           time: result['LowVehicleBattery']
         });
     }
     
     
     var temperatureStatus = moment(result['HighCoolantTemperature']).isAfter(result['NormalCoolantTemperature']);
     if(temperatureStatus) {
       alert.push({
         name: 'High Coolant Temperature',
         time: result['HighCoolantTemperature']
       });
     }
     var pressureStatus = moment(result['LowOilPressure']).isAfter(result['NormalOilPressure']);
     if(pressureStatus) {
       alert.push({
         name: 'Low Oil Pressure',
         time: result['LowOilPressure']
       });
     }
     var deviceStatus = moment(result['DeviceRemovalFromVehicle']).isAfter(result['DeviceConnectedToVehicle']);
     if(deviceStatus) {
       alert.push({
         name: 'Device Removal From Vehicle',
         time: result['DeviceRemovalFromVehicle']
       });
     }
    return alert;
}
    public getPlatformAlert(dataEvent, dataItem) {
      console.log('dataitems and events', dataItem,dataEvent);
      const platformalert = [];
      _.forEach(platformAlerts , (i) =>  {
        _.forEach(dataEvent , (item) => {
            if(i === item.name) {
              if(item.status) {
                let names = item.name.split('_');
                let DataItemName = names[0].split('A');
                let itemname = CamelCaseToNormalString(DataItemName[0]);
                if(itemname === 'Speed') {
                  _.forEach(dataItem , (key) => {
                    if(key.name === 'VehicleSpeedCAN') {
                      platformalert.push({
                        name: itemname,
                        time: item.time,
                        val: key.val
                      });
                    }
                  });
                } else {
                    _.forEach(dataItem , (key) => {
                      if(key.name === DataItemName[0]) {
                          platformalert.push({
                          name: itemname,
                          time: item.time,
                          val: key.val
                        });
                      }  
                    });
                }
                   
              }
            }
        });
      });
   let tempAlert = [];

         _.forEach(dataEvent, (item) => {
             if(item.name.match(/^AMW/) ) {
               tempAlert.push({
                 name: item.name,
                 time: item.time,
                 description: item.description,
                 status: item.status 
               }); 
             }
         });

         if(tempAlert !== undefined && tempAlert.length > 0) {
           _.forEach(tempAlert, (item) => {
             if(item.status) {
               platformalert.push({
                 name: item.name,
                 time: item.time,
                 description: item.description,
                 status: item.status
               });
             }
           });
         }

       if(platformalert !== undefined && platformalert.length > 0) {
         _.forEach(platformalert , (i) => {
             if(i.name === 'Engine Coolent Temperature') {
                 i.name = 'Engine Coolant Temperature';
             }
         });
       }
       let lastServiceTime;
       _.forEach(dataItem, (o) => {
          if(o.name.toLowerCase() === ServiceDueConstants.lastServiceDate) {
            lastServiceTime = new Date(parseInt(o.val));
             /*lastServiceTime = moment
                     .unix(o.val/1000)
                     .format('DD-MM-YYYY HH:mm:ss');*/
             //console.log('last service date', lastServiceTime, o.val);
           }
        });
       if(platformalert !== undefined && platformalert.length > 0) {
         let serviceAlertTime;
         let position;
          _.forEach(platformalert , (i) => {
              if(i.name.match(/^AMWServiceDue/)) {
                 serviceAlertTime = i.time;
                // console.log('service alert is:--', serviceAlertTime);
                 position = _.findIndex(platformalert, (m) => { return m.name == i.name; });
               }
          });
          if(serviceAlertTime && lastServiceTime !== undefined) {
            let status = moment(serviceAlertTime).isBefore(lastServiceTime);
                //console.log(status,'status');
                //console.log(position);
                if(status) {
                  platformalert.splice(position,1);
              } else {
                ;
                }
          }  else {;}              
   
       }
      
      console.log('platform alerts are', platformalert);
      return platformalert;
    }

   public closeModal() {
    this.modalDisplay = true;
   // console.log("modal");
    //this.modalDisplay = false;
  }

public getUtilizationAlert(dataItem){
    const result = [];
    _.forEach(dataItem, (item) => {
         //  _.forEach(ServiceDueConstants, (val, key) => {
            if (ServiceDueConstantsArray.indexOf(item.name.toLowerCase()) !== -1) {
              if(item.name.toLowerCase().indexOf('date') !== -1){
               item.val =  moment
                     .unix(item.val/1000)
                     .format('DD-MM-YYYY HH:mm:ss');
              }
              result.push({
               name:item.name,
               value:item.val,
               alias:item.name.split('_').join(' ')
              })
            }
         // });
      });
        return result;
  }


}