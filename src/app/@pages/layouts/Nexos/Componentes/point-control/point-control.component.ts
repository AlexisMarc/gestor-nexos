import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { Globals } from '../../interface/globals.model';
import { GetAllActiveAppServicesTypeService } from '../../service/get-all-active-app-services-type.service';
 
import swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-point-control',
  templateUrl: './point-control.component.html',
  styleUrls: ['./point-control.component.scss']
})
export class PointControlComponent implements OnInit {
  param2 = '2';
  ListQuote: [] = [];
  ListServiceActive: any;
  searchPost = '';

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private globals: Globals,
    private getAllActiveAppServices: GetAllActiveAppServicesTypeService,
     
     ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;

    // tslint:disable-next-line: max-line-length
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor' || userStorage['profile'] === 'Moderador' || userStorage['profile'] === 'Asesor') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;
    }

    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.ListServiceActive = this.getAllActiveAppServices.ListServiceActive;
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['home/']);
  }

  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }

  goPointControlMeeting(idResidential:any) {
    this.router.navigate(['home/pointControlMeeting/' + idResidential]);
  }

  
  Search2() {
    this.httpClient.get(this.config.endpoint + 'ResidentialServices/getAllResidentialByParam?key=' + this.config.key + '&param=' + this.searchPost + '&quote_type_id=1')
      .subscribe((resp1 :any)=> {
        this.ListQuote = resp1['content'];
        
      });
  }

}