import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { EnvServiceService } from '@env';
declare var swal: any;
@Component({
  selector: 'app-verify-quorum',
  templateUrl: './verify-quorum.component.html',
  styleUrls: ['./verify-quorum.component.scss']
})
export class VerifyQuorumComponent implements OnInit {
  private _env = inject(EnvServiceService)
  @Input() residential_id!: string;
  @Input() meeting_id!: string;
  end_session_time: any;
  keysession: string;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
     
     
  ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    this.keysession = userStorage['token']
  }

  ngOnInit() {
    // this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'ApiMeetings/getMeetingDetails/' + this.keysession + '/' + this.meeting_id)
    //   .subscribe((resp:any)=> {
    //     this.meeting_id = resp['content']['id'];
    //     this.end_session_time = resp['content']['end_session_time'];
    //   });
  }

}
