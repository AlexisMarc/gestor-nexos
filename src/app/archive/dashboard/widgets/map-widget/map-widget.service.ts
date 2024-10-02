import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MapWidgetService {

  constructor(private http: HttpClient) { }

  getMapData() {
    return this.http.get('assets/data/map.json');
  }
}
