import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { UserProfileService } from '../../service/user-profile.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-edit-profile-votation',
  templateUrl: './edit-profile-votation.component.html',
  styleUrls: ['./edit-profile-votation.component.scss']
})
export class EditProfileVotationComponent implements OnInit {
  @Input() editParametersProfilevotation = {
    name: '',
    id: '0',
    status_id: '1',
  };
  user_id: any;
  idProfileVotation: any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private config: ConfigurationRestService,
    private profileService: UserProfileService,
    private httpClient: HttpClient,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService) {
      const userStorage = this.storage.get('user');
      this.user_id = userStorage['content']['id'];

    this.idProfileVotation = this.route.snapshot.paramMap.get('idProfileVotes');
  // get Profile votation for id
  this.httpClient.get(this.config.endpoint + 'ApiVoting/getVoterProfileById?key=' + this.config.key + '&user_id=' + this.user_id + '&id=' + this.idProfileVotation)
  .subscribe(resp => {
    this.editParametersProfilevotation['name'] = resp['content']['name'];
    this.editParametersProfilevotation['id'] = resp['content']['id'];
    this.editParametersProfilevotation['status_id'] = resp['content']['status_id'];
  });
  
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
  EditProfilesVotation() {
    if (this.editParametersProfilevotation.name === '') {
      Swal.fire('Atencion', 'El nombre es obligatorio', 'warning');
      return;
    }
    if (this.editParametersProfilevotation.status_id === '') {
      Swal.fire('Atencion', 'El estado es obligatorio', 'warning');
      return;
    }
    const formData = new FormData();
    formData.append('key', this.config.key);
    formData.append('id', this.editParametersProfilevotation['id']);
    formData.append('name', this.editParametersProfilevotation['name']);
    formData.append('status_id', this.editParametersProfilevotation['status_id']);
    formData.append('user_id', this.user_id);
    this.profileService.createProfileVotation(formData);

  }
}