import {Injectable}       from 'angular2/core';
import {Http, Response}   from 'angular2/http';
import {Observable}       from 'rxjs/Observable';

@Injectable()
export class MapService {
  
  constructor(private http: Http) {}

  private _wazeDataUrl = '/assets/data.json';

  getData(): Observable<any[]> {
    console.log('Map#getData(): Get Data');
    return this.http.get(this._wazeDataUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
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

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.jams || [];
  }

  private handleError(error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
