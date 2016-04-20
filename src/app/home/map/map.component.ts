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
  
  constructor(public MapService: MapService) {

  }

  ngOnInit() {
    console.log('load map component');
    this.MapService.initMap();

    this.wazeData = this.MapService.getData();
    console.log(this.wazeData);
  }
}