import { Component, OnInit, Input, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
 
import swal from 'sweetalert2';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-tracing-report',
  templateUrl: './tracing-report.component.html',
  styleUrls: ['./tracing-report.component.scss']
})
export class TracingReportComponent implements OnInit {
  private _env = inject(EnvServiceService)
  init_date: any;
  end_date: any;
  init_date_save: any;
  end_date_save: any;

  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,  
     
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
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' ||  userStorage === '' || userStorage['status_id'] === 0 ) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['/home']);
    }
  goTracing() {
    this.router.navigate(['home/tracing']);
  }
  report() {
    let fecha = this.init_date.split("T", 3);
    this.init_date_save = fecha[0] + ' ' + fecha[1] + ':00';
    let fecha2 = this.end_date.split("T", 3);
    this.end_date_save = fecha2[0] + ' ' + fecha2[1] + ':00';
    //get report quote confirmation
    window.open(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/getHiredQuotesReportExcel?key=' + this._env.SECRET_KEY + '&init_date=' + this.init_date_save + '&end_date='  + this.end_date_save);
    //this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/getHiredQuotesReportExcel?key=' + this._env.SECRET_KEY + '&init_date=' + this.init_date_save + '&end_date='  + this.end_date_save)
    //.subscribe((resp:any)=> {
    //})
  }
}
