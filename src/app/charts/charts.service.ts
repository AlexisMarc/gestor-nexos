import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChartService {

  constructor(private http: HttpClient) { }

  // Get all data from the API
  getChartSampleData() {
    return this.http.get('assets/data/charts.json')
  }
}
