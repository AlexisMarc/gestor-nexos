import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { EnvServiceService } from '@env';

@Injectable({
  providedIn: 'root'
})
export class AddSupportCalledService {
  private _env = inject(EnvServiceService)

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
  ) { }

  addSupportCallReport(CalledData:any) {
    var iconStatus: SweetAlertIcon = 'error'
    iconStatus = 'success';

    this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'UtilServices/storePhoneCallRecord', CalledData).subscribe((resp:any) => {
      if (resp['success'] === true) {
        swal.fire("Mensaje", 'Se ha guardado correctamente', iconStatus);
      }
    });

  }
}
