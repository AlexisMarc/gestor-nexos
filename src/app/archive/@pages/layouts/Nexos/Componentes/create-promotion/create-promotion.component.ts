import { Component, OnInit, Input, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { CreateOrEditDiscountService } from '../../service/create-or-edit-discount.service';
import Swal from 'sweetalert2';
import { EnvServiceService } from '@env';
 


@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.scss']
})
export class CreatePromotionComponent implements OnInit {
  private _env = inject(EnvServiceService)
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
    formData.append('key', this._env.SECRET_KEY)
    formData.append('id', this.createDiscounts['id'])
    formData.append('name', this.createDiscounts['name'])
    formData.append('status_id', this.createDiscounts['status_id'])
    formData.append('price', this.createDiscounts['price'])

    this.createOrEditDiscount.CreatetDiscount(formData);
  }
}
