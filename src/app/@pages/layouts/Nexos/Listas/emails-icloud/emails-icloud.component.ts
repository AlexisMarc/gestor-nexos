 import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { Globals } from '../../interface/globals.model';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-emails-icloud',
  templateUrl: './emails-icloud.component.html',
  styleUrls: ['./emails-icloud.component.scss']
})
export class EmailsIcloudComponent implements OnInit {
allEmail: any;
user_id: any;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private globals: Globals,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService) {

    const userStorage = this.storage.get('user');
    this.user_id = userStorage['content']['id'];
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }

    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' ||  userStorage === '' || userStorage['content']['status_id'] === 0 ) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    // Obtener all Emails
    // tslint:disable-next-line: max-line-length
    this.httpClient.get(this.config.endpoint3 + 'ApiEmailContent/getAllEmailContent?key=' + this.config.key + '&user_id=' + this.user_id)
      .subscribe(resp => {
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

  goEditEmailsIcloud(idEmail) {
    this.router.navigate(['home/editEmailsIcloud/' + idEmail]);
  }

  goCreateEmailIcloud() {
    this.router.navigate(['home/createEmailIcloud']);
  }
}
