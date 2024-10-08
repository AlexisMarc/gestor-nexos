import { Component, OnInit, Inject, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { GetAllActiveAppServicesTypeService } from '../../service/get-all-active-app-services-type.service';
import { SendmailService } from '../../service/sendmail.service';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent implements OnInit {
  private _env = inject(EnvServiceService)
  residential_id: string;
  ListServiceActive: any;
  idTypeService = '0';
  idTypeEmail = '0';
  listEmails: any;
  user_id: string;
  mailContent = '';
  //Data meeting
  name_meeting!: string;
  name_residential!: string;
  meeting_time!: string;
  meeting_time_start!: string;
  youtube_link!: string;
  support!: string;
  meeting_id!: string;
  keysession!: string;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
    private getAllActiveAppServices: GetAllActiveAppServicesTypeService,
     
     
    private sendmailService: SendmailService
  ) {
    this.residential_id = this.route.snapshot.paramMap.get('idResidential')!;
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    this.user_id = userStorage['id'];
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }

    this.ListServiceActive = this.getAllActiveAppServices.ListServiceActive;

    //Obtener detalles de la reunion
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this._env.SECRET_KEY + '&residential_id=' + this.residential_id)
      .subscribe((resp2 :any)=> {
        this.name_meeting = resp2['content']['name'];
        this.name_residential = resp2['content']['residential'];
        this.meeting_time = resp2['content']['meeting_time'];
        this.meeting_time_start = resp2['content']['meeting_time_start'];
        this.support = resp2['content']['support'];
        this.youtube_link = resp2['content']['youtube_link'];
        this.meeting_id = resp2['content']['id'];
        this.keysession = userStorage['token']
        this.idTypeService = '2';
        this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'ApiEmailContent/getEmailContentByService?key=' + this._env.SECRET_KEY + '&user_id=' + this.user_id + '&service_id=' + this.idTypeService)
          .subscribe((resp:any)=> {
            this.listEmails = resp['content'];
          });
      });
  }

  ngOnInit() {
  }

  SelectService() {
    this.idTypeEmail = '0';
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'ApiEmailContent/getEmailContentByService?key=' + this._env.SECRET_KEY + '&user_id=' + this.user_id + '&service_id=' + this.idTypeService)
      .subscribe((resp:any)=> {
        this.listEmails = resp['content'];
      });
  }

  goHome() {
    this.router.navigate(['home/']);
  }
  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }

  goConfigIcloud() {
    this.router.navigate(['home/menusettingVoting']);
  }

  goConfigEmail() {
    this.router.navigate(['home/menusettingEmail']);
  }

  goListResidentialByMail() {
    this.router.navigate(['home/listResidentialBySenMail']);
  }

  sendMails() {
    if (this.idTypeEmail === '0') {
      let iconStatus: SweetAlertIcon = 'warning';
      swal.fire('Advertencia', 'Debe seleccionar un tipo de email a enviar', iconStatus);
    }
    else {
      // const formData = new FormData();
      // formData.append('key', this._env.SECRET_KEY);
      // formData.append('user_id', this.user_id);
      // formData.append('email_id', this.idTypeEmail);
      // formData.append('residential_id', this.residential_id);

      this.sendmailService.SendMailService(this.keysession, this.idTypeEmail, this.meeting_id);
    }
  }

  ViewMail() {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'ApiEmailContent/getEmailContentById?key=' + this._env.SECRET_KEY + '&user_id=' + this.user_id + '&id=' + this.idTypeEmail)
      .subscribe((resp:any)=> {
        this.mailContent = resp['content']['message'];
        this.mailContent = this.mailContent.replace('Name_residential', this.name_residential)
        this.mailContent = this.mailContent.replace('Name_meeting', this.name_meeting)
        this.mailContent = this.mailContent.replace('Meeting_time', this.meeting_time)
        this.mailContent = this.mailContent.replace('Meeting_time_start', this.meeting_time_start)
        this.mailContent = this.mailContent.replace('Link_web', this.youtube_link)
        this.mailContent = this.mailContent.replace('Link_web', this.youtube_link)
        this.mailContent = this.mailContent.replace('Support', this.support)
        this.mailContent = this.mailContent.replace('Name_residential', this.name_residential)
        this.ListServiceActive = this.getAllActiveAppServices.ListServiceActive;
      });
  }

}
