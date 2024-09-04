import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { UserProfileService } from '../../service/user-profile.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  @Input() createParametersProfile = {
    name: '',
    id: '0',
    status_id: '1',

  };
  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private profileService: UserProfileService,
     
     
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
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting']);
  }
  goListProfile() {
    this.router.navigate(['home/profilelist']);
  }
  createProfileNew() {
    if (this.createParametersProfile.name === '') {
      Swal.fire('Atencion', 'El nombre es obligatorio', 'warning');
      return;
    }
    if (this.createParametersProfile.status_id === '') {
      Swal.fire('Atencion', 'El estado es obligatorio', 'warning');
      return;
    }
    const formData = new FormData();
    formData.append('key', this.config.key);
    formData.append('id', this.createParametersProfile['id']);
    formData.append('name', this.createParametersProfile['name']);
    formData.append('status_id', this.createParametersProfile['status_id']);
    this.profileService.CreateProfile(formData);
  }
}
