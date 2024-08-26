import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { CreateOrEditQuoteTypeService } from '../../service/create-or-edit-quote-type.service';
import Swal from 'sweetalert2';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-edit-quotationrate',
  templateUrl: './edit-quotationrate.component.html',
  styleUrls: ['./edit-quotationrate.component.scss']
})
export class EditQuotationrateComponent implements OnInit {

  @Input() editParamsTypeQuote = {
    name: '',
    id: '',
    status_id: '',
  };

  idTypeQuote!: string;

  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private EditQuoteTypeService: CreateOrEditQuoteTypeService,
    private route: ActivatedRoute, @Inject(SESSION_STORAGE)
    private storage: WebStorageService) {
    const userStorage = this.storage.get('user');
    // tslint:disable-next-line: max-line-length
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

    this.idTypeQuote = this.route.snapshot.paramMap.get('id_TypeQuote')!

    //get type quote id 
    this.httpClient.get(this.config.endpoint + 'QuoteServices/getTypeQuoteById?key=' + this.config.key + '&id=' + this.idTypeQuote)
      .subscribe((resp:any)=> {
        this.editParamsTypeQuote['name'] = resp['content']['name'];
        this.editParamsTypeQuote['id'] = resp['content']['id'];
        this.editParamsTypeQuote['status_id'] = resp['content']['status_id'];
      })
  }

  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['/home'])
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting'])
  }

  goQutationRate() {
    this.router.navigate(['home/qutationratelist'])
  }

  editQuotationRate() {
    if (this.editParamsTypeQuote.name == '') {
      Swal.fire("Atencion", "El nombre del tipo de cotizacion es obligatorio", "warning");
      return
    }
    if (this.editParamsTypeQuote.status_id == '') {
      Swal.fire("Atencion", "El estado  es obligatoria", "warning");
      return
    }
    const formData = new FormData();
    formData.append('key', this.config.key)
    formData.append('id', this.editParamsTypeQuote['id'])
    formData.append('name', this.editParamsTypeQuote['name'])
    formData.append('status_id', this.editParamsTypeQuote['status_id'])

    this.EditQuoteTypeService.EditQuoteType(formData);
  }
}