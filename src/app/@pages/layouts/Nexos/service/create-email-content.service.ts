import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { Router } from '@angular/router';
import swal, { SweetAlertType } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CreateEmailContentService {
  data: any;

  constructor(private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router) { }

  CreateTextEmail(createEmail) {
    this.httpClient.post(this.config.endpoint + 'QuoteServices/storeQuoteEmailContent', createEmail)
      .subscribe(data => {
        this.data = data;
        let iconStatus: SweetAlertType = 'success';
        let iconStatus2: SweetAlertType = 'warning';
        if (data['success'] === true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/textEmailList']);
          }
          swal.fire('Correcto', data['message'], iconStatus);
        } else {
          if (data['success']) {
            iconStatus2 = 'warning';

          }
          swal.fire('Incorrecto', data['message'], iconStatus2);
        }

      });
  }
  UpdateTextEmail(editEmail) {
    this.httpClient.post(this.config.endpoint + 'QuoteServices/storeQuoteEmailContent', editEmail)
      .subscribe(data => {
        this.data = data;
        let iconStatus: SweetAlertType = 'success';
        let iconStatus2: SweetAlertType = 'warning';
        if (data['success'] === true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/textEmailList']);

          }
          swal.fire('Correcto', data['message'], iconStatus);
        } else {
          if (data['success']) {
            iconStatus2 = 'warning';

          }
          swal.fire('Incorrecto', data['message'], iconStatus2);
        }
      });
  }

  createEmailContent(createEmailContent) {
    this.httpClient.post(this.config.endpoint3 + 'ApiEmailContent/createEmailContent', createEmailContent)
      .subscribe(data => {
        this.data = data;
        let iconStatus: SweetAlertType = 'success';
        let iconStatus2: SweetAlertType = 'warning';
        if (data['success'] === true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/emailIcloud']);

          }
          swal.fire('Correcto', data['message'], iconStatus);
        } else {
          if (data['success']) {
            iconStatus2 = 'warning';

          }
          swal.fire('Incorrecto', data['message'], iconStatus2);
        }
      });
  }

  editEmailContent(editEmailContent) {
    this.httpClient.post(this.config.endpoint3 + 'ApiEmailContent/createEmailContent', editEmailContent)
      .subscribe(data => {
        this.data = data;
        let iconStatus: SweetAlertType = 'success';
        let iconStatus2: SweetAlertType = 'warning';
        if (data['success'] === true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/emailIcloud']);

          }
          swal.fire('Correcto', data['message'], iconStatus);
        } else {
          if (data['success']) {
            iconStatus2 = 'warning';

          }
          swal.fire('Incorrecto', data['message'], iconStatus2);
        }
      });
  }
}
