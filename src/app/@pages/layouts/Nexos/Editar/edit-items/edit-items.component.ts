import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { CreateOrEditItemService } from '../../service/create-or-edit-item.service';
import Swal from 'sweetalert2';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-items.component.html',
  styleUrls: ['./edit-items.component.scss']
})
export class EditItemsComponent implements OnInit {

  @Input() ItemsParameters = {
    name: '',
    id: '',
    price: '',
    price_fraction: '',
    status_id: '',
    quote_type_id: '0',
    details: '',
    note: '',
    service_condition: '',
    contable: '',
    item_type: '0',
    voting_details: '',
    show_quantity: '1',
    order: ''
  }
  price: any;
  priceFraction: any;
  imgURL: any;
  fileData: File|null = null;
  previewUrl: any = null;
  idItem!: string;
  typeQuote: any;
  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private createOrEditItem: CreateOrEditItemService, @Inject(SESSION_STORAGE)
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
    this.idItem = this.route.snapshot.paramMap.get('idItem')!
    //get item for id
    this.httpClient.get(this.config.endpoint + 'QuoteServices/getItemById?key=' + this.config.key + '&id=' + this.idItem)
      .subscribe((resp:any)=> {
        this.priceFraction = resp['content']['price_fraction'].split(".", 1)
        this.price = resp['content']['price'].split(".", 1)
        this.ItemsParameters['name'] = resp['content']['name'];
        this.ItemsParameters['id'] = resp['content']['id'];
        this.ItemsParameters['price'] = this.price[0]
        this.ItemsParameters['price_fraction'] = this.priceFraction[0]
        this.ItemsParameters['status_id'] = resp['content']['status_id'];
        this.ItemsParameters['quote_type_id'] = resp['content']['quote_type_id'];
        this.ItemsParameters['details'] = resp['content']['details'];
        this.ItemsParameters['note'] = resp['content']['note'];
        this.ItemsParameters['service_condition'] = resp['content']['service_condition'];
        this.ItemsParameters['contable'] = resp['content']['contable'];
        this.ItemsParameters['item_type'] = resp['content']['item_type'];
        this.ItemsParameters['show_quantity'] = resp['content']['show_quantity'];
        this.ItemsParameters['order'] = resp['content']['order'];
        this.fileData = resp['content']['photo'];
        this.previewUrl = resp['content']['photo'];
      })
  }
  ngOnInit() {
    //service type quote
    this.httpClient.get(this.config.endpoint + 'QuoteServices/getAllActiveTypeQuote?key=' + this.config.key)
      .subscribe((resp:any)=> {
        this.typeQuote = resp['content']
      });
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  goEditItems() {
    if (this.ItemsParameters.name == '') {
      Swal.fire("Atencion", "El nombre es obligatorio", "warning");
      return
    }
    if (this.ItemsParameters.price == '') {
      Swal.fire("Atencion", "El precio es obligatorio", "warning");
      return
    }
    if (this.ItemsParameters.quote_type_id == '0') {
      Swal.fire("Atencion", "El tipo de cotizacion es obligatorio", "warning");
      return
    }
    if (this.ItemsParameters.status_id == '') {
      Swal.fire("Atencion", "El estado es obligatorio", "warning");
      return
    }
    if (this.ItemsParameters.details == '') {
      Swal.fire("Atencion", "El detalle es obligatorio", "warning");
      return
    }
    if (this.ItemsParameters.contable == '') {
      Swal.fire("Atencion", "selecione si es contable o no contable", "warning");
      return
    }
    const formData = new FormData();
    formData.append('key', this.config.key);
    formData.append('id', this.ItemsParameters['id']);
    formData.append('name', this.ItemsParameters['name']);
    formData.append('price', this.ItemsParameters['price']);
    formData.append('price_fraction', this.ItemsParameters['price_fraction']);
    formData.append('status_id', this.ItemsParameters['status_id']);
    formData.append('quote_type_id', this.ItemsParameters['quote_type_id']);
    formData.append('item_type', this.ItemsParameters['item_type']);
    formData.append('details', this.ItemsParameters['details']);
    formData.append('note', this.ItemsParameters['note']);
    formData.append('service_condition', this.ItemsParameters['service_condition']);
    formData.append('contable', this.ItemsParameters['contable']);
    formData.append('voting_details', this.ItemsParameters['voting_details']);
    formData.append('show_quantity', this.ItemsParameters['show_quantity']);
    formData.append('order', this.ItemsParameters['order']);
    formData.append('file', this.fileData!);
    this.createOrEditItem.UpdateTypeItems(formData);
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
    }
  }
}
