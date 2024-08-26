import { Injectable } from '@angular/core';
import { ConfigurationRestService } from './configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  data: any;

  constructor(private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router) { }

  forgotPassword(datosforgotPassword:any) {
    this.httpClient.post(this.config.endpoint + 'UserServices/forgotPassword', datosforgotPassword)
      .subscribe((data:any) => {
        this.data = data;
        var iconStatus: SweetAlertIcon = 'success'
        var iconStatus2: SweetAlertIcon = 'warning'
        if (data['success'] == true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/'])
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
}