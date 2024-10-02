import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GraphTileWidgetService {

  constructor(private http: HttpClient) { }

  // Get all data from the API
  getChartSampleData() {
    return this.http.get('assets/data/charts.json')
  }
}
