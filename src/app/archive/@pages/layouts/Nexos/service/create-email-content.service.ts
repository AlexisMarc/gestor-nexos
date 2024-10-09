import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { Router } from '@angular/router';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { EnvServiceService } from '@env';

@Injectable({
  providedIn: 'root'
})
export class CreateEmailContentService {
  private _env = inject(EnvServiceService)
  data: any;

  constructor(private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router) { }

  CreateTextEmail(createEmail:any) {
    this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/storeQuoteEmailContent', createEmail)
      .subscribe((data:any) => {
        this.data = data;
        let iconStatus: SweetAlertIcon = 'success';
        let iconStatus2: SweetAlertIcon = 'warning';
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
  UpdateTextEmail(editEmail:any) {
    this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/storeQuoteEmailContent', editEmail)
      .subscribe((data:any) => {
        this.data = data;
        let iconStatus: SweetAlertIcon = 'success';
        let iconStatus2: SweetAlertIcon = 'warning';
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

  createEmailContent(createEmailContent:any) {
    this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'ApiEmailContent/createEmailContent', createEmailContent)
      .subscribe((data:any) => {
        this.data = data;
        let iconStatus: SweetAlertIcon = 'success';
        let iconStatus2: SweetAlertIcon = 'warning';
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

  editEmailContent(editEmailContent:any) {
    this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'ApiEmailContent/createEmailContent', editEmailContent)
      .subscribe((data:any) => {
        this.data = data;
        let iconStatus: SweetAlertIcon = 'success';
        let iconStatus2: SweetAlertIcon = 'warning';
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
