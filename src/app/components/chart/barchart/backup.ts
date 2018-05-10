import {
  Component,
  OnInit,
  OnChanges,
  Input
} from '@angular/core';
import {} from '@types/googlemaps';
@Component({
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})

export class MapComponent {
  @Input() private config: any;
  @Input() public mapdata: any;
	// @Input() public mapdata: any;
  @Input() public centers: any;
  public lat: number = 51.673858;
  public lng: number = 7.815982;
  public zoom: number = 5;
  public mapradius: number = 100;

  public origin;
  public destination;
  public waypoints = [];
  public length;

  public ngOnInit() {
    this.length = this.mapdata.length;
    let zoomLavel = 0;
    if(this.config) {
      zoomLavel = this.config.zoom;
    }
    this.zoom = zoomLavel || 5;
    if(this.centers) {
      this.lat = this.centers.lat;
      this.lng = this.centers.lng;
    } else {
      // console.log('mapdata 0000:-',this.mapdata);
      if(this.mapdata && this.mapdata.length >0 ) {
        const point = this.mapdata[0];
        this.lat = point.lat;
        this.lng = point.lng;
      }
    }
    _.forEach(this.mapdata ,(o)=>{
      if(!o){
        this.mapdata.splice(this.mapdata.indexOf(o),1);
      }
    });
    console.log('mapdata from map comp', this.mapdata);
  }


  public ngOnChanges() {
      _.forEach(this.mapdata ,(o)=>{
      if(!o){
        this.mapdata.splice(this.mapdata.indexOf(o),1);
      }
    });
    console.log('mapdata change:-',this.mapdata);
    if(this.mapdata && this.mapdata.length >0 ) {
        const point = this.mapdata[0];

        this.lat = point.lat;
        this.lng = point.lng;
      }
    if(this.mapdata && (this.mapdata.length > 0 && this.mapdata.length < 3)) {
        let x= this.mapdata.length;
        this.origin = {longitude: this.mapdata[0].lng , latitude: this.mapdata[0].lat};
        this.destination ={longitude: this.mapdata[x-1].lng , latitude: this.mapdata[x-1].lat};
      } else if(this.mapdata && this.mapdata.length >= 3) {
        let x = this.mapdata.length;
          this.origin = {longitude: this.mapdata[0].lng , latitude: this.mapdata[0].lat};
          for(let i=1;i<= this.mapdata.length -2; i++) {
            let ways = {
              location:new google.maps.LatLng(this.mapdata[i].lat,this.mapdata[i].lng),
              stopover:true
           }
           this.waypoints.push(ways);
          }

          this.destination = {longitude: this.mapdata[x-1].lng , latitude: this.mapdata[x-1].lat};

      }
  }

}