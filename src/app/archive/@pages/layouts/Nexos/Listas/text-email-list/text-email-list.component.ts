import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import Swal from 'sweetalert2';
import { EnvServiceService } from '@env';
 

@Component({
  selector: 'app-text-email-list',
  templateUrl: './text-email-list.component.html',
  styleUrls: ['./text-email-list.component.scss']
})
export class TextEmailListComponent implements OnInit {
  private _env = inject(EnvServiceService)
  listTextEmail: [] = [];

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
    } }

  ngOnInit() {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'QuoteServices/getAllQuoteEmailContent?key=' + this._env.SECRET_KEY)
      .subscribe((resp:any) => {
        this.listTextEmail = resp['content']
      });
  }
  goCreateTextEmail() {
    this.router.navigate(['home/createTextEmail']);
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  irEditTextEmail(idTextEmail:any) {
    this.router.navigate(['home/editTextEmail/' + idTextEmail])
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting'])
  }
}