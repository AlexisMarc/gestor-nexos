import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvServiceService } from '@env';


@Injectable({
    providedIn: 'root'
  })
  export class Global_Services {
    private _env = inject(EnvServiceService)
    token:any
    header:any
  
    constructor(
      private httpClient: HttpClient,
      private config: ConfigurationRestService
    ) 
      {
          this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
          this.header  = new HttpHeaders().set('authorization', `${this.token}`);
      }
  
       getMeetingDetails(residential: any):Observable<any>{
        return this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this._env.SECRET_KEY + '&residential_id=' + residential)
        
       }
  
      getListCampaignWhatsapp():Observable<any>{
        return this.httpClient.get(this._env.ENDPOINT_TERTITARY + 'management/api/messages/campaigns',{headers:this.header })
      }

      getReportDBUploaded(meeting_id: any){
        return this.httpClient.get(this._env.ENDPOINT_TERTITARY +'management/api/meeting/main/document/'+meeting_id,{headers:this.header })
      }
      
  
    }
  




