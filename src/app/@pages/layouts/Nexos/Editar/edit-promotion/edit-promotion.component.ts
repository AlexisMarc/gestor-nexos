import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { CreateOrEditDiscountService } from '../../service/create-or-edit-discount.service';
import Swal from 'sweetalert2';
 

@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.scss']
})
export class EditPromotionComponent implements OnInit {

  @Input() createDiscounts = {
    name: '',
    id: '',
    status_id: '',
    price: '',

  }

  idDiscounts!: string;

  constructor(

    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private EditDiscount: CreateOrEditDiscountService,
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
    this.idDiscounts = this.route.snapshot.paramMap.get('idDiscount')!

    //get type quote id 
    this.httpClient.get(this.config.endpoint + 'QuoteServices/getMonthlyDiscountById?key=' + this.config.key + '&id=' + this.idDiscounts)
      .subscribe((resp:any)=> {
        this.createDiscounts['name'] = resp['content']['name'];
        this.createDiscounts['id'] = resp['content']['id'];
        this.createDiscounts['status_id'] = resp['content']['status_id'];
        this.createDiscounts['price'] = resp['content']['price'];
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
  goListPromotion() {
    this.router.navigate(['home/Promotionlist'])
  }

  editPromotion() {
    if (this.createDiscounts.name == '') {
      Swal.fire("Atencion", "El nombre de la promocion es obligatorio", "warning");
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

    this.EditDiscount.EditDiscount(formData);
  }
}