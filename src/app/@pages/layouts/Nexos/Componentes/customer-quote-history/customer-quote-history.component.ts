import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import swal, { SweetAlertType } from 'sweetalert2';
@Component({
  selector: 'app-customer-quote-history',
  templateUrl: './customer-quote-history.component.html',
  styleUrls: ['./customer-quote-history.component.scss']
})
export class CustomerQuoteHistoryComponent implements OnInit {
  listadoQuoteHistory: any;
  idResidential: any;

  constructor(private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
    @Inject(SESSION_STORAGE)
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

    this.idResidential = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.httpClient.get(this.config.endpoint + 'QuoteServices/getQuotesByResidential?key=' + this.config.key + '&residential_id=' + this.idResidential)
      .subscribe(resp => {
        this.listadoQuoteHistory = resp['content']
      });
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  goQuote() {
    this.router.navigate(['/home/quote'])
  }
  irEditQuote(idQuote) {
    this.router.navigate(['/home/createquote/' + this.idResidential + '/' + idQuote])
  }
}
