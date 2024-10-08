import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvServiceService } from '@env';


@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  private _env = inject(EnvServiceService)
  token:any
  header:any

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService
  ) 
    {}

    

    //este es un servicio que valida el TOKEN //
    postValidateNexosToken():Observable<any>{
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
      return this.httpClient.post(this._env.ENDPOINT_TERTITARY+'management/api/users/validate/session',{'hola':0},{headers:this.header })
    }

     getSettingFace():Observable<any>{
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
        return this.httpClient.get(this._env.ENDPOINT_TERTITARY + 'management/api/facebook/settings',{headers:this.header })
    }

    postSettingFace(data:any):Observable<any>{
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
      return this.httpClient.post(this._env.ENDPOINT_TERTITARY + 'management/api/facebook/settings/save',data,{headers:this.header })
    }

    postFormToConfigPhones(data:any):Observable<any>{
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
      return this.httpClient.post(this._env.ENDPOINT_TERTITARY + 'management/api/facebook/numbers/save',data,{headers:this.header })
    }

    getListNumberWhatsapp():Observable<any>{
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
      return this.httpClient.get(this._env.ENDPOINT_TERTITARY + 'management/api/facebook/numbers',{headers:this.header })
    }

    postSaveCampaignWhatsapp(data:any):Observable<any>{
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
      return this.httpClient.post(this._env.ENDPOINT_TERTITARY + 'management/api/messages/campaigns/save',data,{headers:this.header })
    }

    getListCampaignWhatsapp():Observable<any>{
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
      return this.httpClient.get(this._env.ENDPOINT_TERTITARY + 'management/api/messages/campaigns',{headers:this.header })
    }

    postSendCampaignWhatsapp(data:any):Observable<any>{
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
      return this.httpClient.post(this._env.ENDPOINT_TERTITARY + 'management/api/messages/campaigns/send',data,{headers:this.header })
    }

    initialDataLoad(){
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
      return this.httpClient.get(this._env.ENDPOINT_TERTITARY+'management/api/whatsapp/messages',{headers:this.header})
     }

     postSendMessageToClient(data:any)
     {
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
      return this.httpClient.post(this._env.ENDPOINT_TERTITARY+'management/api/whatsapp/message/send',data,{headers:this.header})
     }

     getCountry(){
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
      return this.httpClient.get(this._env.ENDPOINT_TERTITARY+'management/api/countries/list')
     }
    
     getBuilding(meeting_id:any){
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
      return this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2+'api/units/getBuildingsUnitByUserByMeeting/'+ this.token + '/' + meeting_id)
     }

     postDataByDocumentOrPhone(data:any){
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
      return this.httpClient.post(this._env.ENDPOINT_TERTITARY+'management/api/public/customer/data',data,{headers:this.header})
     }

     postRegisterUserWithWhatsapp(data:any){
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
      return this.httpClient.post(this._env.ENDPOINT_TERTITARY+'management/api/voting/customer/register',data,{headers:this.header})
     }

     postReSendWhatsapp(data:any){
      this.token = JSON.parse((JSON.parse(sessionStorage.getItem('user')!)!)).content.token
      this.header  = new HttpHeaders().set('Authorization', `${this.token}`);
      return this.httpClient.post(this._env.ENDPOINT_TERTITARY+'management/api/voting/whatsapp/resend',data,{headers:this.header})
     }

  }
