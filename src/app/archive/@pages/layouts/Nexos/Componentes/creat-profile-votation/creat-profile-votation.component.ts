import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import swal from 'sweetalert2';
 
import { UserProfileService } from '../../service/user-profile.service';
import { EnvServiceService } from '@env';


@Component({
  selector: 'app-creat-profile-votation',
  templateUrl: './creat-profile-votation.component.html',
  styleUrls: ['./creat-profile-votation.component.scss']
})
export class CreatProfileVotationComponent implements OnInit {
  private _env = inject(EnvServiceService)
  @Input() createParametersProfileVotation = {
    name: '',
    id: '0',
    status_id: '1',

  };
  userId: any;
  constructor(
    private router: Router,
    private profileService: UserProfileService,
    private config: ConfigurationRestService,
     
     
    ) 
    {
      const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
      this.userId = userStorage['id'];

    }

  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['home/']);
  }
  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }
  goListProfileVotation() {
    this.router.navigate(['home/listProfileVotation']);
  }
  createProfileVotation() {
    if (this.createParametersProfileVotation.name === '') {
      swal.fire('Atencion', 'El nombre es obligatorio', 'warning');
      return;
    }
    if (this.createParametersProfileVotation.status_id === '') {
      swal.fire('Atencion', 'El estado es obligatorio', 'warning');
      return;
    }
    const formData = new FormData();
    formData.append('key', this._env.SECRET_KEY);
    formData.append('id', this.createParametersProfileVotation['id']);
    formData.append('name', this.createParametersProfileVotation['name']);
    formData.append('status_id', this.createParametersProfileVotation['status_id']);
    formData.append('user_id', this.userId);
    this.profileService.editProfileVotation(formData);

  }
}
