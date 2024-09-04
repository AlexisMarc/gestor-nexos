import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EmailService {

  constructor(private http: HttpClient) { }

  // Get all emails from the API
  getEmails() {
    return this.http.get('assets/data/email.json')
  }
}
