import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { CreateOrEditItemService } from '../../service/create-or-edit-item.service';
import { HttpClient } from '@angular/common/http';
import { CreateEmailContentService } from '../../service/create-email-content.service';
import Swal from 'sweetalert2';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-create-text-email',
  templateUrl: './create-text-email.component.html',
  styleUrls: ['./create-text-email.component.scss']
})
export class CreateTextEmailComponent implements OnInit {

  @Input() paramTextEmail = {
    id: '0',
    subject: '',
    message: '',
    quote_type_id: '0',
    status_id: '1',
  }

  typeQuote: any;
  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private createOrEditItem: CreateOrEditItemService,
    private httpClient: HttpClient,
    private createEmailService: CreateEmailContentService,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService
  ) {
    const userStorage = this.storage.get('user');
    

    // tslint:disable-next-line: max-line-length
    if (userStorage['content']['profile'] === 'Super Usuario') {
    } else {
      Swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }
    // service type quote
    this.httpClient.get(this.config.endpoint + 'QuoteServices/getAllActiveTypeQuote?key=' + this.config.key)
      .subscribe(resp => {
        this.typeQuote = resp['content']
      });
  }
  ngOnInit() {

  }
  goHome() {
    this.router.navigate(['/home'])
  }
  createTextEmail() {
    if (this.paramTextEmail.subject == '') {
      Swal.fire("Atencion", "El asunto es obligatorio", "warning");
      return;
    }
    if (this.paramTextEmail.message == '') {
      Swal.fire("Atencion", "El mensaje es obligatorio", "warning");
      return;
    }
    if (this.paramTextEmail.quote_type_id == '0') {
      Swal.fire("Atencion", "El tipo de cotizacion es obligatorio", "warning");
      return;
    }
    if (this.paramTextEmail.status_id == '') {
      Swal.fire("Atencion", "El estado es obligatorio", "warning");
      return;
    }
    const formData = new FormData();
    formData.append('key', this.config.key);
    formData.append('id', this.paramTextEmail['id']);
    formData.append('subject', this.paramTextEmail['subject']);
    formData.append('message', this.paramTextEmail['message']);
    formData.append('quote_type_id', this.paramTextEmail['quote_type_id']);
    formData.append('status_id', this.paramTextEmail['status_id']);

    this.createEmailService.CreateTextEmail(formData);
  }


  goMenuSetting() {
    this.router.navigate(['home/menusetting'])
  }
  goListTextEmail() {
    this.router.navigate(['home/textEmailList'])
  }
}