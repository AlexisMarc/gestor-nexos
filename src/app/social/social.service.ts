import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SocialService {
  
  constructor(private http: HttpClient) { }

  // Get social feed posts
  getFeed() {
    return this.http.get('assets/data/feed.json');
  }
}
