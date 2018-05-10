import {
    Component,
    OnInit,
    ViewContainerRef
} from '@angular/core';
import {
	AssetDataService,
	LocalStorageService
} from '../../services';
import {
    AppKeys,
    mapIcons,
    GoogleAppKey
} from '../../constant';
import {
	RouteReplayLocation,
	RouteReplayStatus
} from '../../constant';
import { IMyDateModel, IMyOptions } from 'mydatepicker';
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
	RouteReplayLocationParse,
    RouteReplayEventsParse
} from '../../parser';


@Component({
  selector: 'routeReplay-comp',
  providers: [ AssetDataService ],
  templateUrl: './routeReplay.component.html',
  styleUrls: ['./routeReplay.component.css']
})
export class RouteReplayComponent implements OnInit{
    public eventData;
	public startDate;
    public endDate;
    public guid;
    public maplist;
    public tableData;
    public assetUrl;
    public assetName;
    public assetSerialNo;
    public currentMapData;
    public mapdata = [];
    public config = { zoom: 13 };
    public currentLocation;
    public centerlist;
    public routeReplay;
    public modalDisplay;
    public myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd-mm-yyyy',
        showTodayBtn: true
    };
    public startInput;
    constructor(
	private localStorageService: LocalStorageService,
	public assetDataService : AssetDataService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
	){
        const currentAssetId = this.localStorageService.get('currentAssetId');
        this.assetUrl = '#asset/' + currentAssetId;
        this.toastr.setRootViewContainerRef(vcr);
	}

    public ngOnInit() {
      //  this.loading = true;
        this.assetName = this.localStorageService.get('currentAssetLocation').name;
        const assetData = this.localStorageService.get('currentAssetLocation');
        this.assetSerialNo = this.localStorageService.get('currentSerialNumber');
       // console.log("Asset Serial  Name---------------------",this.assetSerialNo);
        //set default date
        this.startInput= { date: { year: moment().year(), month: moment().month()+1, day: moment().date() } };
        this.startDate= (moment.utc().startOf('day').unix()) * 1000;
        this.endDate = moment.utc(this.startDate).add(23,'h').add(59,'m').add(59,'s').unix() * 1000;
        //set google maps defaults
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
                iconUrl:mapIcons.locationIcon
              };
              this.currentMapData = point;
              this.mapdata.push(point);
              this.maplist = this.mapdata; 
             // console.log('maplist in routereplay', this.maplist);
              this.getRoute();
            });
    }

	public onDateChanged(event: IMyDateModel, dateType: string) {
		this.startDate = moment.utc(event.formatted, 'DD-MM-YYYY').unix() * 1000;
		this.endDate = moment.utc(this.startDate).add(23,'h').add(59,'m').add(59,'s').unix() * 1000;
	}
    public closeModal() {
        this.modalDisplay = true;
        // console.log('close modal', this.modalDisplay);
  }

	public getRoute() {
        // this.modalDisplay = true;
		const mainAppId = AppKeys.main;
        //console.log("set button click");
		this.guid = this.localStorageService.get('currentAssetId');
		const apiurlLocation = RouteReplayLocation +'?appId='+mainAppId;
        const apiurlStatus = RouteReplayStatus +'?appId='+mainAppId;
		const payload = {
			"guids": [ this.guid ],
			"filters": [{
                "time": [
    			{ "gte": this.startDate },
    			{ "lte": this.endDate },
    			{ "op": "&" }
    			]
               }]
		};
        if(payload) {
            //console.log('payload in routereplay is:--', payload);
        }
        
		let mapList = [];
		let statusData = [];
        if(this.currentMapData !== undefined) {
            mapList.push(this.currentMapData);
        }
		this.assetDataService
            .getAssetData(apiurlLocation, payload)
            .subscribe((id) => {
               
            	const response = RouteReplayLocationParse(id);
              //  console.log('response from parser location', response);
            	if(response){
            		_.forEach(response,(items)=>{
                        let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+items.lat+','+items.lng+'&key='+GoogleAppKey;
                        this.assetDataService
                        .getLocation(url)
                        .subscribe((data:any) => {                    
                          let dataItemLocation = data[0].formatted_address;
                    		mapList.push({
                                name : 'DI',
                    			lat : items.lat,
                    			lng : items.lng,
                    			time : new Date(items.time),
                                op : items.op,
                                ct : items.ct,
                                eb : items.eb,
                                speed : items.speed,
                    			iconUrl : mapIcons.dataitems,
                                zoom : 10,
                                zindex: 1,
                                location: dataItemLocation
                        
                        //draggable:true
                    });
                });
            		});

                    if(mapList != undefined && mapList.length > 0) {

                        for(let i=1;i<mapList.length;i++) {
                            if(mapList[i].lat !== undefined && mapList[i].lng !== undefined) {
                                this.centerlist = mapList[i];
                                break;
                            }
                        }
                      //  console.log('centers are in routereplay',this.centerlist);
                    } else { this.toastr.info('Data Items not available for the selected Date');}
            	}
            });
            this.assetDataService
            .getAssetData(apiurlStatus, payload)
            .subscribe((id) => {
                const response = RouteReplayEventsParse(id);
              //  console.log('response from event parse', response);
                if(response){
                    _.forEach( response, ( items, key ) => {
                        if(items.lat !== 0 && items.lng !== 0) {
                            let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+items.lat+','+items.lng+'&key='+GoogleAppKey;
                        this.assetDataService
                        .getLocation(url)
                        .subscribe((data:any) => {                    
                          let EventLocation = data[0].formatted_address;
                           mapList.push({
                            name:'EVENTS',
                            lat : items.lat,
                            lng : items.lng,
                            time : new Date(items.time),
                            eventName : items.name,
                            eventValue : items.value,
                            iconUrl : mapIcons.red,
                            zoom: 10,
                            zindex: 2,
                            location: EventLocation
                           // draggable:true
                        });
                       });
                        }
                        let date = new Date(items.time);
                        let time = date.toLocaleTimeString();
                        statusData.push({
                            key : key + 1, 
                            time : new Date(items.time), 
                            status : items.name ,
                            value: items.value
                        });
                    });
                    if(mapList != undefined && mapList.length > 0) {
                        for(let i=1;i<mapList.length;i++) {
                            if(mapList[i].lat !== undefined && mapList[i].lng !== undefined) {
                                this.centerlist = mapList[i];
                                break;
                            }
                        }
                       // console.log('centers are in routereplay',this.centerlist);
                    } else {
                        this.toastr.info('Events not available for the selected Date');
                    }
                }
            });
         //  console.log('maplist before', mapList);
           /* if(mapList !== undefined || mapList.length >= 2) {
                //console.log('inside',mapList);
                for(let i=1;i < mapList.length ; i++) {
                    for(let j=i+1;j < mapList.length; j++) {
                       if(j>i) {
                          if(mapList[i].name === 'DI') {
                            if(mapList[j].name === 'EVENTS') {
                               if((mapList[i].lat === mapList[j].lat) && (mapList[i].lng === mapList[j].lng)) {
                                   mapList.splice(i,1);
                               }
                            }  else {break;}
                        } else {break;}  
                      } else {break;}
                       
                    }   
                }
           }*/

           
          // console.log('maplist after',mapList);
            this.maplist = mapList;
            this.routeReplay = this.maplist;
          //console.log("routereplay data-----",this.routeReplay);
            /*?*/
            this.tableData = statusData;
        }
    }
