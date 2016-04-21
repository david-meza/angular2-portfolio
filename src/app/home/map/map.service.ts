import {Injectable}       from 'angular2/core';
import {Http, Response, Headers, RequestOptions}   from 'angular2/http';
import {Observable}       from 'rxjs/Observable';

@Injectable()
export class MapService {
  
  constructor(private http: Http) {}

  private _wazeDataUrl = 'https://na-georss.waze.com/rtserver/web/TGeoRSS?tk=ccp_partner&ccp_partner_name=Raleigh&format=XML&types=traffic&polygon=-78.767853,35.825608;-78.848190,35.876254;-78.785019,35.914635;-78.680649,35.924645;-78.536453,35.878480;-78.497314,35.824494;-78.489761,35.753199;-78.572159,35.742611;-78.739700,35.741497;-78.771286,35.787184;-78.767853,35.825608';

  private _headers = new Headers({ 'Content-Type': 'application/json' });

  private _options = new RequestOptions({ headers: this._headers });

  getData(): Observable<any[]> {
    return this.http.get(this._wazeDataUrl, this._options)
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

      let georssLayer = new google.maps.KmlLayer({
        url: this._wazeDataUrl
      });
      georssLayer.setMap(map);
      
      setInterval(() => {
        georssLayer.setUrl(this._wazeDataUrl);
      }, 10000);

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
