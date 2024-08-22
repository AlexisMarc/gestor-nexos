import { Component, OnInit, Input, Inject, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Globals } from '../../interface/globals.model';
import { ItemsQuote } from '../../interface/items.model';
import { ItemSave } from '../../interface/itemsave.model';
import { variance } from 'd3';
import { Discounts } from '../../interface/discounts.model';
import { CreatecuoteService } from '../../service/createcuote.service';
import Swal from 'sweetalert2';
import { isUndefined } from 'util';

@Component({
  selector: 'app-createquote',
  templateUrl: './createquote.component.html',
  styleUrls: ['./createquote.component.scss']
})
export class CreatequoteComponent implements OnInit {
  text = "Ocultar";
  dataResidential: [] = [];
  dataAdministrator: [] = [];
  dataQuote: [] = [];
  id_building: string;
  id_quote: string;
  id_user: string;
  activeCity: [] = [];
  activeDiscount: [] = [];
  listItems: ItemSave[] = [];
  saveResidential: [] = [];
  listadoItemsSave: ItemSave[] = [];
  listItemsSave: ItemSave[] = [];
  totalQuote = 0;
  observationsQuote: string;
  dateQuote: any;
  discountSelect: any;
  listDiscounts: Discounts[] = [];
  promotionText: string;
  promotionValue: any;
  promotionPercent = 0;
  DevicePercent = 80;
  DeviceCant: any;
  residentialdata: any;
  quote_type_id: any;
  totalproperties: any;
  dateNow: any;
  promotion2Value: any;
  promotion2Percent: any;
  totalItems: any;
  AccessSecurityPercentDevice = false;

  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private globals: Globals,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService,
    private route: ActivatedRoute,
    private createcuoteService: CreatecuoteService) {

    this.promotion2Percent = 0;
    this.quote_type_id = globals.quote_type_id;
    this.discountSelect = 'value';
    this.dataResidential['city_id'] = '1'
    this.id_building = this.route.snapshot.paramMap.get("id");
    this.id_quote = this.route.snapshot.paramMap.get("id_quote");
    const userStorage = this.storage.get('user');
    // this.listItems = this.globals.listadoItems;

    if (userStorage == null || userStorage == undefined || userStorage == '') {
      this.storage.remove('user');
      this.router.navigate(['/']);
    }
    // tslint:disable-next-line: max-line-length
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor' || userStorage['content']['profile'] === 'Moderador' || userStorage['content']['profile'] === 'Asesor') {
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
    else {
      this.id_user = userStorage['content']['id'];
    }
    // get all active discounts
    this.httpClient.get(this.config.endpoint + 'QuoteServices/getAllActiveMonthlyDiscounts?key=' + this.config.key)
      .subscribe(resp3 => {
        this.activeDiscount = resp3['content'];
      });

    // obtener datos del conjunto por residencial_id
    if (this.id_building == '0' || this.dataResidential == undefined) {
      this.dataResidential['id'] = ''
      this.dataResidential['name'] = ''
      this.dataResidential['status_id'] = '1';
      this.dataResidential['description'] = ''
      this.dataResidential['schedule'] = ''
      this.dataResidential['facebook'] = ''
      this.dataResidential['twitter'] = ''
      this.dataResidential['instagram'] = ''
      this.dataResidential['latitude'] = ''
      this.dataResidential['longitude'] = ''
      this.dataResidential['created_at'] = ''
      this.dataResidential['updated_at'] = ''
      this.dataResidential['email'] = ''
      this.dataResidential['phone'] = ''
      this.dataResidential['website'] = ''
      this.dataResidential['nit'] = ''
      this.dataResidential['address'] = ''
      this.dataResidential['city_id'] = '1'
      this.dataResidential['total_properties'] = 0;
      this.dataAdministrator['id'] = ''
      this.dataAdministrator['name'] = ''
      this.dataAdministrator['email'] = ''
      this.dataAdministrator['phone'] = ''
    } else {
      if (globals.dataQuote['name_residential']) { 
      } else {
        // tslint:disable-next-line: max-line-length
        this.httpClient.get(this.config.endpoint + 'ResidentialServices/getResidentialById?key=' + this.config.key + '&residential_id=' + this.id_building)
          .subscribe(resp1 => {
            this.dataResidential = resp1['content'];
            this.totalproperties = this.dataResidential['total_properties'];
            this.DeviceCant = Math.round((this.totalproperties * 1) * (this.DevicePercent * 1) / 100);
            // tslint:disable-next-line: max-line-length
            if (resp1['content']['encargado'] == null || resp1['content']['encargado'] == undefined || resp1['content']['encargado'] == '') {
              this.dataAdministrator['name'] = '';
              this.dataAdministrator['phone'] = '';
            } else {
              this.dataAdministrator = resp1['content']['encargado'];
            }
            // tslint:disable-next-line: max-line-length
            if (this.dataResidential['city_id'] == '' || this.dataResidential['city_id'] == null || this.dataResidential['city_id'] == undefined) {
              this.dataResidential['city_id'] = '1';
            }
          });
      }
    }

    if (globals.dataQuote['name_residential'] || this.globals.dataQuote['date_quote'] || this.globals.dataQuote['units']) {
      this.dataResidential['name'] = this.globals.dataQuote['name_residential'];
      this.dataAdministrator['name'] = this.globals.dataQuote['name_administrator'];
      this.dataResidential['nit'] = this.globals.dataQuote['nit'];
      this.dataResidential['total_properties'] = this.globals.dataQuote['units'];
      this.totalproperties = this.dataResidential['total_properties'];
      this.dataResidential['phone'] = this.globals.dataQuote['phone'];
      this.dataAdministrator['phone'] = this.globals.dataQuote['phone2'];
      this.dataResidential['email'] = this.globals.dataQuote['email'];
      this.dataResidential['address'] = this.globals.dataQuote['address'];
      this.dataResidential['city_id'] = this.globals.dataQuote['id_city'];
      this.dateQuote = this.globals.dataQuote['date_quote'];
      this.DevicePercent = this.globals.dataQuote['percent_device'];
      this.observationsQuote = this.globals.dataQuote['observation_quote'];
      this.discountSelect = this.globals.dataQuote['id_promotion'];
      this.promotionText = this.globals.dataQuote['text_promotion'];
      this.promotionValue = this.globals.dataQuote['value_promotion'];
      this.promotionPercent = this.globals.dataQuote['percent_promotion'] * 1;
    }

    //Poner globals en tabla items
    if (this.globals.listadoItems.length > 0) {
      this.listItems = [];
      this.DeviceCant = Math.round((this.totalproperties * 1) * (this.DevicePercent * 1) / 100);
      for (let index = 0; index < this.globals.listadoItems.length; index++) {
        if (this.globals.listadoItems[index]['item_price_id'] == '5') {
          if (this.totalproperties < 51) {
            let varItem = new ItemSave(
              this.globals.listadoItems[index]['item_price_id'],
              this.globals.listadoItems[index]['price'],
              this.globals.listadoItems[index]['name'],
              this.globals.listadoItems[index]['quantity'],
              this.globals.listadoItems[index]['price_fraction'],
              this.globals.listadoItems[index]['price'])
            this.listItems.push(varItem)
          }
          else {
            let total = (Math.ceil((this.totalproperties - 50) / 50) * 50000) * 1 + this.globals.listadoItems[index]['price'] * 1;
            let varItem = new ItemSave(
              this.globals.listadoItems[index]['item_price_id'],
              total,
              this.globals.listadoItems[index]['name'],
              this.globals.listadoItems[index]['quantity'],
              this.globals.listadoItems[index]['price_fraction'],
              this.globals.listadoItems[index]['price'])
            this.listItems.push(varItem)
          }
        }
        else {
          if (this.globals.listadoItems[index]['item_price_id'] == '4') {
            let varItem = new ItemSave(
              this.globals.listadoItems[index]['item_price_id'],
              this.DeviceCant * this.globals.listadoItems[index]['price'],
              this.globals.listadoItems[index]['name'],
              this.DeviceCant,
              this.globals.listadoItems[index]['price_fraction'],
              this.globals.listadoItems[index]['price'])
            this.listItems.push(varItem)
          }
          else {
            let varItem = new ItemSave(
              this.globals.listadoItems[index]['item_price_id'],
              this.globals.listadoItems[index]['quantity'] * this.globals.listadoItems[index]['price'],
              this.globals.listadoItems[index]['name'],
              this.globals.listadoItems[index]['quantity'],
              this.globals.listadoItems[index]['price_fraction'],
              this.globals.listadoItems[index]['price'])
            this.listItems.push(varItem)
          }
        }
      }
    }

    //get all active city
    this.httpClient.get(this.config.endpoint + 'ResidentialServices/getAllActiveCities?key=' + this.config.key)
      .subscribe(resp2 => {
        this.activeCity = resp2['content'];
      });

    //get quote by id 
    if (this.id_quote == '0' || this.id_quote == undefined || this.id_quote == null) {
      this.observationsQuote = '';
      if (this.globals.dataQuote['date_quote']) {
        
      }
      else{
        this.dateQuote = '';
      }
      this.listadoItemsSave = [];
    }
    else {
      this.httpClient.get(this.config.endpoint + 'QuoteServices/getQuoteById?key=' + this.config.key + '&id=' + this.id_quote)
        .subscribe(resp4 => {
          this.DevicePercent = resp4['content']['device_percentage'] * 1;
          this.DeviceCant = Math.round((this.totalproperties * 1) * (this.DevicePercent * 1) / 100);
          this.observationsQuote = resp4['content']['observations'];
          let var2 = resp4['content']['date'].split(" ", 1);
          if (this.globals.dataQuote['date_quote']) {
            
          }
          else {
            this.dateQuote = var2[0];
          }
          for (let index = 0; index < resp4['content']['items'].length; index++) {
            if (resp4['content']['items'][index]['item_price_id'] == '5') {
              if (this.totalproperties < 51) {
                this.totalItems = resp4['content']['items'][index]['price'];
              }
              else {
                this.totalItems = (Math.ceil((this.totalproperties - 50) / 50) * 50000) * 1 + resp4['content']['items'][index]['price'] * 1;
              }
            }
            else {
              if (resp4['content']['items'][index]['item_price_id'] == '4') {
                this.totalItems = resp4['content']['items'][index]['price'] * resp4['content']['items'][index]['quantity']
              }
              else {
                this.totalItems = resp4['content']['items'][index]['price'] * resp4['content']['items'][index]['quantity']
              }
            }
            let item = new ItemSave(
              resp4['content']['items'][index]['id'],
              this.totalItems,
              resp4['content']['items'][index]['name'],
              resp4['content']['items'][index]['quantity'],
              resp4['content']['items'][index]['price_fraction'],
              resp4['content']['items'][index]['price'],
            )
            this.listadoItemsSave.push(item);
          }

          if (this.listItems.length > 0) {
          }
          else {
            this.globals.listadoItems = [];
            for (let index2 = 0; index2 < this.listadoItemsSave.length; index2++) {
              this.globals.listadoItems[index2] = this.listadoItemsSave[index2];
            }
            for (let index = 0; index < this.globals.listadoItems.length; index++) {
              if (this.globals.listadoItems[index]['item_price_id'] == '4') {
                let total = this.globals.listadoItems[index]['quantity'] * this.globals.listadoItems[index]['price'];
                let varItem = new ItemSave(
                  this.globals.listadoItems[index]['item_price_id'],
                  total,
                  this.globals.listadoItems[index]['name'],
                  this.globals.listadoItems[index]['quantity'],
                  this.globals.listadoItems[index]['price_fraction'],
                  this.globals.listadoItems[index]['price'])
                this.listItems.push(varItem)
              }
              else {
                if (this.globals.listadoItems[index]['item_price_id'] == '5') {
                  if (this.totalproperties < 51) {
                    let total = this.globals.listadoItems[index]['price'];
                    let varItem = new ItemSave(
                      this.globals.listadoItems[index]['item_price_id'],
                      total,
                      this.globals.listadoItems[index]['name'],
                      this.globals.listadoItems[index]['quantity'],
                      this.globals.listadoItems[index]['price_fraction'],
                      this.globals.listadoItems[index]['price'])
                    this.listItems.push(varItem)
                  }
                  else {
                    let total = (Math.ceil((this.totalproperties - 50) / 50) * 50000) * 1 + this.globals.listadoItems[index]['price'] * 1;
                    let varItem = new ItemSave(
                      this.globals.listadoItems[index]['item_price_id'],
                      total,
                      this.globals.listadoItems[index]['name'],
                      this.globals.listadoItems[index]['quantity'],
                      this.globals.listadoItems[index]['price_fraction'],
                      this.globals.listadoItems[index]['price'])
                    this.listItems.push(varItem)
                  }
                }
                else {
                  let total = this.globals.listadoItems[index]['quantity'] * this.globals.listadoItems[index]['price'];
                  let varItem = new ItemSave(
                    this.globals.listadoItems[index]['item_price_id'],
                    total,
                    this.globals.listadoItems[index]['name'],
                    this.globals.listadoItems[index]['quantity'],
                    this.globals.listadoItems[index]['price_fraction'],
                    this.globals.listadoItems[index]['price'])
                  this.listItems.push(varItem)
                }
              }

            }
            //this.listItems = this.globals.listadoItems;

          }

          if (isUndefined(resp4['content']['discounts'].length > 0)) {
            if (resp4['content']['discounts'][0]['discount_id'] > 0 && resp4['content']['discounts'][0]['discount_id'] != null) {
              for (let index5 = 0; index5 < this.activeDiscount.length; index5++) {
                if (this.activeDiscount[index5]['id'] == resp4['content']['discounts'][0]['discount_id']) {
                  this.discountSelect = index5;
                }
              }
              if (resp4['content']['discounts'][1]) {
                this.promotionText = resp4['content']['discounts'][1]['name'];
                this.promotionValue = resp4['content']['discounts'][1]['total'];
              }
            }
            else {
              this.promotionText = resp4['content']['discounts'][0]['name'];
              this.promotionValue = resp4['content']['discounts'][0]['total'];
            }
          }
        });
    }


    let myDate = Date.now();

    if (((new Date(myDate)).getUTCMonth() + 1) <= 9) {
      this.dateNow = ((new Date(myDate)).getFullYear() + '-0' + ((new Date(myDate)).getUTCMonth() + 1) + '-' + (new Date(myDate)).getDate());
    }
    else {
      this.dateNow = ((new Date(myDate)).getFullYear() + '-' + ((new Date(myDate)).getUTCMonth() + 1) + '-' + (new Date(myDate)).getDate());
    }

    if (this.discountSelect != 'value') {
      this.promotion2Percent = this.activeDiscount[this.discountSelect]['price'];
    }
    else {
      this.promotion2Percent = 0;
    }
  }

  ngOnInit() {
    //this.DeviceCant = Math.round(this.totalproperties * this.DevicePercent / 100);
  }

  goHome() {
    this.router.navigate(['/home'])
  }

  goAddItems() {
    this.globals.dataQuote['name_residential'] = this.dataResidential['name'];
    this.globals.dataQuote['name_administrator'] = this.dataAdministrator['name'];
    this.globals.dataQuote['nit'] = this.dataResidential['nit'];
    this.globals.dataQuote['units'] = this.totalproperties;
    this.globals.dataQuote['phone'] = this.dataResidential['phone'];
    this.globals.dataQuote['phone2'] = this.dataAdministrator['phone'];
    this.globals.dataQuote['email'] = this.dataResidential['email'];
    this.globals.dataQuote['address'] = this.dataResidential['address'];
    this.globals.dataQuote['id_city'] = this.dataResidential['city_id'];
    this.globals.dataQuote['date_quote'] = this.dateQuote;
    this.globals.dataQuote['percent_device'] = this.DevicePercent;
    this.globals.dataQuote['observation_quote'] = this.observationsQuote;
    this.globals.dataQuote['id_promotion'] = this.discountSelect;
    this.globals.dataQuote['text_promotion'] = this.promotionText;
    this.globals.dataQuote['value_promotion'] = this.promotionValue;
    this.globals.dataQuote['percent_promotion'] = this.promotionPercent;
    if (this.id_quote == '') {
      this.id_quote = '0';
    }
    this.globals.listadoItems = [];
    for (let index2 = 0; index2 < this.listItems.length; index2++) {
      let item = new ItemSave(
        this.listItems[index2]['item_price_id'],
        this.listItems[index2]['total'],
        this.listItems[index2]['name'],
        this.listItems[index2]['quantity'],
        this.listItems[index2]['price_fraction'],
        this.listItems[index2]['price']
      )
      this.globals.listadoItems.push(item);
    }
    this.router.navigate(['/home/additems/' + this.id_building + '/' + this.id_quote])
  }

  goQuote() {
    this.router.navigate(['/home/quote'])
  }

  changeText() {
    if (this.text == "Mostrar") {
      this.text = "Ocultar";
    }
    else {
      if (this.text == "Ocultar") {
        this.text = "Mostrar";
      }
    }
  }

  createQuote() {
    this.DeviceCant = Math.round(this.totalproperties * this.DevicePercent / 100);
    this.listDiscounts = [];
    this.listItemsSave = [];
    this.saveResidential['id'] = this.dataResidential['id']
    this.saveResidential['name'] = this.dataResidential['name']
    this.saveResidential['administrator'] = this.dataAdministrator['name']
    this.saveResidential['nit'] = this.dataResidential['nit']
    this.saveResidential['phone'] = this.dataResidential['phone']
    this.saveResidential['phone2'] = this.dataAdministrator['phone']
    this.saveResidential['email'] = this.dataResidential['email']
    this.saveResidential['address'] = this.dataResidential['address']
    this.saveResidential['city_id'] = this.dataResidential['city_id']
    for (let index = 0; index < this.listItems.length; index++) {
      if (this.listItems[index]['item_price_id'] == '4') {
        let total = this.DeviceCant * this.listItems[index]['price'];
        let varItem = new ItemSave(
          this.listItems[index]['item_price_id'],
          total,
          this.listItems[index]['name'],
          this.DeviceCant,
          this.listItems[index]['price_fraction'],
          this.listItems[index]['price'])
        this.listItemsSave.push(varItem)
      }
      else {
        if (this.listItems[index]['item_price_id'] == '5') {
          if (this.totalproperties < 51) {
            let total = this.listItems[index]['price'];
            let varItem = new ItemSave(
              this.listItems[index]['item_price_id'],
              this.listItems[index]['total'],
              this.listItems[index]['name'],
              this.listItems[index]['quantity'],
              this.listItems[index]['price_fraction'] * this.listItems[index]['quantity'],
              this.listItems[index]['price'])
            this.listItemsSave.push(varItem)
          }
          else {
            let total = (Math.ceil((this.totalproperties - 50) / 50) * 50000) * 1 + this.listItems[index]['price'] * 1;
            let varItem = new ItemSave(
              this.listItems[index]['item_price_id'],
              this.listItems[index]['total'],
              this.listItems[index]['name'],
              this.listItems[index]['quantity'],
              this.listItems[index]['price_fraction'] * this.listItems[index]['quantity'],
              this.listItems[index]['price'])
            this.listItemsSave.push(varItem)
          }
        }
        else {
          let total = this.listItems[index]['quantity'] * this.listItems[index]['price'];
          let varItem = new ItemSave(
            this.listItems[index]['item_price_id'],
            this.listItems[index]['total'],
            this.listItems[index]['name'],
            this.listItems[index]['quantity'],
            this.listItems[index]['price_fraction'] * this.listItems[index]['quantity'],
            this.listItems[index]['price'])
          this.listItemsSave.push(varItem)
        }
      }
    }

    for (let index2 = 0; index2 < this.listItemsSave.length; index2++) {
      this.totalQuote = (this.totalQuote * 1) + (this.listItemsSave[index2]['total'] * 1);
    }

    if (this.discountSelect != '' && this.discountSelect != null && this.discountSelect != undefined && this.discountSelect != "value") {
      let discount = new Discounts(
        this.activeDiscount[this.discountSelect]['name'],
        this.activeDiscount[this.discountSelect]['price'],
        this.activeDiscount[this.discountSelect]['id'])
      this.listDiscounts.push(discount);
    }

    if (this.promotionText != '' && this.promotionText != null && this.promotionText != undefined) {
      if (this.promotionValue > 0 && this.promotionValue != '') {
        let discount2 = new Discounts(
          this.promotionText,
          this.promotionValue,
          '')
        this.listDiscounts.push(discount2);
      }
      else {
        if (this.promotionPercent > 0) {
          let discount2 = new Discounts(
            this.promotionText,
            this.promotionPercent,
            '')
          this.listDiscounts.push(discount2);
        }
      }
    }

    let totalQuotation = JSON.stringify(this.totalQuote);
    let items = JSON.stringify(this.listItemsSave);
    if (this.id_building == '0') {
      this.id_building = '';
    }
    if (this.dataResidential['id']) {
      let residential = JSON.stringify({
        'id': this.id_building,
        'name': this.dataResidential['name'],
        'administrator': this.dataAdministrator['name'],
        'nit': this.dataResidential['nit'],
        'phone': this.dataResidential['phone'],
        'phone2': this.dataAdministrator['phone'],
        'email': this.dataResidential['email'],
        'address': this.dataResidential['address'],
        'city_id': this.dataResidential['city_id'],
        'total_properties': this.totalproperties
      })
      this.residentialdata = residential;
    }
    else {
      let residential = JSON.stringify({
        'id': this.id_building,
        'name': this.dataResidential['name'],
        'administrator': this.dataAdministrator['name'],
        'nit': this.dataResidential['nit'],
        'phone': this.dataResidential['phone'],
        'phone2': this.dataAdministrator['phone'],
        'email': this.dataResidential['email'],
        'address': this.dataResidential['address'],
        'city_id': this.dataResidential['city_id'],
        'total_properties': this.totalproperties
      })
      this.residentialdata = residential;
    }

    let discounts = JSON.stringify(this.listDiscounts)

    if (this.quote_type_id == '' || this.quote_type_id == null || this.quote_type_id == undefined) {
      this.quote_type_id = '1';
    }
    if (this.dataResidential['name'] == '') {
      Swal.fire("Atencion", "El nombre del conjunto es obligatorio", "warning");
      return
    }
    if (this.dataAdministrator['name'] == '') {
      Swal.fire("Atencion", "El nombre del encargado es obligatorio", "warning");
      return
    }
    if (this.dataResidential['nit'] == '') {
      Swal.fire("Atencion", "El nit es obligatorio", "warning");
      return
    }
    if (this.totalproperties == undefined || this.totalproperties == 0 || this.totalproperties == '') {
      Swal.fire("Atencion", "Las unidades son obligatorias", "warning");
      return
    }
    if (this.dataAdministrator['phone'] == '') {
      Swal.fire("Atencion", "El telefono del administrador es obligatorio", "warning");
      return
    }
    if (this.dataResidential['email'] == '') {
      Swal.fire("Atencion", "El correo electronico es obligatorio", "warning");
      return
    }
    const emailFormat = this.validateEmail(this.dataResidential['email'])
    if (!emailFormat) {
      Swal.fire("Atencion", "El formato del email no es correcto", "warning");
      return
    }
    if (this.dataResidential['city_id'] == '') {
      Swal.fire("Atencion", "La ciudad es obligatoria", "warning");
      return
    }
    if (this.listItemsSave.length == 0) {
      Swal.fire("Atencion", "no ha seleccionado ningun item", "warning");
      return
    }
    if ((this.promotionPercent * 1) + (this.promotion2Percent * 1) > 15) {
      Swal.fire({
        title: '<strong>Ha superado el maximo descuento permitido en %</strong>',
        type: 'question',
        html:
          'Consulte con gerencia esta decision y poner la clave aqui:' +
          '<br><input type="password" id="codeSecurity" value="" style="width: 100%;padding: 12px 20px;margin: 8px 0;display: inline-block;border: 1px solid #ccc;border-radius: 4px; box-sizing: border-box;">',

        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'rgba(255, 115, 0)',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmado'
      }).then((result) => {
        if (result.value) {
          let texto = (<HTMLInputElement>document.getElementById("codeSecurity")).value;
          if (texto == 'CEFN2020') {
            this.AccessSecurityPercentDevice = true;
            if (this.id_quote == '0') {
              this.id_quote = '';
            }
            Swal.fire({
              title: '<strong>Atención</strong>',
              type: 'info',
              html:
                'Esta seguro que desea guardar  esta informacion',
              showCancelButton: true,
              confirmButtonColor: 'rgba(255, 115, 0)',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Guardar y Enviar'
            }).then((result) => {
              if (result.value) {
                const formData = new FormData();
                formData.append('key', this.config.key);
                formData.append('id', this.id_quote);
                formData.append('observations', this.observationsQuote);
                formData.append('date', this.dateQuote);
                formData.append('total', totalQuotation);
                formData.append('discounts', discounts);
                formData.append('items', items);
                formData.append('residential', this.residentialdata);
                formData.append('quote_type_id', this.quote_type_id);
                formData.append('device_percentage', this.DevicePercent + '');
                formData.append('user_id', this.id_user);

                this.createcuoteService.CreateQuote(formData, this.id_user);

                this.globals.dataQuote = [];
              }
            })
          }
          else {
            Swal.fire("Atencion", "Clave incorrecta", "warning");
            return
          }
        }
      });
      return
    }

    if (this.DevicePercent < 80) {
      Swal.fire({
        title: '<strong>El porcentaje de dispositivos no puede ser inferior al 80%</strong>',
        type: 'question',
        html:
          'Consulte con gerencia esta decision y poner la clave aqui:' +
          '<br><input type="password" id="codeSecurity" value="" style="width: 100%;padding: 12px 20px;margin: 8px 0;display: inline-block;border: 1px solid #ccc;border-radius: 4px; box-sizing: border-box;">',

        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'rgba(255, 115, 0)',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmado'
      }).then((result) => {
        if (result.value) {
          let texto = (<HTMLInputElement>document.getElementById("codeSecurity")).value;
          if (texto == 'CEFN2020') {
            this.AccessSecurityPercentDevice = true;
            if (this.id_quote == '0') {
              this.id_quote = '';
            }
            Swal.fire({
              title: '<strong>Atención</strong>',
              type: 'info',
              html:
                'Esta seguro que desea guardar  esta informacion',
              showCancelButton: true,
              confirmButtonColor: 'rgba(255, 115, 0)',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Guardar y Enviar'
            }).then((result) => {
              if (result.value) {
                const formData = new FormData();
                formData.append('key', this.config.key);
                formData.append('id', this.id_quote);
                formData.append('observations', this.observationsQuote);
                formData.append('date', this.dateQuote);
                formData.append('total', totalQuotation);
                formData.append('discounts', discounts);
                formData.append('items', items);
                formData.append('residential', this.residentialdata);
                formData.append('quote_type_id', this.quote_type_id);
                formData.append('device_percentage', this.DevicePercent + '');
                formData.append('user_id', this.id_user);

                this.createcuoteService.CreateQuote(formData, this.id_user);

                this.globals.dataQuote = [];
              }
            })
          }
          else {
            Swal.fire("Atencion", "Clave incorrecta", "warning");
            return
          }
        }
      });
      return
    }

    if (this.id_quote == '0') {
      this.id_quote = '';
    }
    Swal.fire({
      title: '<strong>Atención</strong>',
      type: 'info',
      html:
        'Esta seguro que desea guardar  esta informacion',
      showCancelButton: true,
      confirmButtonColor: 'rgba(255, 115, 0)',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar y Enviar'
    }).then((result) => {
      if (result.value) {
        const formData = new FormData();
        formData.append('key', this.config.key);
        formData.append('id', this.id_quote);
        formData.append('observations', this.observationsQuote);
        formData.append('date', this.dateQuote);
        formData.append('total', totalQuotation);
        formData.append('discounts', discounts);
        formData.append('items', items);
        formData.append('residential', this.residentialdata);
        formData.append('quote_type_id', this.quote_type_id);
        formData.append('device_percentage', this.DevicePercent + '');
        formData.append('user_id', this.id_user);

this.createcuoteService.CreateQuote(formData, this.id_user);

        this.globals.dataQuote = [];
      }
    })
  }
  validateEmail(email: String) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  quitarItem(i) {
    this.listItems.splice(i, 1);
  }

  Changepercent() {
    this.DeviceCant = Math.round(this.totalproperties * this.DevicePercent / 100);
    for (let index = 0; index < this.listItems.length; index++) {
      if (this.listItems[index]['item_price_id'] == '4') {
        let total = this.DeviceCant * this.listItems[index]['price'];
        let varItem = new ItemSave(
          this.listItems[index]['item_price_id'],
          total,
          this.listItems[index]['name'],
          this.DeviceCant,
          this.listItems[index]['price_fraction'],
          this.listItems[index]['price'])
        this.listItemsSave.push(varItem)
      }
      else {
        if (this.listItems[index]['item_price_id'] == '5') {
          if (this.totalproperties < 51) {
            let total = this.listItems[index]['price'];
            let varItem = new ItemSave(
              this.listItems[index]['item_price_id'],
              this.listItems[index]['total'],
              this.listItems[index]['name'],
              this.listItems[index]['quantity'],
              this.listItems[index]['price_fraction'] * this.listItems[index]['quantity'],
              this.listItems[index]['price'])
            this.listItemsSave.push(varItem)
          }
          else {
            let total = (Math.ceil((this.totalproperties - 50) / 50) * 50000) * 1 + this.listItems[index]['price'] * 1;
            let varItem = new ItemSave(
              this.listItems[index]['item_price_id'],
              this.listItems[index]['total'],
              this.listItems[index]['name'],
              this.listItems[index]['quantity'],
              this.listItems[index]['price_fraction'] * this.listItems[index]['quantity'],
              this.listItems[index]['price'])
            this.listItemsSave.push(varItem)
          }
        }
        else {
          let total = this.listItems[index]['quantity'] * this.listItems[index]['price'];
          let varItem = new ItemSave(
            this.listItems[index]['item_price_id'],
            this.listItems[index]['total'],
            this.listItems[index]['name'],
            this.listItems[index]['quantity'],
            this.listItems[index]['price_fraction'] * this.listItems[index]['quantity'],
            this.listItems[index]['price'])
          this.listItemsSave.push(varItem)
        }
      }
    }
  }

  FormatoMadre() {
    this.listItems = [];
    //Obtener todos los items a cotizar
    this.httpClient.get(this.config.endpoint + 'QuoteServices/getAllItemsToSellByTypeQuote?key=' + this.config.key + '&quote_type_id=1')
      .subscribe(resp2 => {
        for (let index3 = 0; index3 < resp2['content'].length; index3++) {
          if (resp2['content'][index3]['id'] == '5') {
            if (this.totalproperties < 51) {
              let total = resp2['content'][index3]['price'];
              let item2 = new ItemSave(
                resp2['content'][index3]['id'],
                total,
                resp2['content'][index3]['name'],
                '1',
                resp2['content'][index3]['price_fraction'],
                resp2['content'][index3]['price'])
              this.listItems.push(item2);
            }
            else {
              let total = (Math.ceil((this.totalproperties - 50) / 50) * 50000) * 1 + resp2['content'][index3]['price'] * 1;
              let item2 = new ItemSave(
                resp2['content'][index3]['id'],
                total,
                resp2['content'][index3]['name'],
                '1',
                resp2['content'][index3]['price_fraction'],
                resp2['content'][index3]['price'])
              this.listItems.push(item2);
            }
          }
          if (resp2['content'][index3]['id'] == '4') {
            let total = resp2['content'][index3]['price'] * this.DeviceCant;
            let item2 = new ItemSave(
              resp2['content'][index3]['id'],
              total,
              resp2['content'][index3]['name'],
              this.DeviceCant,
              resp2['content'][index3]['price_fraction'],
              resp2['content'][index3]['price'])
            this.listItems.push(item2);
          }
          if (resp2['content'][index3]['id'] == '3') {
            let total = (Math.ceil(this.totalproperties* 1 / 100)) * resp2['content'][index3]['price'];
            let item2 = new ItemSave(
              resp2['content'][index3]['id'],
              total,
              resp2['content'][index3]['name'],
              (Math.ceil(this.totalproperties* 1 / 100)),
              resp2['content'][index3]['price_fraction'],
              resp2['content'][index3]['price'])
            this.listItems.push(item2);
          }
          if (resp2['content'][index3]['id'] == '6') {
            let total = resp2['content'][index3]['price'];
            let item2 = new ItemSave(
              resp2['content'][index3]['id'],
              total,
              resp2['content'][index3]['name'],
              '1',
              resp2['content'][index3]['price_fraction'],
              resp2['content'][index3]['price'])
            this.listItems.push(item2);
          }
          if (resp2['content'][index3]['id'] == '7') {
            let total = resp2['content'][index3]['price'];
            let item2 = new ItemSave(
              resp2['content'][index3]['id'],
              total,
              resp2['content'][index3]['name'],
              '1',
              resp2['content'][index3]['price_fraction'],
              resp2['content'][index3]['price'])
            this.listItems.push(item2);
          }

          if (resp2['content'][index3]['id'] == '1') {
            let total = resp2['content'][index3]['price'];
            let item2 = new ItemSave(
              resp2['content'][index3]['id'],
              total,
              resp2['content'][index3]['name'],
              '1',
              resp2['content'][index3]['price_fraction'],
              resp2['content'][index3]['price'])
            this.listItems.push(item2);

            

          }

          if (resp2['content'][index3]['id'] == '2') {
            let total = resp2['content'][index3]['price'];
            let item2 = new ItemSave(
              resp2['content'][index3]['id'],
              total,
              resp2['content'][index3]['name'],
              '1',
              resp2['content'][index3]['price_fraction'],
              resp2['content'][index3]['price'])
            this.listItems.push(item2);

          }
          if (resp2['content'][index3]['id'] == '8') {
            let total = resp2['content'][index3]['price'];
            let item2 = new ItemSave(
              resp2['content'][index3]['id'],
              total,
              resp2['content'][index3]['name'],
              '1',
              resp2['content'][index3]['price_fraction'],
              resp2['content'][index3]['price'])
            this.listItems.push(item2);

          }
          if (resp2['content'][index3]['id'] == '9') {
            let total = resp2['content'][index3]['price'];
            let item2 = new ItemSave(
              resp2['content'][index3]['id'],
              total,
              resp2['content'][index3]['name'],
              '1',
              resp2['content'][index3]['price_fraction'],
              resp2['content'][index3]['price'])
            this.listItems.push(item2);

          }
          if (resp2['content'][index3]['id'] == '10') {
            let total = resp2['content'][index3]['price'];
            let item2 = new ItemSave(
              resp2['content'][index3]['id'],
              total,
              resp2['content'][index3]['name'],
              '1',
              resp2['content'][index3]['price_fraction'],
              resp2['content'][index3]['price'])
            this.listItems.push(item2);
          }
        }
        for (let index = 0; index < this.listItems.length; index++) {
          if (this.listItems[index]['item_price_id'] == '4') {
            let total = this.DeviceCant * this.listItems[index]['price'];
            let varItem = new ItemSave(
              this.listItems[index]['item_price_id'],
              total,
              this.listItems[index]['name'],
              this.DeviceCant,
              this.listItems[index]['price_fraction'],
              this.listItems[index]['price'])
            this.listItemsSave.push(varItem)
          }
          else {
            if (this.listItems[index]['item_price_id'] == '5') {
              if (this.totalproperties < 51) {
                let total = this.listItems[index]['price'];
                let varItem = new ItemSave(
                  this.listItems[index]['item_price_id'],
                  this.listItems[index]['total'],
                  this.listItems[index]['name'],
                  this.listItems[index]['quantity'],
                  this.listItems[index]['price_fraction'] * this.listItems[index]['quantity'],
                  this.listItems[index]['price'])
                this.listItemsSave.push(varItem)
              }
              else {
                let total = (Math.ceil((this.totalproperties - 50) / 50) * 50000) * 1 + this.listItems[index]['price'] * 1;
                let varItem = new ItemSave(
                  this.listItems[index]['item_price_id'],
                  this.listItems[index]['total'],
                  this.listItems[index]['name'],
                  this.listItems[index]['quantity'],
                  this.listItems[index]['price_fraction'] * this.listItems[index]['quantity'],
                  this.listItems[index]['price'])
                this.listItemsSave.push(varItem)
              }
            }
            else {
              let total = this.listItems[index]['quantity'] * this.listItems[index]['price'];
              let varItem = new ItemSave(
                this.listItems[index]['item_price_id'],
                this.listItems[index]['total'],
                this.listItems[index]['name'],
                this.listItems[index]['quantity'],
                this.listItems[index]['price_fraction'] * this.listItems[index]['quantity'],
                this.listItems[index]['price'])
              this.listItemsSave.push(varItem)
            }
          }
        }
        for (let index2 = 0; index2 < this.listItemsSave.length; index2++) {
          this.globals.listadoItems[index2] = this.listItemsSave[index2];
        }
      });
  }

  changePromotion() {
    if (this.discountSelect == 'value') {
      this.promotion2Percent = 0;
    }
    else {
      this.promotion2Percent = this.activeDiscount[this.discountSelect]['price'];
    }
  }
}