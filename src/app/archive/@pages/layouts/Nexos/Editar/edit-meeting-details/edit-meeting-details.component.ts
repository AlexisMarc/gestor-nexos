import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { StoreMeetingService } from '../../service/store-meeting.service';
import { HttpClient } from '@angular/common/http';
 
import Swal from 'sweetalert2';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-edit-meeting-details',
  templateUrl: './edit-meeting-details.component.html',
  styleUrls: ['./edit-meeting-details.component.scss']
})
export class EditMeetingDetailsComponent implements OnInit {
  private _env = inject(EnvServiceService)
  meeting_id!: string;
  residential_id!: string;
  name_meet!: string;
  meeting_time!: string;
  youtube_link!: string;
  youtube_share!: string;
  meeting_time_start!: string;
  date: any;
  support!: string;
  email_request_password_id: any;
  listTypeEmail: [] = [];
  user_id!: string;
  keysession!: string;
  url_redirection: string = '';
  session_check_time!: string | Blob;

  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
    private storeMeeting: StoreMeetingService,
    private httpClient: HttpClient,  
     ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor') {
    } else {
      Swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;
    }
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.residential_id = this.route.snapshot.paramMap.get('idResidential')!;
    this.user_id = userStorage['id'];
    this.keysession = userStorage['token'];
    // this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this._env.SECRET_KEY + '&residential_id=' + this.residential_id)
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this._env.SECRET_KEY + '&residential_id=' + this.residential_id).subscribe((response:any) => {
      this.url_redirection =response['content']['url_redirection']
      this.meeting_id = response['content']['id'];
      this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/meetings/getMeetingDetails/' + this.keysession + '/' + this.meeting_id)
        .subscribe((resp:any)=> {
          this.meeting_id = resp['content']['id'];
          this.name_meet = resp['content']['name'];
          this.date = resp['content']['date'].split(" ", 1);
          this.meeting_time = resp['content']['meeting_time'];
          this.meeting_time_start = resp['content']['meeting_time_start'];
          this.youtube_share = resp['content']['youtube_share'];
          this.youtube_link = resp['content']['youtube_link'];
          this.support = resp['content']['support'];
          this.email_request_password_id = resp["content"]['email_request_password_id'];
          this.session_check_time = resp["content"]['session_check_time'];
        });
    });
  }

  ngOnInit() {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'ApiEmailContent/getAllEmailContent?key=' + this._env.SECRET_KEY + '&user_id=' + this.user_id)
      .subscribe((resp:any)=> {
        this.listTypeEmail = resp["content"];
      });
  }

  goHome() {
    this.router.navigate(['home/']);
  }
  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }
  goSearchActiveSets() {
    this.router.navigate(['home/searchSets']);
  }
  goSearchPointContrpl() {
    this.router.navigate(['home/pointControl']);
  }
  goPointContrpl(residential_id:any) {
    this.router.navigate(['home/pointControlMeeting/' + residential_id])
  }

  editMeet() {
    const formData = new FormData();
    formData.append('key', this._env.SECRET_KEY);
    formData.append('id', this.meeting_id);
    formData.append('name', this.name_meet);
    formData.append('meeting_time', this.meeting_time);
    formData.append('youtube_link', this.youtube_link);
    formData.append('youtube_share', this.youtube_share);
    formData.append('meeting_time_start', this.meeting_time_start);
    formData.append('date', this.date);
    formData.append('support', this.support);
    formData.append('email_request_password_id', this.email_request_password_id);
    formData.append('url_redirection', this.url_redirection);
    formData.append('session_check_time', this.session_check_time);
    this.storeMeeting.editMeeting(formData);
  }

}