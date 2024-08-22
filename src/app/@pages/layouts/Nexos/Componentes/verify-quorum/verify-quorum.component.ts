import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
declare var swal: any;
@Component({
  selector: 'app-verify-quorum',
  templateUrl: './verify-quorum.component.html',
  styleUrls: ['./verify-quorum.component.scss']
})
export class VerifyQuorumComponent implements OnInit {

  @Input() residential_id: string;
  @Input() meeting_id: string;
  end_session_time: any;
  keysession: string;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService,
  ) {
    const userStorage = this.storage.get('user');
    this.keysession = userStorage['content']['token']
  }

  ngOnInit() {
    // this.httpClient.get(this.config.endpoint6 + 'ApiMeetings/getMeetingDetails/' + this.keysession + '/' + this.meeting_id)
    //   .subscribe(resp => {
    //     this.meeting_id = resp['content']['id'];
    //     this.end_session_time = resp['content']['end_session_time'];
    //   });
  }

}
