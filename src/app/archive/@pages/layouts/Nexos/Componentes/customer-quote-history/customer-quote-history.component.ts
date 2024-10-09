import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
 
import swal, { SweetAlertIcon } from 'sweetalert2';
import { EnvServiceService } from '@env';
@Component({
  selector: 'app-customer-quote-history',
  templateUrl: './customer-quote-history.component.html',
  styleUrls: ['./customer-quote-history.component.scss']
})
export class CustomerQuoteHistoryComponent implements OnInit {
  private _env = inject(EnvServiceService)
  listadoQuoteHistory: any;
  idResidential: any;

  constructor(private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
     
     
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

    this.idResidential = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/getQuotesByResidential?key=' + this._env.SECRET_KEY + '&residential_id=' + this.idResidential)
      .subscribe((resp:any)=> {
        this.listadoQuoteHistory = resp['content']
      });
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  goQuote() {
    this.router.navigate(['/home/quote'])
  }
  irEditQuote(idQuote:any) {
    this.router.navigate(['/home/createquote/' + this.idResidential + '/' + idQuote])
  }
}
