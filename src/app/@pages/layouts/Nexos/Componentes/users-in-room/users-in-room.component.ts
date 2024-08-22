import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ConfigurationRestService } from '../../service/configuration.rest.service';

@Component({
  selector: 'app-users-in-room',
  templateUrl: './users-in-room.component.html',
  styleUrls: ['./users-in-room.component.scss']
})
export class UsersInRoomComponent implements OnInit {

  meeting_id: string;
  residential_id: string;
  user_id: string;
  room: string;
  listUserInRoom: [] = [];
  listUserOutRoom: [] = [];
  total = 0;
  totalOut = 0;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService
  ) {
    this.meeting_id = this.route.snapshot.paramMap.get('idMeeting');
    this.residential_id = this.route.snapshot.paramMap.get('idResidential');
    const userStorage = this.storage.get('user');
    this.user_id = userStorage['content']['id'];

    this.httpClient.get(this.config.endpoint + 'ApiQrPresence/getCustomersInRoom?key=' + this.config.key + '&user_id=' + this.user_id + '&room=1' + '&meeting_id=' + this.meeting_id)
      .subscribe(resp => {
        this.listUserInRoom = resp['content'];
        this.total = this.listUserInRoom.length
      });

      this.httpClient.get(this.config.endpoint + 'ApiQrPresence/getCustomersInRoom?key=' + this.config.key + '&user_id=' + this.user_id + '&room=2' + '&meeting_id=' + this.meeting_id)
      .subscribe(resp => {
        this.listUserOutRoom = resp['content'];
        this.totalOut = this.listUserOutRoom.length
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
  goPointContrpl(residential_id) {
    this.router.navigate(['home/pointControlMeeting/' + residential_id]);
  }
  goSearchPointControl() {
    this.router.navigate(['home/pointControl']);
  }
  goBack() {
    this.router.navigate(['home/pointControlMeeting/' + this.residential_id]);
  }

}
