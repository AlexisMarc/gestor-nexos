import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';

@Injectable({
  providedIn: 'root'
})
export class SendMessageService {

  constructor(private httpClient: HttpClient,
    private config: ConfigurationRestService
  ) {
  }

  ngOnInit() { }

  sendMessage(dataMessage, keysession) {
    
    this.httpClient.post(this.config.endpoint6+'api/chat/storemessage/' + keysession, dataMessage)
      .subscribe(data => {
      });
  }
}