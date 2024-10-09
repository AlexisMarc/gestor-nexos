import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../interface/globals.model';
 
import Swal from 'sweetalert2';
import { EnvServiceService } from '@env';
@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.scss']
})
export class TracingComponent implements OnInit {
  private _env = inject(EnvServiceService)
  param = '';
  listQuoteConfirmation: any;
  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private global: Globals,  
     
  ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    // tslint:disable-next-line: max-line-length
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor' || userStorage['profile'] === 'Moderador' || userStorage['profile'] === 'Asesor') {
    } else {
      Swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }
    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' ||  userStorage === '' || userStorage['status_id'] === 0 ) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }

    global.listadoItems = [];
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/getNotHiredQuoteByClient?key=' + this._env.SECRET_KEY + '&param=' + this.param)
    .subscribe((resp:any)=> {
      this.listQuoteConfirmation = resp['content'];

    });
   }

  ngOnInit() {
  }

  Search() {
    if (this.param == '') {
      this.listQuoteConfirmation = [];
      return;
    }
    else {
      return this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/getNotHiredQuoteByClient?key=' + this._env.SECRET_KEY + '&param=' + this.param)
        .subscribe((resp:any)=> {
          this.listQuoteConfirmation = resp['content'];

        });
    }
  }

  goHome() {
    this.router.navigate(['/home'])
  }

  goTracingQuote(idQuote:any, idResidential:any) {
    this.router.navigate(['home/tracingQuote/' + idQuote + '/' + idResidential])
  }

  goTracinReport() {
    this.router.navigate(['home/tracingReport'])
  }
}
