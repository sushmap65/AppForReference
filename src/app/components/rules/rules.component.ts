import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs/observable/forkJoin';
import {
  RulesDataService,
  AppServicesService,
  LocalStorageService,
} from '../../services';
import {
  ENVIRONMENT,
  AppKeys,
  GetServiceInfo,
  ruleConfigUpdate,
  GetScriptConfigInfo,
  rulesCategories,
  GeoFenceItems,
  mapIcons
} from '../../constant';
import { dataHelper } from '../../data';
import {
    toCamelCase,
    CamelCaseToNormalString
  } from '../../helper';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'utilization-comp',
  providers: [RulesDataService, AppServicesService, LocalStorageService],
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})

export class RulesComponent implements OnInit  {
    public chartData: any;
    public userType;
    public assetUrl;
    public assetName;
    public assetSerialNo;
    public yLabel= 'hr';
    public isClicked;
    public isClicked1;
    public isClicked2;
    public isClickedContent;
    public rulesObject;
    public ConfigNames =[];
    public allServicesObj = {};
    public appIdAssetDashBoard = AppKeys.assetDashBoard;
    public mapConfig = {
      zoom: 10
    }
    public mymap;
    public MarkerLocation;
    public ServiceList;
    public markerLng;
    public markerLat;
    public tempLat;
    public tempLng;
    public setRadius;
    public flag = true;
    constructor(
        private rulesDataService: RulesDataService,
        private appServicesService: AppServicesService,
        private localStorageService: LocalStorageService,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,
    ) { this.toastr.setRootViewContainerRef(vcr);}


    public ngOnInit() {
        this.assetName = this.localStorageService.get('currentAssetLocation').name;
        this.assetSerialNo = this.localStorageService.get('currentSerialNumber');
        console.log("Asset Serial  Name---------------------",this.assetSerialNo);
        const currentAssetId = this.localStorageService.get('currentAssetId');
        this.assetUrl = '#asset/' + currentAssetId;
        const appId = AppKeys.assetDashBoard;
        let apiUrl = GetServiceInfo + '?appId=' + appId;

        if ( ENVIRONMENT === 'local' ) {
            apiUrl = GetServiceInfo;
        }
        this.rulesDataService
            .getServiceInfo(apiUrl)
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
                    this.ServiceList = availableServicesList;
                    this.getScriptDetails(availableServicesList);
                    
                }
            });
    }
    public getScriptDetails(list: any) {
      let apirUrl = GetScriptConfigInfo +'?appId=' + this.appIdAssetDashBoard;

      if(ENVIRONMENT === 'local') {
        apirUrl = GetScriptConfigInfo;
      }
      _.forEach(list, (value, key) => {
          const serviceListPromise = [];
          if (value) {
              _.forEach(value, (o) => {
                  this.allServicesObj[o.name] = o.guid;
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
                                _.forEach(config,(item)=>{
                                  item.alias = CamelCaseToNormalString(item.name);
                                  if(item.alias === 'Threshold Engine Coolent Temperature') {
                                      item.alias = 'Threshold Engine Coolant Temperature';
                                  } else {
                                    ;
                                  }
                                });

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
                                if((o.type === 'geoFence') || (o.type === 'timeFence') || (o.type === 'serviceDue')){
                                    if(tempGuid.indexOf(currentAssetId) === -1){
                                      value.splice(value.indexOf(o),1);
                                    }
                                    else if(o.type === 'serviceDue'){
                                      console.log('inside service due info',o);
                                      console.log('value from list',value);
                                      this.localStorageService.set('serviceDueInfo',o)
                                    }
                                  else if (o.type === 'geoFence'){
                                  const Geoguid = o.guid;
                                  const tempMapData = {
                                    zoom: 10,
                                    color: 'red',
                                    name: 'Asset',
                                    fillColor: 'red',
                                    draggable : true,
                                    animation: google.maps.Animation.DROP,
                                    guid : Geoguid,
                                    iconUrl:mapIcons.locationIcon
                                  }
                                  if(this.MarkerLocation && (this.MarkerLocation.guid === Geoguid)){
                                    o.isVisible = true;
                                    this.markerLat = (this.MarkerLocation.lat).toString();
                                    this.markerLng = (this.MarkerLocation.lng).toString();
                                  }
                                  else{
                                    this.markerLat = '';
                                    this.markerLng = '';
                                  }
                                  _.forEach(config, (o) => {
                                    if(o.name === 'Lat') {
                                      o.value = this.markerLat || o.value;
                                      console.log('value',o.value);
                                      tempMapData['lat'] = parseFloat(this.markerLat) || parseFloat(o.value) || parseInt('0');
                                    } else if(o.name === 'Long') {
                                      o.value = this.markerLng || o.value;
                                      tempMapData['lng'] = parseFloat(this.markerLng) || parseFloat(o.value) || parseInt('0');
                                    } else if(o.name === 'radius') {
                                      o.value = this.setRadius || o.value;
                                      tempMapData['radius'] = (parseFloat(this.setRadius) || parseFloat(o.value) || parseInt('0')) * 1000;
                                    }
                                    else if(o.name === "OncePerDay"){
                                      o.value = JSON.parse(o.value);
                                    }
                                  });
                                  o.mapData = [tempMapData];
                                  o.mapCenter = tempMapData;
                                  o.isMap = Boolean(tempMapData['lat']) || Boolean(tempMapData['lng']);                            
                              
                              }
                            }
                              }
                      });
                  }
              });
          }
      });

      const listValue = _.values(list);
      console.log('print listvalue of updated list',listValue);
      console.log('service obj', this.allServicesObj);
      _.forEach(listValue, (o) => {
          _.forEach(o,(data) => {
          })
      });
      
      this.rulesObject = listValue;
    }

    public submitServiceConfig(ruleName) {
      console.log('rulename',ruleName);
      const allRules = _.flatten(this.rulesObject);
      const rule = _.find(allRules, (o: any) => {
        return o.name === ruleName;
      });
      const guid = this.localStorageService.get('currentAssetId');
      const label = 'asset';
      const payload = {
          scriptGuid: this.allServicesObj[ruleName],
          config: rule.result,
          appliesList: [{label,guid}]
        }
      let status = [];
        console.log('payload in geo', payload);
      _.forEach(payload.config ,(i) => {
        if(!(i.name ===  'OncePerDay')) {
          status.push(this.validation(i.name,i.value));
        }
        });
      let finalStatus = this.checkValues(status);

      if(finalStatus) {
        this.updateScript(payload);
      } else {
        ;
      }
    }

    public checkValues(status) {
      let finalData = true;
      if(status !== undefined && status.length > 0) {
        for(let i=0;i<status.length;i++) {
          if(!(status[i] === true)) {
              finalData = false;
              break;
          }
        }
      }
      return finalData;
    }

    public validationNumber(data: any) {
       let status;
      if(data.length > 0) {
          if(!(data.match(/^[0-9]+(\.[0-9]{0,30})?$/))) {
              this.toastr.info('Please enter valid number');
              status = false;
          } else {
            status = true;          }
      }
      return status; 
    }
      // HARDCODED
    public validation(name: any, data: any) {
      let status = true;
        if(data.length > 0) {
          if(!((name === 'starttime') || (name === 'endtime'))) {
            if(!(data.match(/^[0-9]+(\.[0-9]{0,30})?$/))) {
              this.toastr.info('Please enter valid number');
              status =false;
          } 
          } 
          else if(!(data.match(/^([0-9]+):([0-5]?[0-9]):([0-5]?[0-9])$/))) {
              this.toastr.info('Please enter date hh:mm:ss format');
              status =false;
            } 
        } 
      return status;
    }

    public savePreferencesRule() {
      const allRules = _.flatten(this.rulesObject);
      const rules = [];
      _.forEach(allRules, (o: any) => {
        if(o.type === 'preferences') {
          rules.push(o);
        }
      });

      _.forEach(rules, (rule) => {
        const guid = this.localStorageService.get('currentAssetId');
        const label = 'asset';
        const payload = {
            scriptGuid: rule.guid,
            config: rule.result,
            appliesList: [{label, guid}]
        }
        let status = [];
        _.forEach(payload.config ,(i) => {
         status.push(this.validationNumber(i.value));
         });
        let finalStatus = this.checkValues(status);
        if(finalStatus) {
          this.updateScript(payload);
        }
      });
    }

    public updateScript(payload) {
      console.log('update payload',payload);
      _.forEach(payload.config, (o)=>{
        if(o.name === 'OncePerDay' ){
            o.value = o.value.toString();
        }
      })
      const baseUrl = ruleConfigUpdate + '?appId=' + this.appIdAssetDashBoard;
      this.rulesDataService
        .postUpdateScriptDetails(baseUrl, payload)
        .subscribe((data) => {
          if(data){
          this.toastr.info("Set Successfully"); 
          this.getScriptDetails(this.ServiceList);
      //     _.forEach(payload.config, (o)=>{
      //   if(o.name === 'OncePerDay' ){
      //       o.value = JSON.parse(o.value);
      //   }
      // })
        }
        });


    }



    public toggleRuleBlock(ruleName) {
      const allRules = _.flatten(this.rulesObject);
      const rule = _.find(allRules, (o: any) => {
        return o.name === ruleName;
      });
      rule.isVisible = !rule.isVisible;
    }
    public onUpdatedLocation(event){
      this.MarkerLocation = event;
      this.getScriptDetails(this.ServiceList);
    }
    public refreshMap(config,rule){
      if(rule.type === 'geoFence'){
      this.MarkerLocation = {guid:rule.guid,
                           };
      if((config.name).toLowerCase() === 'lat'){
        this.MarkerLocation.lat = Number(config.value) || '';
        this.tempLat = this.MarkerLocation.lat;
        this.MarkerLocation.lng = this.tempLng || this.markerLng || '';
      }
      if((config.name).toLowerCase() === 'long'){
        this.MarkerLocation.lng = Number(config.value) || '';
        this.tempLng = this.MarkerLocation.lng;
        this.MarkerLocation.lat = this.tempLat || this.markerLat || '';
      }
      if((config.name).toLowerCase() === 'radius')
      {
        this.setRadius = config.value;
        this.MarkerLocation.lat = this.tempLat || this.markerLat || '';
        this.MarkerLocation.lng = this.tempLng || this.markerLng || '';
      }
      console.log('this.marker',this.MarkerLocation);
      this.getScriptDetails(this.ServiceList);
    }
  }
  public CheckValue(config){
    console.log('config checkbox',config);
   // config.value = (config.value).toString();
  }
}
