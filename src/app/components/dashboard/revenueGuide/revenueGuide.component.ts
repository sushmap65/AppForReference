import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { dataHelper } from '../../../data';
import { forkJoin } from 'rxjs/observable/forkJoin';
import {
  DashboardDataService,
  LocalStorageService,
  AssetDataService,
  MissionService,
  UserDataService
} from '../../../services';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import {
  ENVIRONMENT,
  AppKeys,
  RevenueData,
  GetParent,
  GetAssetsByOrg,
  GetAssetByUser
} from '../../../constant';

import {
  AssetStatusDIParse,
  AlertDiParser,
  AssetStatusEventParser,
  MapDiParser
} from '../../../parser';

@Component({
  selector: 'revenue-guide',
  providers: [ DashboardDataService, AssetDataService, MissionService, UserDataService ],
  templateUrl: './revenueGuide.component.html',
  styleUrls: ['./revenueGuide.component.css']
})

export class RevenueGuideComponent implements OnInit {
    public orgId: string;
    public assetsMapData;
    public maplist;
    public centerlist;
    public userId;
    public config = { zoom: 5 };

    constructor(
        public assetDataService: AssetDataService,
        public localStorageService: LocalStorageService,
        public missionService: MissionService,
        private userDataService: UserDataService
    ) { }

    public ngOnInit() {
      const mapAlertPromise = [];
      const dashBoardAppId = AppKeys.assetDashBoard;
      this.userDataService.currentMessage.subscribe(message => this.userId = message);
      // const userId = this.localStorageService.get('userId') || this.userId
      let getParentApi = GetParent + '?appId=' +AppKeys.main;
      let getOrgByAssetApi = GetAssetsByOrg + '?appId=' +AppKeys.main;
      let getAssetByUserApi = GetAssetByUser + '?appId=' + AppKeys.main;

        if ( ENVIRONMENT === 'local') {
           getParentApi = GetParent;
           getOrgByAssetApi = GetAssetsByOrg;
           getAssetByUserApi = GetAssetByUser;
        }
        const payload = {
          $userId: this.userId.split('@')[0],
          pageOffset: 0
        }

        this.assetDataService
            .getAssetsByUser(getAssetByUserApi, payload)
            .subscribe((data: any) => {
              const assetData = [];
              _.forEach(data ,(o)=> {
                assetData.push({
                      name: o.name,
                      guid: o.guid
                    });
              });
              this.getChartData(assetData);
            });
  }

  public getChartData(assetData) {
    const dashBoardAppId = AppKeys.assetDashBoard;
    const userId = this.localStorageService.get('userId');
    const mapDataPromise =[];
    const names = [];
    _.forEach(assetData ,(o)=> {
        names.push(o.name);
        mapDataPromise.push(this.assetDataService  
           .getAssetStatusPromiseByIds(o.guid, userId, dashBoardAppId, o.name)
           );
    });
    const mapdataList = [];
    const mapCentersList = [];
    let mapList = [];
    let centers: any;
    forkJoin(mapDataPromise)
    .subscribe(results => {
      //console.log('ressults:--', results);
        _.forEach(results, (result: any, i)=> {
            //mapList = [];
            var data = result.json();
            this.setDataItemList(data.result);
            const dataItem = AssetStatusDIParse(data.result);
            const dataEvent = AssetStatusEventParser(data.result);
            const mapData = MapDiParser(dataItem,dataEvent,names[i]);
            mapList.push(mapData);
            //this.centerlist = mapData;
          });
        for(let i=0;i<mapList.length;i++) {
          if(mapList[i].lat) {
            this.centerlist = mapList[i];
            break; 
          }
        }
        this.maplist = mapList;
    });
  }

  public setDataItemList(dataitems) {
    const result = this.localStorageService.get('assetdilist') || {} ;
    const first = dataitems[Object.keys(dataitems)[0]];
    _.forEach(first, (val, key) => {
        const dataPool = val.types.dis;
        if (dataPool) {
          _.forEach(dataPool, (o) => {
            result[o.name] = o.guid;
          });
        }
    });
    this.localStorageService.set('assetdilist', result);
  }
}