import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import { CreateEditCityService } from '../../service/create-edit-city.service';
import Swal from 'sweetalert2';
 

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnInit {

  @Input() CityParameters = {
    id: '0',
    name: '',
    status_id: '',
  }
  idCity: any;
  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private createEditCityService: CreateEditCityService,  
     ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    // tslint:disable-next-line: max-line-length
    if (userStorage['profile'] === 'Super Usuario' ) {
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
    //ResidentialServices/getCityById7
    this.idCity = this.route.snapshot.paramMap.get('idCity')
    //get city by id
    this.httpClient.get(this.config.endpoint + 'ResidentialServices/getCityById?key=' + this.config.key + '&id=' + this.idCity)
      .subscribe((resp:any)=> {
        this.CityParameters['id'] = resp['content']['id'];
        this.CityParameters['name'] = resp['content']['name'];
        this.CityParameters['status_id'] = resp['content']['status_id'];

      });
  }

  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['/home'])
  }
  goListCity() {
    this.router.navigate(['/home/cityList'])
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting'])
  }

  goCreateCity() {
    if (this.CityParameters.name == '') {
      Swal.fire("Atencion", "El nombre es obligatorio", "error");
      return
    }
    if (this.CityParameters.status_id == '') {
      Swal.fire("Atencion", "El estado es obligatorio", "error");
      return
    }
    const formData = new FormData();
    formData.append('key', this.config.key);
    formData.append('id', this.CityParameters['id']);
    formData.append('name', this.CityParameters['name']);
    formData.append('status_id', this.CityParameters['status_id']);

    this.createEditCityService.createCity(formData);
  }
}