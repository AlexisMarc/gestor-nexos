import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { Router } from '@angular/router';
import swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';
import { SaveQuotationHistoryService } from './save-quotation-history.service';
import { EnvServiceService } from '@env';

@Injectable({
  providedIn: 'root'
})
export class CreatecuoteService {
  private _env = inject(EnvServiceService)
  data: any;

  constructor(private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router,
    private saveQuotationHistoryService: SaveQuotationHistoryService) { }

  CreateQuote(dataQuote:any, user_id:any) {
    this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/storeQuote', dataQuote)
      .subscribe((data:any) => {
        this.data = data;
        var iconStatus: SweetAlertIcon = 'success'
        var iconStatus2: SweetAlertIcon = 'warning'
        if (data['success'] == true) {
          if (data['success']) {
            iconStatus = 'success'
          }
          window.open(data['document']);
          swal.fire({
            title: '<strong>Confirma la recepcion</strong>',
            icon: 'question',
            html:
              'Pregunta si el cliente recibio la cotizacion <br> <input type="text" id="d" value="" style="width: 100%;padding: 12px 20px;margin: 8px 0;display: inline-block;border: 1px solid #ccc;border-radius: 4px; box-sizing: border-box;">',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: 'rgba(255, 115, 0)',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Pendiente',
            confirmButtonText: 'Confirmado'
          }).then((result) => {
            if (result.value) {
              let texto = (<HTMLInputElement>document.getElementById("d")).value;
              const formData = new FormData();
              formData.append('key', this._env.SECRET_KEY);
              formData.append('user_id', user_id);
              formData.append('id', '0');
              formData.append('quote_id', data['quote_id']);
              formData.append('message', texto);
              formData.append('client_confirmed', '1');
              this.saveQuotationHistoryService.saveQuotation2(formData);
              this.router.navigate(['home/quote'])
            }
            else {
              let texto = (<HTMLInputElement>document.getElementById("d")).value;
              const formData = new FormData();
              formData.append('key', this._env.SECRET_KEY);
              formData.append('user_id', user_id);
              formData.append('id', '0');
              formData.append('quote_id', data['quote_id']);
              formData.append('message', texto);
              formData.append('client_confirmed', '0');
              this.saveQuotationHistoryService.saveQuotation2(formData);
              this.router.navigate(['home/quote'])
            }
          })
          //swal.fire("Correcto", data['message'] + ' y se ha enviado la cotizacion al correo', iconStatus);
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