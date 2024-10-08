 import { Component, OnInit, Inject, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { Globals } from '../../interface/globals.model';
 
import swal from 'sweetalert2';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-emails-icloud',
  templateUrl: './emails-icloud.component.html',
  styleUrls: ['./emails-icloud.component.scss']
})
export class EmailsIcloudComponent implements OnInit {
  private _env = inject(EnvServiceService)
allEmail: any;
user_id: any;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private globals: Globals,
     
     ) {

    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    this.user_id = userStorage['id'];
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }

    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' ||  userStorage === '' || userStorage['status_id'] === 0 ) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    // Obtener all Emails
    // tslint:disable-next-line: max-line-length
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'ApiEmailContent/getAllEmailContent?key=' + this._env.SECRET_KEY + '&user_id=' + this.user_id)
      .subscribe((resp:any)=> {
        this.allEmail = resp['content'];
      });
  }

  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['home/']);
  }
  
  goConfigIcloud() {
    this.router.navigate(['home/menusettingVoting']);
  }
  goConfigEmail() {
    this.router.navigate(['home/menusettingEmail']);
  }

  goEditEmailsIcloud(idEmail:any) {
    this.router.navigate(['home/editEmailsIcloud/' + idEmail]);
  }

  goCreateEmailIcloud() {
    this.router.navigate(['home/createEmailIcloud']);
  }
}
