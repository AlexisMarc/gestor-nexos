import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { EnvServiceService } from '@env';
 
@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.scss']
})
export class ListProfileComponent implements OnInit {
  private _env = inject(EnvServiceService)
  allProfiles: any;
  constructor(private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,  
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


    // Obtener all profiles
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'UserServices/getAllUserProfiles?key=' + this._env.SECRET_KEY)
      .subscribe((resp:any)=> {
        this.allProfiles = resp['content'];
      });
  }

  ngOnInit() {
  }
  goCreateProfile() {
    this.router.navigate(['home/createprofile']);
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  irEditProfiles(idProfile:any) {
    this.router.navigate(['home/editProfiles/' + idProfile]);
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting']);
  }
}
