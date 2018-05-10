import {
  Component,
  OnInit,
  Input,
  ElementRef
} from '@angular/core';

import * as _ from 'lodash';
import * as moment from 'moment';
import { AppServicesService } from '../../services';

@Component({
  selector: 'app-appservices',
  templateUrl: './appservices.component.html',
  styleUrls: ['./appservices.component.css'],
  providers: [AppServicesService],
})

export class AppservicesComponent implements OnInit {
  public elementRef: ElementRef;
  public isSubBtnActive: boolean = false;
  public subscribedServices;
  public isSubBtnVisible: boolean = false;
  public loading: boolean = true;
  public loadingScript: boolean;
  public scriptCofigData;
  public availableAssetdata;
  public isConfigEmpty: boolean = false;
  public isAssetEmpty: boolean = false;
  public showScriptConfig: boolean = false;
  public isConfigServerError: string = '';
  public optionsModel;
  public mapsLists = [];
  public mapsListsItem = [];
  public mapsListsss;
  public latitude;
  public longitude;
  public zoomSize: number = 17;
  public radiusSize: number;
  public color: string = 'red';
  public selectedSubscribe;
  private serviceData;
  private availableServices;
  private serviceError;
  private selectedServiceId;
 

  constructor(
    public appServicesSerive: AppServicesService,
    private el: ElementRef,
  ) {
    // Todo
  }

  public ngOnInit() {
    this.updateServices();
  }

  public updateServices() {
    this.loading = true;
    this.appServicesSerive
      .getAvailableAndSubscribeServices()
      .subscribe((data) => {
        this.loading = false;
        this.serviceData = data;
        const serviceData = this.serviceData;
        const result = this.serviceData.result;
        if (serviceData && serviceData.status !== 'error') {
          this.availableServices = result.availableServices;
          this.subscribedServices = result.subscribedServices.reverse();
        } else {
          this.serviceError = serviceData.status;
        }
      });
  }

  public showSubscribeButton(isChecked, id) {
    if (!isChecked) {
      _.forEach(this.availableServices, (o) => {
        if (o.checked === false) {
          this.isSubBtnVisible = false;
        }
      });
    } else {
      this.isSubBtnVisible = true;
    }
  }

  public getScriptDetailsById(id, name) {
    // highlight selected class
    this.selectedServiceId = id;
    this.loadingScript = true;
    this.showScriptConfig = true;
    this.selectedSubscribe = name;
    _.forEach(this.subscribedServices, (o) => {
      o.isSelected = o.guid === id ? true : false;
    });
    this.appServicesSerive
      .getScriptDetailsById(id)
      .subscribe((data) => {
        this.loadingScript = false;
        if (data && data.status !== 'error') {
          this.isConfigEmpty = false;
          this.isAssetEmpty = false;
          this.isConfigServerError = '';
          const scriptFormData = data.result;
          this.scriptCofigData = scriptFormData.config;
          //this.scriptAssetData = scriptFormData.asset;
          this.isAssetEmpty = !scriptFormData.asset || scriptFormData.asset.length < 1;
          this.isConfigEmpty = !scriptFormData.config || scriptFormData.config.length < 1;
        } else {
          this.isConfigServerError = data.status;
        }
      });
    this.getAllAssetsByUser();
  }

  public subscribeServices() {
    this.isSubBtnActive = true;
    let checkedList = _.filter(this.availableServices, 'checked');
    const subscribeList = _.map(checkedList, 'guid');
    this.appServicesSerive
      .subscribeServices(subscribeList)
      .subscribe((data) => {
        this.isSubBtnActive = false;
        this.isSubBtnVisible = false;
        if (data.status !== 'error') {
          this.updateServices();
        }
      });
  }

  public updateScriptValue(item) {
    this.mapsLists = [];
    this.mapsListsItem = [];
    if (item.name === 'Lat') {
      this.latitude = parseFloat(item.value);
    } else if (item.name === 'Long') {
      this.longitude = parseFloat(item.value);
    } else if (item.name === 'radius') {
      this.radiusSize = parseFloat(item.value);
    }

    if (this.latitude && this.longitude) {
      this.mapsListsss = "map";
      const mapVal = {
        lat: this.latitude,
        lng: this.longitude,
        zoom: this.zoomSize,
        radius: this.radiusSize * 10,
        color: this.color,
        name: this.selectedSubscribe
      };

      this.mapsLists.push(mapVal);
      this.mapsListsItem.push(mapVal);
    }

    _.forEach(this.scriptCofigData, (o) => {
      if (o.guid === item.guid) {
        o.isChanged = true;
      }
    });
  }

  public submitServiceConfig() {
    this.loadingScript = false;
    const changedData = _.filter(this.scriptCofigData, 'isChanged');
    const checkedList = _.filter(this.availableAssetdata, 'checked');
    const selectedAsset = _.map(checkedList, 'guid');

    console.log("1112..." + JSON.stringify(selectedAsset));

    let selectedAssets = [{
      "label": "asset",
      "guid": selectedAsset[0]
    }]
    console.log("2332..." + JSON.stringify(selectedAssets));
    let configData = [];
    _.map(changedData, (e: any) => {
      let temp = { value: null, guid: null, label: null };
      console.log("Temp..." + JSON.stringify(e));
      temp.value = e.value;
      temp.guid = e.guid;
      temp.label = e.label;

      configData.push(temp);
    });
    const postData = {
      scriptGuid: this.selectedServiceId,
      config: configData,
      appliesList: selectedAssets
    };
    console.log("1211..." + JSON.stringify(postData));

    this.appServicesSerive
      .postUpdateScriptDetails(postData)
      .subscribe((data) => {
        this.loadingScript = true;
        console.log('postUpdateScriptDetails:-', data);
        this.getScriptDetailsById(this.selectedServiceId, name);
      });
  }

  public cancelServiceConfig() {
    this.showScriptConfig = false;
    _.forEach(this.subscribedServices, (o) => {
      o.isSelected = false;
    });
  }

  public selectAllAssets(isChecked) {
    this.availableAssetdata = _.map(this.availableAssetdata, (element) => {
      return _.extend({}, element, { checked: isChecked });
    });
  }

  public getAllAssetsByUser() {
    this.appServicesSerive.getAllAssetsByUser()
      .subscribe(data => {
        this.availableAssetdata = data;
        if (this.availableAssetdata.status === 'success') {
          this.availableAssetdata = this.availableAssetdata.result;
        }
      });
  }
}
