import { Component, OnInit, Input, Inject, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmationByQuoteService } from '../../service/confirmation-by-quote.service';
import Swal from 'sweetalert2';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-tracing-quote',
  templateUrl: './tracing-quote.component.html',
  styleUrls: ['./tracing-quote.component.scss']
})
export class TracingQuoteComponent implements OnInit {
  private _env = inject(EnvServiceService)
  @Input() quoteParameters = {
    id: '',
    residentialName: '',
    nit: '',
    phone: '',
    phone2: '',
    email: '',
    key: '',
    user_id: '',
    quote_id: '',
    client_confirmed: '0',
    message: '',
    name_administrator: '',
    units: '',
    date: '',
    init_time: '',
    sign_time: '',
    is_hired: '0'
  }
  dataQuote: any;
  idQuote: any;
  idResidential: any;
  id_user: any;
  url!: string;
  init_time: any;
  confirm!: string;
  text!: string;
  datatext: any;
  dateNow: any;
  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
     
     
    private confirmationByQuoteService: ConfirmationByQuoteService,
  ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    // this.listItems = this.globals.listadoItems;

    // tslint:disable-next-line: max-line-length
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor' || userStorage['profile'] === 'Moderador' || userStorage['profile'] === 'Asesor') {
    } else {
      Swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }

    if (userStorage == null || userStorage == undefined || userStorage == '') {
      sessionStorage.removeItem('user');
      this.router.navigate(['/']);
    }
    else {
      this.id_user = userStorage['id'];
    }
    //get idQuote
    this.idQuote = this.route.snapshot.paramMap.get('id_quote');
    this.idResidential = this.route.snapshot.paramMap.get('id_residential');
    //get data quote
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/getQuoteById?key=' + this._env.SECRET_KEY + '&id=' + this.idQuote)
      .subscribe((resp:any)=> {
        this.dataQuote = resp['content'];
        this.quoteParameters['residentialName'] = resp['content']['residentialName'];
        this.quoteParameters['nit'] = resp['content']['nit'];
        this.quoteParameters['phone'] = resp['content']['phone'];
        this.quoteParameters['phone2'] = resp['content']['phone2'];
        this.quoteParameters['email'] = resp['content']['email'];
        this.confirm = resp['content']['client_confirmed'];

        let var2 = resp['content']['date'].split(" ", 1);
        this.quoteParameters['date'] = var2[0];
        this.url = resp['content']['document_reference'];
      });

    //get data quote
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ResidentialServices/getResidentialById?key=' + this._env.SECRET_KEY + '&residential_id=' + this.idResidential)
      .subscribe((resp:any)=> {
        this.quoteParameters['name_administrator'] = resp['content']['encargado']['name'];
        this.quoteParameters['units'] = resp['content']['total_properties'];
      });

    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/getQuoteConfirmationHistoryByQuote?key=' + this._env.SECRET_KEY + '&user_id=' + this.id_user + '&quote_id=' + this.idQuote)
      .subscribe((resp:any)=> {
        this.datatext = resp['content']['messages'];
      });
    let myDate = Date.now();

    if (((new Date(myDate)).getUTCMonth() + 1) <= 9) {
      this.dateNow = ((new Date(myDate)).getFullYear() + '-0' + ((new Date(myDate)).getUTCMonth() + 1) + '-' + (new Date(myDate)).getDate());
    }
    else {
      this.dateNow = ((new Date(myDate)).getFullYear() + '-' + ((new Date(myDate)).getUTCMonth() + 1) + '-' + (new Date(myDate)).getDate());
    }
  }

  ngOnInit() {

  }
  goHome() {
    this.router.navigate(['/home'])
  }

  goTracing() {
    this.router.navigate(['home/tracing'])
  }

  saveConfirmationQuote() {
    
      const formData = new FormData();
      formData.append('key', this._env.SECRET_KEY);
      formData.append('id', '0');
      formData.append('user_id', this.id_user);
      formData.append('quote_id', this.idQuote);
      formData.append('message', this.quoteParameters['message']);
      formData.append('init_time', this.quoteParameters['init_time']);
      formData.append('sign_time', this.quoteParameters['sign_time']);
      formData.append('is_hired', this.quoteParameters['is_hired']);
      formData.append('date', this.quoteParameters['date']);
      this.confirmationByQuoteService.createConfirmationByQuote(formData);    
  
  }

  goQuote() {
    this.router.navigate(['home/createquote/' + this.idResidential + '/' + this.idQuote])
  }
}
