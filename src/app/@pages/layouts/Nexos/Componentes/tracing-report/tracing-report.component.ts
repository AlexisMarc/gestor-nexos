import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tracing-report',
  templateUrl: './tracing-report.component.html',
  styleUrls: ['./tracing-report.component.scss']
})
export class TracingReportComponent implements OnInit {

  init_date: any;
  end_date: any;
  init_date_save: any;
  end_date_save: any;

  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient, @Inject(SESSION_STORAGE)
    private storage: WebStorageService
  ) {
    const userStorage = this.storage.get('user');
    // tslint:disable-next-line: max-line-length
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor' || userStorage['content']['profile'] === 'Moderador' || userStorage['content']['profile'] === 'Asesor') {
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
    window.open(this.config.endpoint + 'QuoteServices/getHiredQuotesReportExcel?key=' + this.config.key + '&init_date=' + this.init_date_save + '&end_date='  + this.end_date_save);
    //this.httpClient.get(this.config.endpoint + 'QuoteServices/getHiredQuotesReportExcel?key=' + this.config.key + '&init_date=' + this.init_date_save + '&end_date='  + this.end_date_save)
    //.subscribe(resp => {
    //})
  }
}
