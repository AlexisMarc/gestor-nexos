import { Injectable } from '@angular/core';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigurationRestService } from './configuration.rest.service';
import { ListService } from '../interface/listService.model';

@Injectable({
  providedIn: 'root'
})
export class GetAllActiveAppServicesTypeService {
  deison: any;
  ListServiceActive: ListService [] = [];

    constructor(private httpClient: HttpClient, private config: ConfigurationRestService,
      private router: Router) {
     // servicio consulta servicios Activos
     this.httpClient.get(this.config.endpoint2 + 'getAllActiveAppServicesType?key=' + this.config.key)
     .subscribe((resp:any) => {
        // tslint:disable-next-line: forin
        for (const index in resp['content']) {
          //@ts-ignore
         this.ListServiceActive[index] = resp['content'][index];
       }} ); }
      }
