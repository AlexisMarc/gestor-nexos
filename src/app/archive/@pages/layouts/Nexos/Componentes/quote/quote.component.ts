import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { distinct } from 'rxjs/operators';
import { Globals } from '../../interface/globals.model';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  private _env = inject(EnvServiceService)
  param = '';
  ListQuote: [] = [];
  ListTypeQuotes: [] = [];
  idTypeQuote = '1'

  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private globals: Globals,
  ) {
    globals.listadoItems = [];
    globals.dataQuote = [];
    if (this.globals.search_data != undefined) {
      this.param = this.globals.search_data;
    }
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/getAllActiveTypeQuote?key=' + this._env.SECRET_KEY)
      .subscribe((resp:any)=> {
        this.ListTypeQuotes = resp['content'];
      });
    if (this.param != '') {
      this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ResidentialServices/getAllResidentialByParam?key=' + this._env.SECRET_KEY + '&param=' + this.param + '&quote_type_id=' + this.idTypeQuote)
        .subscribe((resp:any)=> {
          this.ListQuote = resp['content'];
        });
    }
  }

  ngOnInit() {
  }

  Search() {
    this.globals.search_data = this.param;
    if (this.param == '') {
      this.ListQuote = [];
      return;
    }
    else {
      return this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ResidentialServices/getAllResidentialByParam?key=' + this._env.SECRET_KEY + '&param=' + this.param + '&quote_type_id=' + this.idTypeQuote)
        .subscribe((resp:any)=> {
          this.ListQuote = resp['content'];
        });
    }
  }

  goCreateQuote() {
    this.globals.quote_type_id = this.idTypeQuote;
    this.router.navigate(['home/createquote/0/0'])
  }

  goHome() {
    this.router.navigate(['/home'])
  }

  goConfirmQuote() {
    this.router.navigate(['home/confirmquote'])
  }
  GoQuote(id_residential:any, id_quote:any) {
    this.globals.quote_type_id = this.idTypeQuote;
    this.router.navigate(['home/createquote/' + id_residential + '/' + id_quote])
  }
  goCustomerQuoteHistory(id_residential:any) {
    this.router.navigate(['home/customerQuoteHistory/' + id_residential])
  }
}