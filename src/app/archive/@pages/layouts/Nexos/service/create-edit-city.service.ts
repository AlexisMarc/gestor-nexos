import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { Router } from '@angular/router';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { EnvServiceService } from '@env';

@Injectable({
  providedIn: 'root'
})
export class CreateEditCityService {
  private _env = inject(EnvServiceService)
  data: any;

  constructor(private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router) { }

  createCity(createCity:any) {
    this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ResidentialServices/addEditCity', createCity)
      .subscribe((data:any) => {
        this.data = data;
        let iconStatus: SweetAlertIcon = 'success';
        let iconStatus2: SweetAlertIcon = 'warning';
        if (data['success'] === true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/cityList']);

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
  UpdateCity(editCity:any) {
    this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ResidentialServices/addEditCity', editCity)
      .subscribe((data:any) => {
        this.data = data;
        let iconStatus: SweetAlertIcon = 'success';
        let iconStatus2: SweetAlertIcon = 'warning';
        if (data['success'] === true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/cityList']);

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
