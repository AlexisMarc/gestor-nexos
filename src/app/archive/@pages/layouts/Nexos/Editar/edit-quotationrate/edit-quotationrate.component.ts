import { Component, OnInit, Input, Inject, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { CreateOrEditQuoteTypeService } from '../../service/create-or-edit-quote-type.service';
import Swal from 'sweetalert2';
import { EnvServiceService } from '@env';
 

@Component({
  selector: 'app-edit-quotationrate',
  templateUrl: './edit-quotationrate.component.html',
  styleUrls: ['./edit-quotationrate.component.scss']
})
export class EditQuotationrateComponent implements OnInit {
  private _env = inject(EnvServiceService)
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
    private route: ActivatedRoute,  
     ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    // tslint:disable-next-line: max-line-length
    if (userStorage['profile'] === 'Super Usuario') {
    } else {
      Swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }

    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' ||  userStorage === '' || userStorage['status_id'] === 0 ) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }

    this.idTypeQuote = this.route.snapshot.paramMap.get('id_TypeQuote')!

    //get type quote id 
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/getTypeQuoteById?key=' + this._env.SECRET_KEY + '&id=' + this.idTypeQuote)
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
    formData.append('key', this._env.SECRET_KEY)
    formData.append('id', this.editParamsTypeQuote['id'])
    formData.append('name', this.editParamsTypeQuote['name'])
    formData.append('status_id', this.editParamsTypeQuote['status_id'])

    this.EditQuoteTypeService.EditQuoteType(formData);
  }
}