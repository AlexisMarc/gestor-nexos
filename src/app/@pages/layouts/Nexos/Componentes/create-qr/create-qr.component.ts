import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
@Component({
  selector: 'app-create-qr',
  templateUrl: './create-qr.component.html',
  styleUrls: ['./create-qr.component.scss']
})
export class CreateQrComponent implements OnInit {
  title = 'qrcode-app';
  userEmail: any;
  userEmail2: any;
  userEmail3: any;
  userEmail4: any;
  document_number: any;
  nameRegister: any;
  name: string;
  password: any;
  meeting_id: string;
  residential_id: string;
  user_id: string;
  token_2 = "";

  constructor(private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService,) {
      this.meeting_id = this.route.snapshot.paramMap.get('idMeeting');
      this.residential_id = this.route.snapshot.paramMap.get('idResidential');
      const userStorage = this.storage.get('user');
      this.user_id = userStorage['content']['id'];
    }

  ngOnInit() {
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
  
  goPointContrpl(residential_id) {
    this.router.navigate(['home/pointControlMeeting/' + residential_id]);
  }
  goSearchPointControl() {
    this.router.navigate(['home/pointControl']);
  }
  
  getCustomerDetails() {
   
    // tslint:disable-next-line: max-line-length
    this.httpClient.get(this.config.endpoint3 + 'ResidentServices/getResidentByDocumentNumber?key=' + this.config.key + '&document_number=' + this.document_number)
      .subscribe(resp => {
        this.name = resp['content']['name'];
        this.nameRegister = resp['content']['nameRegister'];
        this.userEmail = resp['content']['email'];
        this.userEmail2 = resp['content']['email2'];
        this.userEmail3 = resp['content']['email3'];
        this.userEmail4 = resp['content']['email4'];
      });
      this.httpClient.get(this.config.endpoint + 'ApiQrPresence/getSecondTokenByDocumentNumber?key=' + this.config.key + '&meeting_id=' + this.meeting_id + '&document_number=' + this.document_number)
      .subscribe(resp => {
        this.token_2 = resp['content']['token_2'];
      });
  }
}
