import {
    Component,
    OnInit,
    NgZone,
    ElementRef,
    NgModule,
    ViewChild
} from '@angular/core';
import * as _ from 'lodash';
import { AssetDataService, LocalStorageService } from '../../services';
import { dataHelper } from '../../data';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    FormBuilder,
    FormGroup
} from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {} from '@types/googlemaps';
import {
    MapsAPILoader,
    AgmCoreModule,
    GoogleMapsAPIWrapper
} from 'angular2-google-maps/core';
import { ENVIRONMENT,
        AppKeys,
        NearByDealers,
        mapIcons,
        GoogleAppKey
} from '../../constant';
@Component({
  selector: 'eta-comp',
  providers: [
  LocalStorageService,
  GoogleMapsAPIWrapper,
  AssetDataService
  ],
  templateUrl: './sos.component.html',
  styleUrls: ['./sos.component.css']
})
export class SosComponent implements OnInit{
    public mapData;
    public maplist = [];
    public latitude: number;
    public longitude: number;
    public zoom: number;
    public dealerDetails;
    public currentLocation;
    public assetUrl;
    public assetName;
    public assetSerialNo;
    public config = { zoom: 10 };
    public dealerData;
    public errorData;
    public modalDisplay;
    public radius = 100;
    public MarkerLocation; //default value
    constructor(
        private localStorageService: LocalStorageService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        public assetDataService: AssetDataService
        ){}
    public ngOnInit() {
        const currentAssetId = this.localStorageService.get('currentAssetId');
        this.assetSerialNo = this.localStorageService.get('currentSerialNumber');
      //  console.log("Asset Serial  Name---------------------",this.assetSerialNo);
        const assetData = this.localStorageService.get('currentAssetLocation');
        this.assetName = assetData.name;
        //set google maps defaults
        this.assetUrl = '#asset/' + currentAssetId;
        if(assetData.lat !== '' && assetData.lng !== '') {
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+assetData.lat+','+assetData.lng+'&key='+GoogleAppKey;
            this.assetDataService
            .getLocation(url)
            .subscribe((data:any) => {
              this.currentLocation = data[0].formatted_address;
              let point = {
                lat: assetData.lat,
                lng: assetData.lng,
                IMEI: assetData.name,
                location: this.currentLocation,
                draggable:true,
                animation: google.maps.Animation.DROP,
                iconUrl:mapIcons.locationIcon
              };
              this.maplist.push(point);
              this.mapData = this.maplist; 
              this.searchLocation();
            });
          } else {
            this.currentLocation = "No Current Location Available";
          }              // this.searchLocation(); // async operation
    }

    public searchLocation() {
      // this.mapData = this.maplist;
      let getNearByDealers = NearByDealers + '?appId=' +AppKeys.main;
      if ( ENVIRONMENT === 'local') {
           getNearByDealers = NearByDealers;
        }
      const marker = this.MarkerLocation || this.maplist[0] || 'Delhi';// default delhi
      const payload = {
          longitude: marker.lng,
          latitude: marker.lat,
          radius: Number(this.radius)
        }
      this.dealerData =[];
      this.dealerData.push(marker);
      this.assetDataService
      .getNearDealers(getNearByDealers, payload)
      .subscribe((data: any) => {
          this.errorData = undefined;
          _.forEach(data, (i) => {
              let location;
              let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+i.latitude+','+i.longitude+'&key='+GoogleAppKey;
              this.assetDataService
              .getLocation(url)
              .subscribe((data:any) => {
                location = data[0].formatted_address;
                this.dealerDetails = {
                lat: i.latitude,
                lng: i.longitude,
                dealerName: i.service_station_name,
                iconUrl: mapIcons.dealer,
                location: location,
                }
                this.dealerData.push(this.dealerDetails);
              });  
          });
          // could be commented
          this.config.zoom = 10;
          this.config.zoom -= Math.floor(this.radius/500); // focus the map according to radius
          // console.log('this zoom',this.config.zoom);
          this.mapData = this.dealerData;
         /// console.log('mapdata from sos',this.mapData);
          
      },(error) => {
        this.mapData = this.dealerData;
       // console.log('map data is:---', this.mapData);
        this.modalDisplay = false;
        this.errorData = error._body;
      });
    }

    public closeModal() {
      this.modalDisplay = true;
  }

  public onUpdatedLocation(event){
    this.MarkerLocation = event;
    this.searchLocation();
  }
}
