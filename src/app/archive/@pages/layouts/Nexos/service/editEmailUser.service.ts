import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { Router } from '@angular/router';
import swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EditEmailUserService {

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router
  ) { }

  editMail(CustomerData:any) {
    var iconStatus: SweetAlertIcon = 'error'
    iconStatus = 'success';

    

  }
}
