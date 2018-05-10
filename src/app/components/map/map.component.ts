import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {} from '@types/googlemaps';
import { GoogleMarkerService, AssetDataService } from '../../services';

@Component({
  selector: 'map',
  providers: [ GoogleMarkerService, AssetDataService ],
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})

export class MapComponent {
  @Input() private config: any;
  @Input() public direction: any;
  @Input() public mapdata: any;
  @Input() public centers: any;
  @Output() public updatedLocation: EventEmitter <any> = new EventEmitter();
  public lat: number = 51.673858;
  public lng: number = 7.815982;
  public zoom: number = 5;
  public mapradius: number = 100;
  public origin;
  public destination;
  public waypoints = [];
  public length;
  public markerLocation;
  constructor(public googleMarkerService: GoogleMarkerService,
               public assetDataService: AssetDataService){}
  public ngOnInit() {
    this.getCenterPoint();
  }
  public ngOnChanges() {
    // this.length = this.direction.length;
    this.getCenterPoint();
    if(!this.direction){
      this.origin = null;
      this.destination = null;
      this.waypoints =null;
    }
    else if(this.direction && this.direction.length >1) { // else can be removed
        for (var i = this.direction.length -1; i > 0; i--) {
          if(!this.direction[i]){
            this.direction.splice(i,1);
          }
        }
        this.origin = {longitude: this.direction[0].lng , latitude: this.direction[0].lat};
        this.destination = {longitude: this.direction[this.direction.length-1].lng , latitude: this.direction[this.direction.length-1].lat};
      } 
          if(this.direction && this.direction.length >2) {
            this.waypoints = [];
            for (var i = 1; i < this.direction.length -1; i++) {
            let ways = {
              location:new google.maps.LatLng(this.direction[i].lat,this.direction[i].lng),
              stopover:true
           }
            this.waypoints.push(ways);
          }
        }
  }
    public getCenterPoint() {
    let zoomLavel = 0;
    if(this.config) {
      zoomLavel = this.config.zoom;
    }
    this.zoom = zoomLavel || 5;
    if(this.centers) {
    //  console.log('centers are', this.centers);
      this.lat = this.centers.lat;
      this.lng = this.centers.lng;
    } else {
      if(this.mapdata && this.mapdata.length >0 ) {
        const point = this.mapdata[0];
        this.lat = point.lat;
        this.lng = point.lng;
      }
    }
  }
markerDragEnd(map,pos){
 // console.log('marker drag', map ,pos);
    this.geocodePosition(map,pos);
};

public geocodePosition(map,pos) 
{ 
  const lat = pos.coords.lat;
  const lng = pos.coords.lng;
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyB_APIgbjs7IUrqq3ULqj1ykxSY1w2sJIk';
    this.assetDataService
    .getLocation(url)
    .subscribe((data:any) => {
      if(data[0]){
      this.markerLocation = data[0].formatted_address;
      const newLocation = { lat: lat, 
                            lng: lng, 
                            location: this.markerLocation, 
                            draggable:true,
                            animation: google.maps.Animation.DROP,
                            guid: map.guid || ''
                          };
      this.updatedLocation.emit(newLocation);
    }
    });
}
}