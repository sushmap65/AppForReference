import {
Component,
OnInit,
OnChanges,
NgZone,
ElementRef,
NgModule,
QueryList,
ViewChildren,
ViewChild
} from '@angular/core';
import {
FormControl,
FormsModule,
ReactiveFormsModule,
FormBuilder,
FormGroup
} from "@angular/forms";
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import * as _ from 'lodash';
import { AssetDataService, LocalStorageService } from '../../services';
import { BrowserModule } from "@angular/platform-browser";
import {
AppKeys,
ENVIRONMENT,
GoogleAppKey,
GoogleDistanceApi,
GetHealthAlertByIds

} from '../../constant';
import { dataHelper } from '../../data';
import * as moment from 'moment';
import {
  toCamelCase,
  CamelCaseToNormalString
} from '../../helper';
//import {} from 'googlemaps';
import { DirectionsMapDirective } from '../../map';
import {
AgmCoreModule,
MapsAPILoader,
GoogleMapsAPIWrapper
} from 'angular2-google-maps/core';
import {} from '@types/googlemaps';
@Component({
  selector: 'eta-comp',
  providers: [ AssetDataService, LocalStorageService, GoogleMapsAPIWrapper, DirectionsMapDirective ],  
  templateUrl: './eta.component.html',
  styleUrls: ['./eta.component.css'],


})
    export class EtaComponent implements OnInit {
    public currentLocation: string;
    public lastReported;
    public location;
    public assetUrl;
    public assetName;
    public assetSerialNo;
    public mapList = [];
    public distance;
    public address : Object;
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;
    public point;
    public estimatedTime;
    public distanceTime;
    public mapdata;
    public assetMapdata;
    public clicked;
    public directionsService;
    public directionsDisplay;
    public defaultTravelTime;
    public points = new Array(5).fill(0);
    @ViewChild('search1')
    public searchElementRef1: ElementRef;
    @ViewChild('search2') 
    public searchElementRef2: ElementRef;
    @ViewChild('search3')
    public searchElementRef3: ElementRef;
    @ViewChild('search4')
    public searchElementRef4: ElementRef;
    @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;

        constructor(
        public localStorageService: LocalStorageService,
        public assetDataService: AssetDataService,
        private mapsAPILoader: MapsAPILoader,
            private ngZone: NgZone,
            private fb: FormBuilder,
            private gmapsApi: GoogleMapsAPIWrapper,
            ){}
        public ngOnInit() {
        this.assetName = this.localStorageService.get('currentAssetLocation').name;
        this.assetSerialNo = this.localStorageService.get('currentSerialNumber');
        console.log("Asset Serial  Name---------------------",this.assetSerialNo);
        const assetData = this.localStorageService.get('currentAssetLocation');
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsService = new google.maps.DirectionsService;
        const currentAssetId =
        this.localStorageService.get('currentAssetId');
        this.assetUrl = '#asset/' + currentAssetId;
        this.searchControl = new FormControl();
        this.defaultTravelTime = {durationcurrentAssetLocation: [{duration: {text: "0 mins", value: 0}}]};
        this.localStorageService.set('DistanceTime', this.defaultTravelTime);
        this.assetMapdata = this.localStorageService.get('currentAssetLocation');
        if(this.assetMapdata.LastUpdatedStatus !== '') {
          this.lastReported = new Date(this.assetMapdata.LastUpdatedStatus);
        } else {
          this.lastReported = 'No Last Reported Time Available';
        }
        if(this.assetMapdata.lat !== '' && this.assetMapdata.lng !== ''){
          let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.assetMapdata.lat+','+this.assetMapdata.lng+'&key=AIzaSyB_APIgbjs7IUrqq3ULqj1ykxSY1w2sJIk';
        this.assetDataService
        .getLocation(url)
        .subscribe((data:any) => {
        this.currentLocation = data[0].formatted_address;
        });

        } else{
          this.currentLocation = 'No Current Location Available';
        }

        
        this.points[0] = this.assetMapdata;
        this.mapList.push(this.assetMapdata);
        this.mapsAPILoader.load().then(() => {
          let autocomplete1 = new google.maps.places.Autocomplete(this.searchElementRef1.nativeElement, {
            types: ["address"]
              });
          let autocomplete2 = new google.maps.places.Autocomplete(this.searchElementRef2.nativeElement, {
            types: ["address"]
              });
          let autocomplete3 = new google.maps.places.Autocomplete(this.searchElementRef3.nativeElement, {
            types: ["address"]
              });
          let autocomplete4 = new google.maps.places.Autocomplete(this.searchElementRef4.nativeElement, {
            types: ["address"]
              });
            this.setupPlaceChangedListener(autocomplete1,1);
            this.setupPlaceChangedListener(autocomplete2,2);
            this.setupPlaceChangedListener(autocomplete3,3);
            this.setupPlaceChangedListener(autocomplete4,4);
            });
        }
                  public setupPlaceChangedListener(autocomplete: any, id) {
                  autocomplete.addListener("place_changed", () => {
                          this.ngZone.run(() => {
                            //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    console.log('place',place);
                    if (place.geometry === undefined || place.geometry === null) {
                    this.points[id] = null;
                      return;
                    }
                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                    this.point = {
                    lat: this.latitude,
                    lng: this.longitude,
                    zoom: this.zoom
                    }
                    console.log('point',this.point);
                    this.points[id] = this.point;
                      const newMapData = [];
            _.forEach(this.points,(o)=>{
                if(o){
                newMapData.push(o);
                }
             })
               this.mapdata = newMapData;
                          // this.mapdata = null;
                          // this.points.fill(0);
          
                  });
          });
          }


      public navigate() {
      this.clicked = true;
      this.distanceTime = this.localStorageService.get('DistanceTime');
      this.estimatedTime = this.timeCalculation(this.distanceTime);
      }
      public ClearPlaces(){
      this.localStorageService.set('DistanceTime',this.defaultTravelTime);
      this.estimatedTime = '';
      this.mapdata = null;
      this.points.fill(0);
      this.points[0] = this.assetMapdata;
      this.searchControl.reset();
      }
      public timeCalculation(duration) {
      let times = {
          year: 31557600,
          month: 2629746,
          day: 86400,
          hour: 3600,
          minute: 60,
          second: 1
      };
      let seconds = 0;
      seconds = duration;
      console.log('total seconds',seconds);
      let time_string: string = '';
              let plural: string = '';
              for(var key in times){
                  if(Math.floor(seconds / times[key]) > 0){
                      if(Math.floor(seconds / times[key]) >1 ){
                          plural = 's';
                      }
                      else{
                          plural = '';
                      }
                      time_string += Math.floor(seconds / times[key]).toString() + ' ' + key.toString() + plural + ' ';
                      seconds = seconds - times[key] * Math.floor(seconds / times[key]);
                  }
              }
              console.log('time string is:----',time_string);
              return time_string;
  }      
  }