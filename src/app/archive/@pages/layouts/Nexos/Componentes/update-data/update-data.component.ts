import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { GetAllActiveAppServicesTypeService } from '../../service/get-all-active-app-services-type.service';
import { EnvServiceService } from '@env';
declare var swal: any;

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit {
  private _env = inject(EnvServiceService)
  param2 = '2';
  ListQuote: [] = [];
  ListServiceActive: any;
  searchPost = '';

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
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

  goPointControlMeeting(idResidential:any) {
    this.router.navigate(['home/pointControlMeeting/' + idResidential]);
  }

  Search2() {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ResidentialServices/getAllResidentialByParam?key=' + this._env.SECRET_KEY + '&param=' + this.searchPost + '&quote_type_id=1')
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
