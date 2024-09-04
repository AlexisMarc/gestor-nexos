import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { GetAllActiveAppServicesTypeService } from '../../service/get-all-active-app-services-type.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-union-masive-list',
  templateUrl: './union-masive-list.component.html',
  styleUrls: ['./union-masive-list.component.scss']
})
export class UnionMasiveListComponent implements OnInit {
  param2 = '0';
  ListQuote: [] = [];
  ListServiceActive: any;
  searchPost = '';
  meeting_id: any;
  keysession!: string;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private getAllActiveAppServices: GetAllActiveAppServicesTypeService,  
     ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;

    // tslint:disable-next-line: max-line-length
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor') {
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
    this.keysession = userStorage['token'];
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['home/']);
  }

  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }

  goPreRegistration(idResidential:any) {
    this.router.navigate(['home/preregistration/' + idResidential]);
  }

  goUnion(idResidential:any, name:any) {
    this.router.navigate(['home/unionMasive/' + idResidential + '/' + name]);
  }

  Search2() {
    this.httpClient.get(this.config.endpoint + 'ResidentialServices/getAllResidentialByParam?key=' + this.config.key + '&param=' + this.searchPost + '&quote_type_id=1')
      .subscribe((resp1 :any)=> {
        this.ListQuote = resp1['content'];
      });
  }

}
