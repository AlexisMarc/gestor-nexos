import { Component, OnInit, Inject, Input, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
 
import { SaveQuotationHistoryService } from '../../service/save-quotation-history.service';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-quotehistory',
  templateUrl: './quotehistory.component.html',
  styleUrls: ['./quotehistory.component.scss']
})
export class QuotehistoryComponent implements OnInit {
  private _env = inject(EnvServiceService)
  @Input() dataQuote: any = {
    id: '',
    number: '',
    observations: '',
    date: '',
    created_at: '',
    updated_at: '',
    residential_id: '',
    residentialName: '',
    nit: '',
    email: '',
    phone: '',
    phone2: '',
    administrator: '',
  }

  id: string;
  idQuote: any;
  text!: string;
  status_text = '0';
  idj = '0';

  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
     
     
    private route: ActivatedRoute,
    private saveQuotationHistoryService: SaveQuotationHistoryService) {

    this.idQuote = this.route.snapshot.paramMap.get("id");
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    this.id = userStorage['id'];

    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/getQuoteConfirmationHistoryByQuote?key=' + this._env.SECRET_KEY + '&user_id=' + this.id + '&quote_id=' + this.idQuote)
      .subscribe((resp:any)=> {
        this.dataQuote = resp['content'];
      });
  }

  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['/home'])
  }

  goQuote() {
    this.router.navigate(['home/quote'])
  }
  goConfirmQuote() {
    this.router.navigate(['home/confirmquote'])
  }
  Save() {
    const formData = new FormData();
    formData.append('key', this._env.SECRET_KEY);
    formData.append('user_id', this.id);
    formData.append('id', this.idj);
    formData.append('quote_id', this.idQuote);
    formData.append('message', this.text);
    formData.append('client_confirmed', this.status_text);
    this.saveQuotationHistoryService.saveQuotation(formData);
   
  }
}
