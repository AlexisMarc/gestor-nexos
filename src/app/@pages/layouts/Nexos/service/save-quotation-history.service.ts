import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { Router } from '@angular/router';
import swal, { SweetAlertType } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SaveQuotationHistoryService {

  data: any;

  constructor(private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router) { }

  saveQuotation(datosQuotationHistory) {
    this.httpClient.post(this.config.endpoint + 'QuoteServices/setQuoteConfirmationMessage', datosQuotationHistory)
      .subscribe(data => {
        this.data = data;
        var iconStatus: SweetAlertType = 'success'
        var iconStatus2: SweetAlertType = 'warning'
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

  saveQuotation2(datosQuotationHistory) {
    this.httpClient.post(this.config.endpoint + 'QuoteServices/setQuoteConfirmationMessage', datosQuotationHistory)
      .subscribe(data => {
        this.data = data;
        var iconStatus: SweetAlertType = 'success'
        var iconStatus2: SweetAlertType = 'warning'
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