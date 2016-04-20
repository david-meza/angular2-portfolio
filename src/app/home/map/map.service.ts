import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class MapService {
  
  constructor(public http: Http) {

  }

  getData() {
    console.log('Map#getData(): Get Data');
    return this.http.get('/assets/data.json').map(res => res.json());
  }

  initMap() {
    this._googleIsReady().then(google => {
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 35.785, lng: -78.646 }
      });

      let trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);

    });
  }

  _googleIsReady() {
    return Promise.resolve(window.google);
  }

}
