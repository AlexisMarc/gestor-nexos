import { Component, OnInit, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { ListSet } from '../../interface/listSet.model';
import { Globals } from '../../interface/globals.model';
import swal from 'sweetalert2';
import { EnvServiceService } from '@env';
 

@Component({
  selector: 'app-set-list-enable',
  templateUrl: './set-list-enable.component.html',
  styleUrls: ['./set-list-enable.component.scss']
})
export class SetListEnableComponent implements OnInit {
  private _env = inject(EnvServiceService)
ListadoConjuntos: ListSet[] = [];
param = '';
idTypeQuote = '1';
ListQuote: [] = [];
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private globals: Globals,  
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
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' ||  userStorage === '' || userStorage['status_id'] === 0 ) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }


      if (this.globals.search_data != undefined) {
        this.param = this.globals.search_data;
      }

       // servicio consulta Residenciales
    // this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_API + 'getAllResidentials?key=' + this._env.SECRET_KEY)
    // .subscribe((resp2 :any)=> {
     // for (let index in resp2['content']) {
     //   this.ListadoConjuntos[index] = resp2['content'][index];
     // }
    // });

    if (this.param != '') {
      this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ResidentialServices/getAllResidentialByParam?key=' + this._env.SECRET_KEY + '&param=' + this.param + '&quote_type_id=' + this.idTypeQuote)
        .subscribe((resp:any) => {
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
  goEditResidential(uuid_code:any) {
    this.router.navigate(['home/editResidential/'+uuid_code])
  }
 // consulta buscardor
  Search() {
    this.globals.search_data = this.param;
    if (this.param === '') {
      this.ListQuote = [];
      return;
    } else {
      // tslint:disable-next-line: max-line-length
      return this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ResidentialServices/getAllResidentialByParam?key=' + this._env.SECRET_KEY + '&param=' + this.param + '&quote_type_id=' + this.idTypeQuote)
        .subscribe((resp1:any) => {
          this.ListQuote = resp1['content'];
        });
    }
  }
  }
