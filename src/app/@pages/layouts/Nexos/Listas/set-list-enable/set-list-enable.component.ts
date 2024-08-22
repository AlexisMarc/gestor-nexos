import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { ListSet } from '../../interface/listSet.model';
import { Globals } from '../../interface/globals.model';
import swal from 'sweetalert2';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-set-list-enable',
  templateUrl: './set-list-enable.component.html',
  styleUrls: ['./set-list-enable.component.scss']
})
export class SetListEnableComponent implements OnInit {

ListadoConjuntos: ListSet[] = [];
param = '';
idTypeQuote = '1';
ListQuote: [] = [];
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private globals: Globals, @Inject(SESSION_STORAGE)
    private storage: WebStorageService) {
    const userStorage = this.storage.get('user');
    
    // tslint:disable-next-line: max-line-length
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor') {
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


      if (this.globals.search_data != undefined) {
        this.param = this.globals.search_data;
      }

       // servicio consulta Residenciales
    // this.httpClient.get(this.config.endpoint2 + 'getAllResidentials?key=' + this.config.key)
    // .subscribe(resp2 => {
     // for (let index in resp2['content']) {
     //   this.ListadoConjuntos[index] = resp2['content'][index];
     // }
    // });

    if (this.param != '') {
      this.httpClient.get(this.config.endpoint + 'ResidentialServices/getAllResidentialByParam?key=' + this.config.key + '&param=' + this.param + '&quote_type_id=' + this.idTypeQuote)
        .subscribe(resp => {
          this.ListQuote = resp['content'];
          
        });
    }
  }
  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['home/']);
  }
  goMenuSettingVoting(){
    this.router.navigate(['home/menusettingVoting']);
  }
  goEditResidential(uuid_code) {
    this.router.navigate(['home/editResidential/'+uuid_code])
  }
 // consulta buscardor
  Search() {
    this.globals.search_data = this.param;
    if (this.param === '') {
      this.ListQuote = [];
    } else {
      // tslint:disable-next-line: max-line-length
      return this.httpClient.get(this.config.endpoint + 'ResidentialServices/getAllResidentialByParam?key=' + this.config.key + '&param=' + this.param + '&quote_type_id=' + this.idTypeQuote)
        .subscribe(resp1 => {
          this.ListQuote = resp1['content'];
        });
    }
  }
  }
