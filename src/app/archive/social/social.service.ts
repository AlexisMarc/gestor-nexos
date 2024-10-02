import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SocialService {
  
  constructor(private http: HttpClient) { }

  // Get social feed posts
  getFeed() {
    return this.http.get('assets/data/feed.json');
  }
}
