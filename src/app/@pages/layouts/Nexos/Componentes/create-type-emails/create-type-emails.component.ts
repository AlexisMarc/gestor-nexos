import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-type-emails',
  templateUrl: './create-type-emails.component.html',
  styleUrls: ['./create-type-emails.component.scss']
})
export class CreateTypeEmailsComponent implements OnInit {

  constructor(private router: Router,
     
     
  ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    

    // tslint:disable-next-line: max-line-length
    if (userStorage['profile'] === 'Super Usuario') {
    } else {
      Swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

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
  creartypeEmails() {

  }
}
