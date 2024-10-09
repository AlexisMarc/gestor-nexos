import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { Router } from '@angular/router';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { EnvServiceService } from '@env';

@Injectable({
  providedIn: 'root'
})
export class SaveServiceIcloudService {
  private _env = inject(EnvServiceService)
  data: any;
  constructor(private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router, ) { }

  saveServiceActive(infoResidentialEdit:any) {
    this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.APP_API + 'storeResidential', infoResidentialEdit)
      .subscribe((data:any) => {
        this.data = data
        var iconStatus:SweetAlertIcon = 'success'
        var iconStatus2:SweetAlertIcon = 'warning'
      if (data['success'] == true){       
        if (data['success']) {iconStatus = 'success', this.router.navigate(['/home/menusettingVoting'])
       
       }
        swal.fire("Correcto", data['message'], iconStatus);
      }
      else{
        if (data['success']) {iconStatus2 = 'warning'
       
      }
       swal.fire("Incorrecto", data['message'], iconStatus2);
      }
      })
  }
}