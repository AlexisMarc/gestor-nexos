import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class IconsService {

  constructor(private http: HttpClient) { }

  // Get all posts from the API
  getFontAwesome() {
    return this.http.get('assets/data/fontawesome.json')
  }
}
