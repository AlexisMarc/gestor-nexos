import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { Globals } from '../../interface/globals.model';
 
import swal, { SweetAlertIcon } from 'sweetalert2';
import { GetAllActiveAppServicesTypeService } from '../../service/get-all-active-app-services-type.service';
@Component({
  selector: 'app-technical-support',
  templateUrl: './technical-support.component.html',
  styleUrls: ['./technical-support.component.scss']
})

export class TechnicalSupportComponent implements OnInit {
  param3 = '2';
  listResidentials: [] = [];
  date = "";
  filter = "";

  constructor(
    private router: Router, private httpClient: HttpClient,
    private config: ConfigurationRestService,
     
     ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    // tslint:disable-next-line: max-line-length
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor' || userStorage['profile'] === 'Moderador' || userStorage['profile'] === 'Soporte telefonico') {
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

    var today = new Date();
    var mes = "";
    var dia = "";

    mes = "" + (today.getMonth() + 1)
    dia = "" + today.getDate()

    var year = "" + today.getFullYear();
    if (parseInt(dia) <= 9) {
      dia = '0' + dia;
    }

    if (parseInt(mes) <= 9) {
      mes = '0' + mes;
    }

    var date = year + '-' + mes + '-' + dia;

    this.date = date;

    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    this.httpClient.get(this.config.endpoint + 'ResidentialServices/getActiveMeetingByResidential?key=' + this.config.key + '&date=' + this.date)
      .subscribe((resp:any)=> {
        this.listResidentials = resp['content'];
      });

  }

  reLoadList() {
    this.httpClient.get(this.config.endpoint + 'ResidentialServices/getActiveMeetingByResidential?key=' + this.config.key + '&date=' + this.date)
      .subscribe((resp:any)=> {
        this.listResidentials = resp['content'];
      });
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['home/']);
  }
  goSupportTechnical(idResidential:any) {
    this.router.navigate(['home/SoporteTelefonico/' + idResidential]);
  }

}