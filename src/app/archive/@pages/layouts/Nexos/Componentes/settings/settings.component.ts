import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import Swal from 'sweetalert2';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private router: Router,  
     
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
    }}

  ngOnInit() {
  }

  goListProfile() {
    this.router.navigate(['home/profilelist']);
  }
  goListUser() {
    this.router.navigate(['home/userlist']);
  }
  goHome() {
    this.router.navigate(['home/']);
  }
  goListPromotion() {
    this.router.navigate(['home/Promotionlist']);
  }
  goListItems() {
    this.router.navigate(['home/itemslist']);
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting']);
  }
  goQutationRate() {
    this.router.navigate(['home/qutationratelist']);
  }
  goListTextEmail() {
    this.router.navigate(['home/textEmailList']);
  }
  goListCity() {
    this.router.navigate(['home/cityList']);
  }
}
