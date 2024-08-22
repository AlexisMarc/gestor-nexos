import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  arrayToSend:any

  user: any;
  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService
  ) { }

  authentication(userAthentication) {
    var email = userAthentication.get("email");
    var password = userAthentication.get("password");
    // var ip = userAthentication.get("ip");
    var source = "gestor";

    this.arrayToSend = {"email": email,"password":password,"source":source}
    this.arrayToSend = JSON.stringify(this.arrayToSend)

    this.httpClient.post(this.config.endpoint6 + 'api/users/login',this.arrayToSend).subscribe(response => {
      if (response['success'] == true) {
        this.storage.set('user', response);
        this.router.navigate(['/home']);
      } else {
        swal.fire('Error', response['message'], 'error');
      }
    });
  }
}