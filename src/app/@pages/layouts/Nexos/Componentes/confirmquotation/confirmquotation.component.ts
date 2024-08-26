import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-confirmquotation',
  templateUrl: './confirmquotation.component.html',
  styleUrls: ['./confirmquotation.component.scss']
})
export class ConfirmquotationComponent implements OnInit {
  ListQuote: any;
  id!: string;
  param = '';
  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService) {
    const userStorage = this.storage.get('user');
    // tslint:disable-next-line: max-line-length
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor' || userStorage['content']['profile'] === 'Moderador' || userStorage['content']['profile'] === 'Asesor') {
    } else {
      Swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }
   // tslint:disable-next-line: max-line-length
   if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' ||  userStorage === '' || userStorage['content']['status_id'] === 0 ) {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
    this.id = userStorage['content']['id'];
    // tslint:disable-next-line: max-line-length
    this.httpClient.get(this.config.endpoint + 'QuoteServices/getQuotesPendingConfirmation?key=' + this.config.key + '&user_id=' + this.id + '&param=' + this.param)
      .subscribe((resp:any)=> {
        this.ListQuote = resp['content'];
      });
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goQuote() {
    this.router.navigate(['home/quote']);
  }
  GoQuoteHistory(id_residential:any) {
    this.router.navigate(['home/quoteHistory/' + id_residential]);
  }

  Search () {
    this.ListQuote = [];
    // tslint:disable-next-line: max-line-length
    this.httpClient.get(this.config.endpoint + 'QuoteServices/getQuotesPendingConfirmation?key=' + this.config.key + '&user_id=' + this.id + '&param=' + this.param)
      .subscribe((resp:any)=> {
        this.ListQuote = resp['content'];
      });
  }
}
