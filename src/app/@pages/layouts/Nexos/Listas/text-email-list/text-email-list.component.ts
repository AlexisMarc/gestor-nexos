import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import Swal from 'sweetalert2';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-text-email-list',
  templateUrl: './text-email-list.component.html',
  styleUrls: ['./text-email-list.component.scss']
})
export class TextEmailListComponent implements OnInit {
  listTextEmail: [] = [];

  constructor(private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService, @Inject(SESSION_STORAGE)
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
    } }

  ngOnInit() {
    this.httpClient.get(this.config.endpoint + 'QuoteServices/getAllQuoteEmailContent?key=' + this.config.key)
      .subscribe(resp => {
        this.listTextEmail = resp['content']
      });
  }
  goCreateTextEmail() {
    this.router.navigate(['home/createTextEmail']);
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  irEditTextEmail(idTextEmail) {
    this.router.navigate(['home/editTextEmail/' + idTextEmail])
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting'])
  }
}