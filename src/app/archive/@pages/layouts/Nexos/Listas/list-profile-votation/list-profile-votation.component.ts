import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import swal from 'sweetalert2';
import { EnvServiceService } from '@env';
 

@Component({
  selector: 'app-list-profile-votation',
  templateUrl: './list-profile-votation.component.html',
  styleUrls: ['./list-profile-votation.component.scss']
})
export class ListProfileVotationComponent implements OnInit {
  private _env = inject(EnvServiceService)
  allProfilesVotation: [] = [];
  user_id: string;
 
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
     
     ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
      this.user_id = userStorage['id'];

    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ApiVoting/getAllVoterProfiles?key=' + this._env.SECRET_KEY + '&user_id=' + this.user_id)
    .subscribe((resp:any)=> {
      this.allProfilesVotation = resp['content'];
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
  goCreateProfileVotation() {
    this.router.navigate(['home/crearPerfilesVotacion']);
  }
  goEditProfilesVotation(idProfileVotation:any) {
    this.router.navigate(['home/editProfilesVotation/' + idProfileVotation]);
  }
}
