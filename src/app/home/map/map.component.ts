import {Component} from 'angular2/core';
import {MapService} from './map.service';


@Component({
  selector: 'map',
  template: '<div id="map"></div>',
  styles: [`
    #map {
      height: 500px;
    }
  `],
  providers: [MapService]
})
export class Map {
  
  public wazeData;

  errorMessage: string;
  jams: any[];
  
  constructor(public MapService: MapService) {

  }

  ngOnInit() {
    console.log('load map component');
    this.MapService.initMap();

    this.MapService.getData()
                   .subscribe(
                     jams => this.jams = jams,
                     error => this.errorMessage = <any>error);
    
  }
}