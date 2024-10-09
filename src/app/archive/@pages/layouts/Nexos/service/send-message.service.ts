import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { EnvServiceService } from '@env';

@Injectable({
  providedIn: 'root'
})
export class SendMessageService {
  private _env = inject(EnvServiceService)
  constructor(private httpClient: HttpClient,
    private config: ConfigurationRestService
  ) {
  }

  ngOnInit() { }

  sendMessage(dataMessage:any, keysession:any) {
    
    this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2+'api/chat/storemessage/' + keysession, dataMessage)
      .subscribe((data:any) => {
      });
  }
}