import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit {

  ListDiscounts: [] = [];

  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient, @Inject(SESSION_STORAGE)
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
    this.httpClient.get(this.config.endpoint + 'QuoteServices/getAllDiscounts?key=' + this.config.key)
      .subscribe((resp:any)=> {
        this.ListDiscounts = resp['content'];
      });
  }

  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['/home'])
  }
  goCreatePromotion() {
    this.router.navigate(['home/createPromotion'])
  }
  goEditPromotion(idDiscount:any) {
    this.router.navigate(['home/editPromotion/' + idDiscount])
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting'])
  }
}