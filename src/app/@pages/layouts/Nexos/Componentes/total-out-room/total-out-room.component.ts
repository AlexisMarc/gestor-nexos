import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-total-out-room',
  templateUrl: './total-out-room.component.html',
  styleUrls: ['./total-out-room.component.scss']
})
export class TotalOutRoomComponent implements OnInit {

  meeting_id: string;
  residential_id: string;
  user_id: string;
  voting_header_id: string;
  room = "0";
  // token_2: string;
  profileForm = new FormGroup({
    token_2: new FormControl(''),
  });
  token_2!: string;


  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService
  ) {
    this.meeting_id = this.route.snapshot.paramMap.get('idMeeting')!;
    this.residential_id = this.route.snapshot.paramMap.get('idResidential')!;
    this.voting_header_id = this.route.snapshot.paramMap.get('idVote')!;
    const userStorage = this.storage.get('user');
    this.user_id = userStorage['content']['id'];
  }

  ngOnInit() {
  }

  sendQR(customerData:any) {
    const formData2 = new FormData();
    formData2.append('key', this.config.key);
    formData2.append('user_id', this.user_id);
    formData2.append('token_2', customerData['token_2']);
    formData2.append('room', this.room);
    formData2.append('meeting_id', this.meeting_id);


    this.httpClient.post(this.config.endpoint + 'ApiQrPresence/updateCustomerRoomByToken', formData2)
      .subscribe((resp:any)=> {
        // this.listUserInRoom = resp['content'];
      });
    this.profileForm.reset();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }

  goSearchVituralVotes() {
    this.router.navigate(['home/buscarConjunto']);
  }

  goOutRoom() {
    this.router.navigate(['home/salidaSala/' + this.residential_id + '/' + this.meeting_id]);
  }

  goOutTotalRoom() {
    this.router.navigate(['home/salidaTotalSala/' + this.residential_id + '/' + this.meeting_id]);
  }

  goInRoom() {
    this.router.navigate(['home/entradaSala/' + this.residential_id + '/' + this.meeting_id]);
  }

  goPointContrpl(residential_id:any) {
    this.router.navigate(['home/pointControlMeeting/' + residential_id]);
  }
  goSearchPointControl() {
    this.router.navigate(['home/pointControl']);
  }

  goCreatQrCode() {
    this.router.navigate(['home/crearQr/' + this.residential_id + '/' + this.meeting_id]);
  }

}