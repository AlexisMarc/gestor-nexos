import { Component, OnInit, Input, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { CreateOrEditItemService } from '../../service/create-or-edit-item.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { EnvServiceService } from '@env';
 

@Component({
  selector: 'app-create-items',
  templateUrl: './create-items.component.html',
  styleUrls: ['./create-items.component.scss']
})
export class CreateItemsComponent implements OnInit {
  private _env = inject(EnvServiceService)
  @Input() ItemsParameters = {
    name: '',
    id: '0',
    price: '',
    price_fraction: '',
    status_id: '1',
    quote_type_id: '0',
    details: '',
    note: '',
    service_condition: '',
    contable: '1',
    item_type: '0',
    voting_details: '',
    show_quantity: '1',
    order: ''
  };

  imgURL: any;
  fileData: File | null = null;
  previewUrl: any = null;
  typeQuote: any;

  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private createOrEditItem: CreateOrEditItemService,
    private httpClient: HttpClient,  
     
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
    // service type quote
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/getAllActiveTypeQuote?key=' + this._env.SECRET_KEY)
      .subscribe((resp:any)=> {
        this.typeQuote = resp['content']
      });
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/home'])
  }
  goCreateItems() {

    if (this.ItemsParameters.name === '') {
      Swal.fire("Atencion", "El nombre es obligatorio", "warning");
      return;
    }
    if (this.ItemsParameters.price == '') {
      Swal.fire("Atencion", "El precio es obligatorio", "warning");
      return;
    }
    if (this.ItemsParameters.quote_type_id == '0') {
      Swal.fire("Atencion", "El tipo de cotizacion es obligatorio", "warning");
      return;
    }
    if (this.ItemsParameters.item_type == '0') {
      Swal.fire("Atencion", "El tipo de item es obligatorio", "warning");
      return;
    }
    if (this.ItemsParameters.status_id == '') {
      Swal.fire("Atencion", "El estado es obligatorio", "warning");
      return;
    }
    if (this.ItemsParameters.details == '') {
      Swal.fire("Atencion", "El detalle es obligatorio", "warning");
      return;
    }
    if (this.ItemsParameters.contable == '') {
      Swal.fire("Atencion", "selecione si es contable o no contable", "warning");
      return;
    }
    const formData = new FormData();
    formData.append('key', this._env.SECRET_KEY);
    formData.append('id', this.ItemsParameters['id']);
    formData.append('name', this.ItemsParameters['name']);
    formData.append('price', this.ItemsParameters['price']);
    formData.append('price_fraction', this.ItemsParameters['price_fraction']);
    formData.append('status_id', this.ItemsParameters['status_id']);
    formData.append('quote_type_id', this.ItemsParameters['quote_type_id']);
    formData.append('details', this.ItemsParameters['details']);
    formData.append('note', this.ItemsParameters['note']);
    formData.append('service_condition', this.ItemsParameters['service_condition']);
    formData.append('contable', this.ItemsParameters['contable']);
    formData.append('item_type', this.ItemsParameters['item_type']);
    formData.append('voting_details', this.ItemsParameters['voting_details']);
    formData.append('show_quantity', this.ItemsParameters['show_quantity']);
    formData.append('order', this.ItemsParameters['order']);
    formData.append('file', this.fileData!);
    this.createOrEditItem.CreateTypeItems(formData);
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting'])
  }
  goListItems() {
    this.router.navigate(['home/itemslist'])
  }
  // cargar imagenes//
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();

  }
  preview() {
    // Show preview
    var mimeType = this.fileData!.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData!);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }
}
