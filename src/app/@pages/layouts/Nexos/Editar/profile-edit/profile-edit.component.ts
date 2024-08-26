import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { UserProfileService } from '../../service/user-profile.service';
import { HttpClient } from '@angular/common/http';
import { WebStorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  @Input() EditParametersProfile = {
    name: '',
    id: '',
    status_id: '',

  }
  idProfile!: string;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private config: ConfigurationRestService,
    private ProfileService: UserProfileService,
    private httpClient: HttpClient, @Inject(SESSION_STORAGE)
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
    }
    this.idProfile = this.route.snapshot.paramMap.get('idProfile')!

    // get Profile for id
    this.httpClient.get(this.config.endpoint + 'UserServices/getUserProfileById?key=' + this.config.key + '&id=' + this.idProfile)
      .subscribe((resp:any)=> {
        this.EditParametersProfile['name'] = resp['content']['name'];
        this.EditParametersProfile['id'] = resp['content']['id'];
        this.EditParametersProfile['status_id'] = resp['content']['status_id'];
      });
  }

  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['/home'])
  }
  EditProfiles() {
    if (this.EditParametersProfile.name === '') {
      Swal.fire("Atencion", "El nombre es obligatorio", "warning");
      return;
    }
    if (this.EditParametersProfile.status_id === '') {
      Swal.fire("Atencion", "El estado es obligatorio", "warning");
      return;
    }
    const formData = new FormData();
    formData.append('key', this.config.key);
    formData.append('name', this.EditParametersProfile['name']);
    formData.append('id', this.EditParametersProfile['id']);
    formData.append('status_id', this.EditParametersProfile['status_id']);

    this.ProfileService.editUser(formData);
  }
  goMenuSetting() {
    this.router.navigate(['home/menusetting']);
  }
  goListProfile() {
    this.router.navigate(['home/profilelist']);
  }
}

