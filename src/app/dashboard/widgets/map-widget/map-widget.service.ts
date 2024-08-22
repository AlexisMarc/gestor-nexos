import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class MapWidgetService {

  constructor(private http: HttpClient) { }

  getMapData() {
    return this.http.get('assets/data/map.json');
  }
}
