import { Component } from '@angular/core';
import * as _ from 'lodash';
import {
  AssetDataService,
  LocalStorageService,
  DashboardDataService,
  MissionService,
  UserDataService 
} from '../../services';
import { ENVIRONMENT, AppKeys, GetHealthAlertByIds,
  RevenueData,
  GetParent,
  GetAssetsByOrg,
  GetAssetByUser } from '../../constant';
import { dataHelper } from '../../data';
@Component({
  selector: 'fleet',
  templateUrl: './fleet.component.html',
   providers: [ DashboardDataService, AssetDataService,LocalStorageService, MissionService, UserDataService ],
  styleUrls: ['./fleet.component.css']
})

export class FleetComponent {
  public assetList;
  public assetAlertData = [];
  public orgId: string;
  public assetsMapData;
  public maplist;
  public centerlist;
  public userId;
  public errorData;
  public modalDisplay;


  constructor(
    private assetDataService: AssetDataService,
    private localStorageService: LocalStorageService,
    public missionService: MissionService,
    private userDataService: UserDataService
  ) { }


    public ngOnInit() {
    console.log("Oninit is here");
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

        console.log('this userid:-', this.userId);
        const payload = {
          $userId: this.userId.split('@')[0],
          pageOffset: 0
        }

        this.assetDataService
            .getAssetsByUser(getAssetByUserApi, payload)
            .subscribe((data: any) => {
            console.log("This is data------------",data);
              const assetData = [];
              this.assetList = data;
           //   _.forEach(data ,(o)=> {
             //   assetData.push({
               //       name: o.name,
                //      guid: o.guid
                  //  });
              //});
             
            });
  }

  public searchAssets(term) {
    const query = 'name|' + term.trim();
    // TODO :- create serch query
    const userId = this.localStorageService.get('userId');
    const appId = AppKeys.main;
    // this.assetList = JSON.parse(assetDataStr);
      this.assetDataService
      .findAssetQuery(query, userId, appId)
      .subscribe((data) => {
        const resultData = data.result;
        _.map(resultData, (element: any) => {
          element.status = false;
        });
        this.assetList = resultData;
      },(error) => {
        this.modalDisplay = false;
        console.log('error is :====', error._body);
        this.errorData = error._body;
        //window.alert("search request failed due to" + error._body);

      }
      );
  }

  public showAssetAlert(e) {
    // find in assetAlertData
    const id = e.id;
    const assetDataInCache = _.find(this.assetList, (o: any) => o.guid === id);
    if (assetDataInCache && assetDataInCache.alerts) {
        console.log('found:-', assetDataInCache);
    } else {
      const category = [100, 101, 102, 103];
      this.getAlertByType(id, category);
    }
  }

  public closeModal() {
    this.modalDisplay = true;
    //this.modalDisplay = false;
  }
  public getAlertByType(id, category ) {
    const appId = AppKeys.assetDashBoard;
    let apiUrl = GetHealthAlertByIds + '?appId=' + appId + '&function=count';
    if ( ENVIRONMENT === 'local' ) {
      apiUrl = GetHealthAlertByIds;
    }
    const guids = [id];
    const tempDate = new Date();
    const lte = parseInt((tempDate.getTime() / 1000).toFixed(0), 10) * 1000;
    const gte = parseInt((tempDate.setMonth(tempDate.getMonth() - 6) / 1000).toFixed(0), 10) * 1000;
    // const filters = [{time: [{gte}, {lte}, {op: '&'}]}];
    const payload = {
            guids,
            filters: [{
              time: [{ gte }, { lte }, {op: '&' }],
              category: category,
              status: true
            }]
          };

      this.assetDataService
        .findAssetAlertsById(apiUrl, payload)
        .subscribe((data) => {
          const foundAsset = _.find(this.assetList, (o: any) => o.guid === id);
          // console.log('findAssetAlertsById:-', foundAsset);
          foundAsset.alerts = data;
        });
  }
}
