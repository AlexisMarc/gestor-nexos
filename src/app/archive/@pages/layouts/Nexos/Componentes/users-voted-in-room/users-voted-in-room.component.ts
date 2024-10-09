import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-users-voted-in-room',
  templateUrl: './users-voted-in-room.component.html',
  styleUrls: ['./users-voted-in-room.component.scss']
})
export class UsersVotedInRoomComponent implements OnInit {
  private _env = inject(EnvServiceService)
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
     
     
  ) {
    this.meeting_id = this.route.snapshot.paramMap.get('idMeeting')!;
    this.residential_id = this.route.snapshot.paramMap.get('idResidential')!;
    this.voting_header_id = this.route.snapshot.paramMap.get('idVote')!;
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    this.user_id = userStorage['id'];

    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ApiQrPresence/getCustomerWithoutVote?key=' + this._env.SECRET_KEY + '&user_id=' + this.user_id + '&meeting_id=' + this.meeting_id + '&voting_header_id=' + this.voting_header_id )
      .subscribe((resp:any)=> {
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
    
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ApiQrPresence/getCustomerWithoutVote?key=' + this._env.SECRET_KEY + '&user_id=' + this.user_id + '&meeting_id=' + this.meeting_id + '&voting_header_id=' + this.voting_header_id )
      .subscribe((resp:any)=> {
        this.listUserInRoom = resp['content'];
      });
  }

}
