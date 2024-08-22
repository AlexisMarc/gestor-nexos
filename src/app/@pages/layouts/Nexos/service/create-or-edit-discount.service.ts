import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { Router } from '@angular/router';
import swal, { SweetAlertType } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CreateOrEditDiscountService {

  data: any;

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router
  ) { }

  CreatetDiscount(createDiscount) {
    this.httpClient.post(this.config.endpoint + 'QuoteServices/createOrEditDiscount', createDiscount)
      .subscribe(data => {
        this.data = data;
        var iconStatus: SweetAlertType = 'success'
        var iconStatus2: SweetAlertType = 'warning'
        if (data['success'] == true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/Promotionlist'])
          }
          swal.fire("Correcto", data['message'], iconStatus);
        }
        else {
          if (data['success']) {
            iconStatus2 = 'warning'
          }
          swal.fire("Incorrecto", data['message'], iconStatus2);
        }
        'Error'
      })
  }

  EditDiscount(updateDiscount) {
    this.httpClient.post(this.config.endpoint + 'QuoteServices/createOrEditDiscount', updateDiscount)
      .subscribe(data => {
        this.data = data;
        var iconStatus: SweetAlertType = 'success'
        var iconStatus2: SweetAlertType = 'warning'
        if (data['success'] == true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/Promotionlist'])

          }
          swal.fire("Correcto", data['message'], iconStatus);
        }
        else {
          if (data['success']) {
            iconStatus2 = 'warning'

          }
          swal.fire("Incorrecto", data['message'], iconStatus2);
        }
        'Error'
      })
  }
}