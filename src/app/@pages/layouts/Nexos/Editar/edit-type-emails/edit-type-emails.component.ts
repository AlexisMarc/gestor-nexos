import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-type-emails',
  templateUrl: './edit-type-emails.component.html',
  styleUrls: ['./edit-type-emails.component.scss']
})
export class EditTypeEmailsComponent implements OnInit {

  constructor(private router: Router, @Inject(SESSION_STORAGE)
  private storage: WebStorageService) {
  const userStorage = this.storage.get('user');
  
  // tslint:disable-next-line: max-line-length
  if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor') {
  } else {
    Swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
    this.router.navigate(['/home']);
    return;

  }

  // tslint:disable-next-line: max-line-length
  if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' ||  userStorage === '' || userStorage['content']['status_id'] === 0 ) {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }}

  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['home/']);
  }
  goConfigEmails() {
    this.router.navigate(['home/menusettingEmail']);
  }
  goListtyoeEmails() {
    this.router.navigate(['home/typeEmails']);
  }
  EdittypeEmails() {

  }




}

