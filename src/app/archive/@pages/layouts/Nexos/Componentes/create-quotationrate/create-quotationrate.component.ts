import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { CreateOrEditQuoteTypeService } from '../../service/create-or-edit-quote-type.service';
import Swal from 'sweetalert2';
 

@Component({
  selector: 'app-create-quotationrate',
  templateUrl: './create-quotationrate.component.html',
  styleUrls: ['./create-quotationrate.component.scss']
})
export class CreateQuotationrateComponent implements OnInit {

  @Input() createParamsTypeQuote = {
    name: '',
    id: '0',
    status_id: '1',

  }
  constructor(private router: Router,
    private config: ConfigurationRestService,
    private createOrEditQuoteTypeService: CreateOrEditQuoteTypeService,
     
     
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
  goCreateQuotationRate() {
    if (this.createParamsTypeQuote.name == '') {
      Swal.fire("Atencion", "El nombre es obligatorio", "warning");
      return
    }
    if (this.createParamsTypeQuote.status_id == '') {
      Swal.fire("Atencion", "La contraseña es obligatoria", "warning");
      return
    }
    const formData = new FormData();
    formData.append('key', this.config.key)
    formData.append('id', this.createParamsTypeQuote['id'])
    formData.append('name', this.createParamsTypeQuote['name'])
    formData.append('status_id', this.createParamsTypeQuote['status_id'])

    this.createOrEditQuoteTypeService.CreateOrEditQuoteType(formData);
  }
}

