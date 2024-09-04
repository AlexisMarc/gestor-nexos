import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-type-emails',
  templateUrl: './edit-type-emails.component.html',
  styleUrls: ['./edit-type-emails.component.scss']
})
export class EditTypeEmailsComponent implements OnInit {

  constructor(private router: Router,  
   ) {
  const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
  
  // tslint:disable-next-line: max-line-length
  if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor') {
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

