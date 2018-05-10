import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Directive,  Input} from '@angular/core';
import { LocalStorageService } from '../services';
declare let google: any;

@Directive({
  selector: 'sebm-google-map-directions',
  providers: [ LocalStorageService ]
})
export class DirectionsMapDirective {
  public duration;
  public directionsDisplay:any;
  @Input() origin:any;
  @Input() destination:any;
  @Input() waypoints:any;
  public totalTime = 0;
  constructor (
    private localStorageService: LocalStorageService,
    private gmapsApi: GoogleMapsAPIWrapper
    ) {}
  // ngOnInit() {
  //   this.mapupdate();
  // }
  ngOnChanges(){
    this.mapupdate();
  }
  public mapupdate(){
    this.gmapsApi.getNativeMap().then(map => {
              var directionsService = new google.maps.DirectionsService;
              this.directionsDisplay = new google.maps.DirectionsRenderer;
              this.directionsDisplay.setMap(map);
              directionsService.route({
                      origin: {lat: this.origin.latitude, lng: this.origin.longitude},
                      destination: {lat: this.destination.latitude, lng: this.destination.longitude},
                      waypoints: this.waypoints,
                      optimizeWaypoints: false,
                      travelMode: 'DRIVING'
                    }, (response, status) => {
                                if (status === 'OK') {
                                    console.log('response from google directions',response);
                                    this.directionsDisplay.setDirections(response);
                                    this.duration = response.routes[0].legs;
                                    console.log('this duration',this.duration);
                                        this.totalTime = 0;
                                        _.forEach(this.duration,(i) => {
                                        console.log('duration value',i.duration.value);
                                        this.totalTime += i.duration.value; 
                                          // this.totalTime.push(i.duration);
                                      });
                                        this.localStorageService.set('DistanceTime',this.totalTime);
                                    // this.localStorageService.set('DistanceTime',{duration: this.duration.duration});
                                } else {
                                  window.alert('Directions request failed due to ' + status);
                                }
              });

    });
  }
}