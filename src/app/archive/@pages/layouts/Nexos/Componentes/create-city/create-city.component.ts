import { Component, OnInit, Input, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { CreateEditCityService } from '../../service/create-edit-city.service';
import Swal from 'sweetalert2';
import { EnvServiceService } from '@env';
 

@Component({
  selector: 'app-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.scss']
})
export class CreateCityComponent implements OnInit {
  private _env = inject(EnvServiceService)
  @Input() CityParameters = {
    id: '0',
    name: '',
    status_id: '1',
  };
  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private createEditCityService: CreateEditCityService,  
     
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
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  goListCity() {
    this.router.navigate(['/home/cityList']);
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting']);
  }

  goCreateCity() {
    if (this.CityParameters.name === '') {
      Swal.fire('Atencion', 'El nombre es obligatorio', 'error');
      return;
    }
    if (this.CityParameters.status_id === '') {
      Swal.fire('Atencion', 'El estado es obligatorio', 'error');
      return;
    }
    const formData = new FormData();
    formData.append('key', this._env.SECRET_KEY);
    formData.append('id', this.CityParameters['id']);
    formData.append('name', this.CityParameters['name']);
    formData.append('status_id', this.CityParameters['status_id']);

    this.createEditCityService.createCity(formData);
  }
}
