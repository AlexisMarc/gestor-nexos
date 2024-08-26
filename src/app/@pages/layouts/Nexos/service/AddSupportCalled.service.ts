import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AddSupportCalledService {

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
  ) { }

  addSupportCallReport(CalledData:any) {
    var iconStatus: SweetAlertIcon = 'error'
    iconStatus = 'success';

    this.httpClient.post(this.config.endpoint3 + 'UtilServices/storePhoneCallRecord', CalledData).subscribe((resp:any) => {
      if (resp['success'] === true) {
        swal.fire("Mensaje", 'Se ha guardado correctamente', iconStatus);
      }
    });

  }
}
