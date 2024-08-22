import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { Globals } from '../../interface/globals.model';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import swal, { SweetAlertType } from 'sweetalert2';
import { GetAllActiveAppServicesTypeService } from '../../service/get-all-active-app-services-type.service';
import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-search-residential-votes',
  templateUrl: './search-residential-votes.component.html',
  styleUrls: ['./search-residential-votes.component.scss']
})
export class SearchResidentialVotesComponent implements OnInit {

  param3 = '2';
  ListQuote: [] = [];
  ListServiceActive: any;
  

    constructor(
    private router: Router, private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private globals: Globals,
    private getAllActiveAppServices: GetAllActiveAppServicesTypeService,

    @Inject(SESSION_STORAGE)
    private storage: WebStorageService ) {
      const userStorage = this.storage.get('user');
       // tslint:disable-next-line: max-line-length
       if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor' || userStorage['content']['profile'] === 'Moderador') {
      } else {
        swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
        this.router.navigate(['/home']);
        return;

      }

      // tslint:disable-next-line: max-line-length
      if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' ||  userStorage === '' || userStorage['content']['status_id'] === 0 ) {
        sessionStorage.clear();
        this.router.navigate(['/']);
      }
      this.ListServiceActive = this.getAllActiveAppServices.ListServiceActive;
    }
    searchPost = '';
  ngOnInit() {
  }
  public  transform(value: any) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
  goHome() {
    this.router.navigate(['home/']);
  }
  goCreateVituralVotes(idResidential) {
    this.router.navigate(['home/crearVotacion/' + idResidential ]);
  }

  Search3() {
    // tslint:disable-next-line: max-line-length
    this.httpClient.get(this.config.endpoint3 + 'AppServices/getActiveResidentialByService?key=' + this.config.key + '&service_type=' + '2' )
        .subscribe(resp1 => {
          this.ListQuote = resp1['content'];

        });
    }

}
