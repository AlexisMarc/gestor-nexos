import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { Router } from '@angular/router';
import swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SaveQuotationHistoryService {

  data: any;

  constructor(private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router) { }

  saveQuotation(datosQuotationHistory:any) {
    this.httpClient.post(this.config.endpoint + 'QuoteServices/setQuoteConfirmationMessage', datosQuotationHistory)
      .subscribe((data:any) => {
        this.data = data;
        var iconStatus: SweetAlertIcon = 'success'
        var iconStatus2: SweetAlertIcon = 'warning'
        if (data['success'] == true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/confirmquote'])

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

  saveQuotation2(datosQuotationHistory:any) {
    this.httpClient.post(this.config.endpoint + 'QuoteServices/setQuoteConfirmationMessage', datosQuotationHistory)
      .subscribe((data:any) => {
        this.data = data;
        var iconStatus: SweetAlertIcon = 'success'
        var iconStatus2: SweetAlertIcon = 'warning'
        if (data['success'] == true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/quote'])
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