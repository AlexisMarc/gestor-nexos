import { inject, Injectable } from '@angular/core';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigurationRestService } from './configuration.rest.service';
import { ListService } from '../interface/listService.model';
import { EnvServiceService } from '@env';

@Injectable({
  providedIn: 'root'
})
export class GetAllActiveAppServicesTypeService {
  private _env = inject(EnvServiceService)
  deison: any;
  ListServiceActive: ListService [] = [];

    constructor(private httpClient: HttpClient, private config: ConfigurationRestService,
      private router: Router) {
     // servicio consulta servicios Activos
     this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_API + 'getAllActiveAppServicesType?key=' + this._env.SECRET_KEY)
     .subscribe((resp:any) => {
        // tslint:disable-next-line: forin
        for (const index in resp['content']) {
          //@ts-ignore
         this.ListServiceActive[index] = resp['content'][index];
       }} ); }
      }
