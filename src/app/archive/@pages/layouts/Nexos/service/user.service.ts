import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  arrayToSend: any;

  user: any;
  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router
  ) {}

  authentication(userAthentication: any) {
    var email = userAthentication.get('email');
    var password = userAthentication.get('password');
    // var ip = userAthentication.get("ip");
    var source = 'gestor';

    this.arrayToSend = { email: email, password: password, source: source };
    this.arrayToSend = JSON.stringify(this.arrayToSend);

    this.httpClient
      .post(this.config.endpoint6 + 'api/users/login', this.arrayToSend)
      .subscribe((response: any) => {
        if (response['success'] == true) {
          const user = {
            ...response.content,
            _state: { adding: false, db: 'default' },
            id: 328,
            name: 'postman',
            email: 'postman@postmaan.com',
            status_id: 1,
            phone: '12345678',
            photo: '',
            signature: null,
              profile: 'Super Usuario'
          };
          console.log(user);
          sessionStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/home']);
        } else {
          swal.fire('Error', response['message'], 'error');
        }
      });
  }
}
