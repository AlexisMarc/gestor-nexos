import { Injectable, Inject } from '@angular/core';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { Router } from '@angular/router';
 


@Injectable({
  providedIn: 'root'
})
export class CreateUserServicesService {
  data: any;
  id: any;
  profile: string = '';
  userStorage: any;

  constructor(private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router,
     
     ) {
    this.userStorage = JSON.parse(sessionStorage.getItem('user')!);
    if (this.userStorage == null || this.userStorage == undefined || this.userStorage == '') {
      sessionStorage.removeItem('user');
      this.router.navigate(['/']);
    }
    else {
      this.id = this.userStorage['id'];
      this.profile = this.userStorage['profile'];
    }
  }

  ngOnInit() {

  }

  CreateUser(createUser:any, keysession:any) {
    this.httpClient.post(this.config.endpoint6 + 'api/users/record/' + keysession, createUser)
      .subscribe((data:any) => {
        this.data = data;
        var iconStatus: SweetAlertIcon = 'success'
        var iconStatus2: SweetAlertIcon = 'warning'
        if (data['success'] == true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/userlist'])
          }
          swal.fire('Correcto', data['message'], iconStatus);
        } else {
          if (data['success']) {
            iconStatus2 = 'warning';
          }
          swal.fire('Incorrecto', data['message'], iconStatus2);
        }
      });
  }

  editUser(updateUser:any, profile:any) {
    this.profile = this.userStorage['profile'];
    this.httpClient.post(this.config.endpoint + 'UserServices/addEditUser', updateUser)
      .subscribe((data:any) => {
        this.data = data;
        var iconStatus: SweetAlertIcon = 'success'
        var iconStatus2: SweetAlertIcon = 'warning'
        if (data['success'] == true && profile == 'Super Usuario') {
          swal.fire('Correcto', data['message'], iconStatus);
          iconStatus = 'success', this.router.navigate(['/home/userlist'])
        }
        else {
          if (data['success'] == true && profile !== 'Super Usuario') {
            swal.fire('Correcto', data['message'], iconStatus);
            iconStatus = 'success', this.router.navigate(['/home'])
          }
          else {
            iconStatus2 = 'warning'
            swal.fire('Incorrecto', data['message'], iconStatus2);
          }
        }
      })
  }
}