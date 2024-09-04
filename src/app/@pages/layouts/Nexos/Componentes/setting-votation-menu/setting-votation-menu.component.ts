import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
 
import swal from 'sweetalert2';

@Component({
  selector: 'app-setting-votation-menu',
  templateUrl: './setting-votation-menu.component.html',
  styleUrls: ['./setting-votation-menu.component.scss']
})
export class SettingVotationMenuComponent implements OnInit {
  userStorage: any;

  constructor(private router: Router,
     
     ) {
    this.userStorage = JSON.parse(sessionStorage.getItem('user')!)!;

    // tslint:disable-next-line: max-line-length
    if (this.userStorage['profile'] === 'Super Usuario' || this.userStorage['profile'] === 'Supervisor' || this.userStorage['profile'] === 'Moderador') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }

    // tslint:disable-next-line: max-line-length
    if (this.userStorage === null || this.userStorage === 'null' || this.userStorage === undefined || this.userStorage === 'undefined' || this.userStorage === '' || this.userStorage['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['home/']);
  }
  goListSetEnable() {
    this.router.navigate(['home/setListEnable']);
  }
  goListItems() {
    this.router.navigate(['home/searchSets']);
  }
  goPointControl() {
    this.router.navigate(['home/pointControl']);
  }
  goListEmails() {
    this.router.navigate(['home/menusettingEmail']);
  }
  goListProfileVotation() {
    this.router.navigate(['home/listProfileVotation']);
  }
  goSearchVituralVotes() {
    this.router.navigate(['home/buscarConjunto']);
  }
  goEditarBase() {
    this.router.navigate(['home/editar_base_list']);
  }
  goMasiveUnion() {
    this.router.navigate(['home/unionMasiveList']);
  }
  goQr() {
  }

  goToUnits() {
    this.router.navigate(['home/searchClient']);
  }
}