import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { CreateOrEditItemService } from '../../service/create-or-edit-item.service';
import { HttpClient } from '@angular/common/http';
import { CreateEmailContentService } from '../../service/create-email-content.service';
import Swal from 'sweetalert2';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-edit-text-email',
  templateUrl: './edit-text-email.component.html',
  styleUrls: ['./edit-text-email.component.scss']
})
export class EditTextEmailComponent implements OnInit {
  @Input() editParamTextEmail = {
    id: '',
    subject: '',
    message: '',
    quote_type_id: '',
    status_id: '',
  };

  typeQuote: any;
  idTextEmail: any;
  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private createEmailService: CreateEmailContentService,
    private route: ActivatedRoute, @Inject(SESSION_STORAGE)
    private storage: WebStorageService) {

    const userStorage = this.storage.get('user');
    if (userStorage['content']['profile'] === 'Super Usuario') {
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
    this.idTextEmail = this.route.snapshot.paramMap.get('idTextEmail');



    // Get text email by id
    this.httpClient.get(this.config.endpoint + 'QuoteServices/getQuoteEmailContentById?key=' + this.config.key + '&id=' + this.idTextEmail)
      .subscribe((resp:any)=> {
        this.editParamTextEmail['id'] = resp['content']['id'];
        this.editParamTextEmail['subject'] = resp['content']['subject'];
        this.editParamTextEmail['message'] = resp['content']['message'];
        this.editParamTextEmail['quote_type_id'] = resp['content']['quote_type_id'];
        this.editParamTextEmail['status_id'] = resp['content']['status_id'];
      });
    // service type quote
    this.httpClient.get(this.config.endpoint + 'QuoteServices/getAllActiveTypeQuote?key=' + this.config.key)
      .subscribe((resp1 :any)=> {
        this.typeQuote = resp1['content'];

      });
  }
  ngOnInit() {

  }
  goHome() {
    this.router.navigate(['/home'])
  }
  createTextEmail() {
    if (this.editParamTextEmail.subject == '') {
      Swal.fire("Atencion", "El asunto es obligatorio", "warning");
      return
    }
    if (this.editParamTextEmail.message == '') {
      Swal.fire("Atencion", "El mensaje es obligatorio", "warning");
      return
    }
    if (this.editParamTextEmail.quote_type_id == '0') {
      Swal.fire("Atencion", "El tipo de cotizacion es obligatorio", "warning");
      return
    }
    if (this.editParamTextEmail.status_id == '') {
      Swal.fire("Atencion", "El estado es obligatorio", "warning");
      return
    }
    const formData = new FormData();
    formData.append('key', this.config.key);
    formData.append('id', this.editParamTextEmail['id']);
    formData.append('subject', this.editParamTextEmail['subject']);
    formData.append('message', this.editParamTextEmail['message']);
    formData.append('quote_type_id', this.editParamTextEmail['quote_type_id']);
    formData.append('status_id', this.editParamTextEmail['status_id']);

    this.createEmailService.UpdateTextEmail(formData)
  }

  goMenuSetting() {
    this.router.navigate(['home/menusetting'])
  }
  goListTextEmail() {
    this.router.navigate(['home/textEmailList'])
  }
}
