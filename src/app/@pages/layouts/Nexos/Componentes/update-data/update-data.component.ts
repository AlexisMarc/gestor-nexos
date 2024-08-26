import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { GetAllActiveAppServicesTypeService } from '../../service/get-all-active-app-services-type.service';
declare var swal: any;

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit {
  param2 = '2';
  ListQuote: [] = [];
  ListServiceActive: any;
  searchPost = '';

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private getAllActiveAppServices: GetAllActiveAppServicesTypeService,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService) {
    const userStorage = this.storage.get('user');

    // tslint:disable-next-line: max-line-length
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor' || userStorage['content']['profile'] === 'Moderador' || userStorage['content']['profile'] === 'Asesor') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;
    }

    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['content']['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.ListServiceActive = this.getAllActiveAppServices.ListServiceActive;
  }

  ngOnInit() {
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

  goHome() {
    this.router.navigate(['home/']);
  }

  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }

  doSendEmail(idResidential:any) {
    this.router.navigate(['home/editar_base/' + idResidential]);
  }


}
