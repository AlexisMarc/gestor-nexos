import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import Swal from 'sweetalert2';
 

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  listUsers: [] = [];

  constructor(private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,  
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

    }

  ngOnInit() {
    this.httpClient.get(this.config.endpoint + 'UserServices/getAllUsers?key=' + this.config.key)
      .subscribe((resp:any)=> {
        this.listUsers = resp['content'];

      });
  }
  goCreateUser() {
    this.router.navigate(['home/createuser']);
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  irEditUsers(idUser:any) {
    this.router.navigate(['home/editUsers/' + idUser]);
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting']);
  }
}

