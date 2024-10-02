import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  listItem: [] = [];
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
    this.httpClient.get(this.config.endpoint + 'ResidentialServices/getAllActiveCities?key=' + this.config.key)
      .subscribe((resp:any)=> {

        this.listItem = resp['content']
      });
  }
  goHome() {
    this.router.navigate(['/home'])
  }
  goCreateCity() {
    this.router.navigate(['home/createCity'])
  }
  goEditCity(idCity:any) {
    this.router.navigate(['home/editCity/' + idCity])
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting'])
  }
}