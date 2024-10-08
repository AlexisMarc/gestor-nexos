import { Component, inject, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
 
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { EnvServiceService } from '@env';
@Component({
  selector: 'app-create-qr',
  templateUrl: './create-qr.component.html',
  styleUrls: ['./create-qr.component.scss']
})
export class CreateQrComponent implements OnInit {
  private _env = inject(EnvServiceService)
  title = 'qrcode-app';
  userEmail: any;
  userEmail2: any;
  userEmail3: any;
  userEmail4: any;
  document_number: any;
  nameRegister: any;
  name!: string;
  password: any;
  meeting_id: string;
  residential_id: string;
  user_id: string;
  token_2 = "";

  constructor(private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
     
     ) {
      this.meeting_id = this.route.snapshot.paramMap.get('idMeeting')!;
      this.residential_id = this.route.snapshot.paramMap.get('idResidential')!;
      const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
      this.user_id = userStorage['id'];
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
  
  goPointContrpl(residential_id:any) {
    this.router.navigate(['home/pointControlMeeting/' + residential_id]);
  }
  goSearchPointControl() {
    this.router.navigate(['home/pointControl']);
  }
  
  getCustomerDetails() {
   
    // tslint:disable-next-line: max-line-length
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'ResidentServices/getResidentByDocumentNumber?key=' + this._env.SECRET_KEY + '&document_number=' + this.document_number)
      .subscribe((resp:any)=> {
        this.name = resp['content']['name'];
        this.nameRegister = resp['content']['nameRegister'];
        this.userEmail = resp['content']['email'];
        this.userEmail2 = resp['content']['email2'];
        this.userEmail3 = resp['content']['email3'];
        this.userEmail4 = resp['content']['email4'];
      });
      this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ApiQrPresence/getSecondTokenByDocumentNumber?key=' + this._env.SECRET_KEY + '&meeting_id=' + this.meeting_id + '&document_number=' + this.document_number)
      .subscribe((resp:any)=> {
        this.token_2 = resp['content']['token_2'];
      });
  }
}
