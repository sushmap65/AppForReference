import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { forkJoin } from 'rxjs/observable/forkJoin';
// import { map } from 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AssetDataService, LocalStorageService, MissionService, ActiveAlertService } from '../../../services';
import {
  ENVIRONMENT,
  AppKeys,
  GetParent,
  GetAssetsByOrg,
  GetActiveAlertsAll,
  GetAssetByClass,
  GetAssetByUser
} from '../../../constant';
import { dataHelper } from '../../../data';
import {
  AssetStatusDIParse,
  AlertDiParser
} from '../../../parser';
@Component({
  selector: 'activeAlertEvents',
  providers: [ AssetDataService,
               LocalStorageService,
               MissionService, 
               ActiveAlertService 
             ],
  templateUrl: './activeAlertEvents.component.html',
  styleUrls: ['./activeAlertEvents.component.css']
})

export class ActiveAlertEventComponent implements OnInit  {
    public alertData: any;
    public AssetsDetails;
    public orgId: string;
    public assetsObj = {};
    public yLabel= 'count';
    public assetData = [];
    public assetsAlertData;
    public chartData;
    public allAlertsChart;

    constructor(
        private http: Http,
        public assetDataService: AssetDataService,
        public localStorageService: LocalStorageService,
        public missionService: MissionService,
        public activeAlertService: ActiveAlertService
    ) { }

    public ngOnInit() {
      const dashBoardAppId = AppKeys.assetDashBoard;
      const userId = this.localStorageService.get('userId');
      let getParentApi = GetParent + '?appId=' + AppKeys.main;
      let getAssetsByOrgApi = GetAssetsByOrg + '?appId=' +AppKeys.main;
      let getAssetByClass = GetAssetByClass + '?appId=' + AppKeys.assetDashBoard;
      let getAssetByUserApi = GetAssetByUser + '?appId=' + AppKeys.main;
        if ( ENVIRONMENT === 'local') {
           getParentApi = GetParent;
           getAssetsByOrgApi = GetAssetsByOrg;
           getAssetByClass = GetAssetByClass;
           getAssetByUserApi = GetAssetByUser;
        }

        const payload = {
          $userId: this.localStorageService.get('userId').split('@')[0],
          pageOffset: 0
        }

        this.assetDataService
            .getAssetsByUser(getAssetByUserApi, payload)
            .subscribe((data: any) => {
              this.localStorageService.set('allAssetsList', data);
              this.AssetsDetails = data;
              this.missionService.sendMessage(this.AssetsDetails);
              const assetData = [];
              _.forEach(data ,(o)=> {
                this.assetsObj[o.guid] = o.name;
                assetData.push(o.guid);
              });
              this.getChartData(assetData, data);
            });
  }

  public getChartData(guids, assetdata) {
    const dashBoardAppId = AppKeys.assetDashBoard;
    let getActiveAlertsAll = GetActiveAlertsAll + '?appId=' + dashBoardAppId + '&function=COUNT'

    if ( ENVIRONMENT === 'local') {
       getActiveAlertsAll = GetActiveAlertsAll;
    }
    const payload = { guids };
    this.activeAlertService
         .getActiveAlertEventData(getActiveAlertsAll, payload)
         .subscribe((data: any) => {
           const tempChartData = [];
            _.forEach(data, ( val: any ) => {
              if(assetdata !== undefined) {
                _.forEach(assetdata, (asset) => {
                  if(val.State === asset.guid) {
                      val.State = asset.name;
                  }
                });
              } 
              if(val.State !== '') {
                tempChartData.push(val); 
              }
            });
            
            if(!_.isEmpty(tempChartData)) {
              this.allAlertsChart = tempChartData;
            }
         });
  }
}