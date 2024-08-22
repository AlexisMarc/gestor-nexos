import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { SaveQuotationHistoryService } from '../../service/save-quotation-history.service';

@Component({
  selector: 'app-quotehistory',
  templateUrl: './quotehistory.component.html',
  styleUrls: ['./quotehistory.component.scss']
})
export class QuotehistoryComponent implements OnInit {
  @Input() dataQuote = {
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
  text: string;
  status_text = '0';
  idj = '0';

  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService,
    private route: ActivatedRoute,
    private saveQuotationHistoryService: SaveQuotationHistoryService) {

    this.idQuote = this.route.snapshot.paramMap.get("id");
    const userStorage = this.storage.get('user');
    this.id = userStorage['content']['id'];

    this.httpClient.get(this.config.endpoint + 'QuoteServices/getQuoteConfirmationHistoryByQuote?key=' + this.config.key + '&user_id=' + this.id + '&quote_id=' + this.idQuote)
      .subscribe(resp => {
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
    formData.append('key', this.config.key);
    formData.append('user_id', this.id);
    formData.append('id', this.idj);
    formData.append('quote_id', this.idQuote);
    formData.append('message', this.text);
    formData.append('client_confirmed', this.status_text);
    this.saveQuotationHistoryService.saveQuotation(formData);
   
  }
}
