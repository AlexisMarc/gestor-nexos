import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  export class Global_Services {
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
        return this.httpClient.get(this.config.endpoint3 + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this.config.key + '&residential_id=' + residential)
        
       }
  
      getListCampaignWhatsapp():Observable<any>{
        return this.httpClient.get(this.config.endpoint7 + 'management/api/messages/campaigns',{headers:this.header })
      }

      getReportDBUploaded(meeting_id: any){
        return this.httpClient.get(this.config.endpoint7 +'management/api/meeting/main/document/'+meeting_id,{headers:this.header })
      }
      
  
    }
  




