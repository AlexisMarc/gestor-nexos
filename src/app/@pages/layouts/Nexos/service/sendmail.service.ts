import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { Router } from '@angular/router';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {
  token:any
  header:any

  constructor(private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router
  ) {
    this.token = JSON.parse((sessionStorage.getItem('user')!)).content.token
    this.header  = new HttpHeaders().set('authorization', `${this.token}`);
   }

  SendMailService(keysession:any, email_id:any, meeting_id:any) {
    this.httpClient.get(this.config.endpoint6 + 'api/emailcontent/send/' + keysession + '/' + email_id + '/' + meeting_id)
      .subscribe((data:any) => {
        var iconStatus: SweetAlertIcon = 'success';
        var iconStatus2: SweetAlertIcon = 'warning';
        if (data['success'] == true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/listResidentialBySenMail'])
          }
          swal.fire("Correcto", data['message'], iconStatus);
        }
        else {
          if (data['success']) {
            iconStatus2 = 'warning'
          }
          swal.fire("Incorrecto", data['message'], iconStatus2);
        }
      })
  }

  //Envio de emails uno a uno
  SendMailServiceByUnit(keysession:any, customer_id:any, meeting_id:any) {
    this.httpClient.get(this.config.endpoint6 + 'api/emailcontent/sendEmailToCustomer/' + keysession + '/' + customer_id + '/' + meeting_id)
      .subscribe((data:any) => {
        var iconStatus: SweetAlertIcon = 'success';
        var iconStatus2: SweetAlertIcon = 'warning';
        if (data['success'] == true) {
          if (data['success']) {
            iconStatus = 'success'
          }
          swal.fire("Correcto", data['message'], iconStatus);
        }
        else {
          if (data['success']) {
            iconStatus2 = 'warning'
          }
          swal.fire("Incorrecto", data['message'], iconStatus2);
        }
      });
  }

  getReportEmailMailgun(meeting:any):Observable<any>{
      return this.httpClient.get(this.config.endpoint7 + 'management/api/emails/mailgun/list/file/meeting/'+meeting,{headers:this.header })
  }
}
