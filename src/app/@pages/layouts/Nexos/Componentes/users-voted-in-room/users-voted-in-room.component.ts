import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ConfigurationRestService } from '../../service/configuration.rest.service';

@Component({
  selector: 'app-users-voted-in-room',
  templateUrl: './users-voted-in-room.component.html',
  styleUrls: ['./users-voted-in-room.component.scss']
})
export class UsersVotedInRoomComponent implements OnInit {

  meeting_id: string;
  residential_id: string;
  user_id: string;
  voting_header_id: string;
  listUserInRoom: [] = [];
  total = 0;
  // listUserOutRoom: [] = [];

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
    this.voting_header_id = this.route.snapshot.paramMap.get('idVote');
    const userStorage = this.storage.get('user');
    this.user_id = userStorage['content']['id'];

    this.httpClient.get(this.config.endpoint + 'ApiQrPresence/getCustomerWithoutVote?key=' + this.config.key + '&user_id=' + this.user_id + '&meeting_id=' + this.meeting_id + '&voting_header_id=' + this.voting_header_id )
      .subscribe(resp => {
        this.listUserInRoom = resp['content'];
        this.total = this.listUserInRoom.length
      });

  }

  ngOnInit() {
  }

  goReturn() {
    this.router.navigate(['home/interventioncontrol/' + this.residential_id + '/listaVotaciones/' + this.residential_id + '/' + this.meeting_id]);
    setTimeout(function(){
      window.scrollTo( 0, 550 );
     }, 100);
  }

  reloadList() {
    
    this.httpClient.get(this.config.endpoint + 'ApiQrPresence/getCustomerWithoutVote?key=' + this.config.key + '&user_id=' + this.user_id + '&meeting_id=' + this.meeting_id + '&voting_header_id=' + this.voting_header_id )
      .subscribe(resp => {
        this.listUserInRoom = resp['content'];
      });
  }

}
