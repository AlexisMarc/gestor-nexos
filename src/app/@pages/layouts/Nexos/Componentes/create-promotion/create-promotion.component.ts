import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { CreateOrEditDiscountService } from '../../service/create-or-edit-discount.service';
import Swal from 'sweetalert2';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';


@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.scss']
})
export class CreatePromotionComponent implements OnInit {

  @Input() createDiscounts = {
    name: '',
    id: '0',
    status_id: '1',
    price: '',
  };

  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private createOrEditDiscount: CreateOrEditDiscountService,
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
   // tslint:disable-next-line: max-line-length
   if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' ||  userStorage === '' || userStorage['content']['status_id'] === 0 ) {
    sessionStorage.clear();
    this.router.navigate(['/']);
  } }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/home'])
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting'])
  }
  goListPromotion() {
    this.router.navigate(['home/Promotionlist'])
  }
  createPromotionNew() {
    if (this.createDiscounts.name == '') {
      Swal.fire("Atencion", "El nombre de la promoocion  es obligatorio", "warning");
      return
    }
    if (this.createDiscounts.status_id == '') {
      Swal.fire("Atencion", "El estado es obligatorio", "warning");
      return
    }
    if (this.createDiscounts.price == '') {
      Swal.fire("Atencion", "El porcentaje del descuento es obligatorio", "warning");
      return
    }

    const formData = new FormData();
    formData.append('key', this.config.key)
    formData.append('id', this.createDiscounts['id'])
    formData.append('name', this.createDiscounts['name'])
    formData.append('status_id', this.createDiscounts['status_id'])
    formData.append('price', this.createDiscounts['price'])

    this.createOrEditDiscount.CreatetDiscount(formData);
  }
}
