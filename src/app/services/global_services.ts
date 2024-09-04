import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration_rest_service';
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
    ) 
      {
          this.token = 'qedCq5226MlzFLcgeSm31Sm1oWiQkjrzQZUs5tSz1nPeGq7JKPOIjB1paDop'
          this.header  = new HttpHeaders().set('authorization', `${this.token}`);
      }

    getMeetingDetails():Observable<any>{
    let residential ='1470'
    return this.httpClient.get('https://apiservices.grupogift.com/app-preregistro/PreRegisterMeetingServices/getMeetingDetails?key=GiUBniR9UtmfKDaeOc9tXKt16lk=&residential_id='+residential)
   }

   initialDataLoad(){
    return this.httpClient.get('https://apiservices.grupogift.com/management/api/whatsapp/messages',{headers:this.header})
   }
    }
  