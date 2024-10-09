import { Component, OnInit, Inject, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../interface/globals.model';
import { ItemsCant } from '../../interface/itemscant.model';
import { ItemSave } from '../../interface/itemsave.model';
import Swal from 'sweetalert2';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-additems',
  templateUrl: './additems.component.html',
  styleUrls: ['./additems.component.scss'],
})
export class AdditemsComponent implements OnInit {
  private _env = inject(EnvServiceService)
  quote_type_id = '1';
  listItems: { [key: string]: any }[] = [];
  listadoItems: [] = [];
  listadoItemsCant: ItemsCant[] = [];
  listadoItemsSave: ItemSave[] = [];
  cantidad: any;
  id_building!: string;
  id_quote!: string;
  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private globals: Globals,
    private route: ActivatedRoute
  ) {
    const userStorage: any = JSON.parse(sessionStorage.getItem('user')!)!;
    if (globals.quote_type_id > 0) {
      if (globals.quote_type_id === '5') {
        this.quote_type_id = '1';
      } else {
        this.quote_type_id = globals.quote_type_id;
      }
    } else {
      this.quote_type_id = '1';
    }
    // tslint:disable-next-line: max-line-length
    if (
      userStorage['profile'] === 'Super Usuario' ||
      userStorage['profile'] === 'Supervisor' ||
      userStorage['profile'] === 'Moderador' ||
      userStorage['profile'] === 'Asesor'
    ) {
    } else {
      Swal.fire(
        'Atención',
        'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia',
        'error'
      );
      this.router.navigate(['/home/pointControl']);
      return;
    }

    // tslint:disable-next-line: max-line-length
    if (
      userStorage === null ||
      userStorage === 'null' ||
      userStorage === undefined ||
      userStorage === 'undefined' ||
      userStorage === '' ||
      userStorage['status_id'] === 0
    ) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }

    this.id_building = this.route.snapshot.paramMap.get('id')!;
    this.id_quote = this.route.snapshot.paramMap.get('id_quote')!;

    // Obtener todos los items a cotizar
    // tslint:disable-next-line: max-line-length
    this.httpClient
      .get(
        this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+
          'QuoteServices/getAllItemsToSellByTypeQuote?key=' +
          this._env.SECRET_KEY +
          '&quote_type_id=' +
          this.quote_type_id
      )
      .subscribe((resp2: any) => {
        this.listItems = resp2['content'];
        for (let index3 = 0; index3 < this.listItems.length; index3++) {
          for (let index4 = 0; index4 < globals.listadoItems.length; index4++) {
            if (
              globals.listadoItems[index4]['item_price_id'] ===
              this.listItems[index3]['item_price_id']
            ) {
              this.listadoItemsCant[index3] =
                globals.listadoItems[index4]['quantity'];
            }
          }
        }
      });
  }

  ngOnInit() {}

  goHome() {
    this.router.navigate(['/home']);
  }

  goAddItems() {
    this.router.navigate(['/home/additems']);
  }

  goCreateQuote() {
    this.router.navigate([
      '/home/createquote/' + this.id_building + '/' + this.id_quote,
    ]);
  }
  goQuote() {
    this.router.navigate(['/home/quote']);
  }
  saveItems() {
    this.listadoItemsSave = [];
    for (let index = 0; index < this.listItems.length; index++) {
      const x = this.listadoItemsCant[index];
      if (this.listadoItemsCant[index] === true) {
        this.cantidad = 1;
      } else {
        if (x) {
          this.cantidad = this.listadoItemsCant[index];
        }
      }
      if (this.cantidad > 0) {
        const item = new ItemSave(
          this.listItems[index]['item_price_id'],
          '',
          this.listItems[index]['name'],
          this.cantidad,
          this.listItems[index]['price_fraction'],
          this.listItems[index]['price']
        );
        this.listadoItemsSave.push(item);
      }
      this.cantidad = 0;
    }
    if (this.listadoItemsSave.length === 0) {
      Swal.fire('Atencion', 'No agrego items', 'warning');
      this.router.navigate([
        '/home/createquote/' + this.id_building + '/' + this.id_quote,
      ]);
      return;
    }
    this.globals.listadoItems = [];
    for (let index2 = 0; index2 < this.listadoItemsSave.length; index2++) {
      const item = new ItemSave(
        this.listadoItemsSave[index2]['item_price_id'],
        this.listadoItemsSave[index2]['total'],
        this.listadoItemsSave[index2]['name'],
        this.listadoItemsSave[index2]['quantity'],
        this.listadoItemsSave[index2]['price_fraction'],
        this.listadoItemsSave[index2]['price']
      );
      this.globals.listadoItems.push(item);
    }
    this.router.navigate([
      '/home/createquote/' + this.id_building + '/' + this.id_quote,
    ]);
  }
}
