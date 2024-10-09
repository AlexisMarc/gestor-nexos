import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-transmision',
  templateUrl: './transmision.component.html',
  styleUrls: ['./transmision.component.scss']
})
export class TransmisionComponent implements OnInit {
  private _env = inject(EnvServiceService)
  jitsi_link!: string;
  password_meeting!: string;
  id_conjunto: string;
  userName = 'Transmision';

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
     
     
    private route: ActivatedRoute,
    private router: Router
  ) {

    //Poner filtros de seguridad verificación variables de sesion y perfil

    this.id_conjunto = this.route.snapshot.paramMap.get('idResidential')!;

    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this._env.SECRET_KEY + '&residential_id=' + this.id_conjunto)
      .subscribe((resp2 :any)=> {
        if (resp2['success']) {
          this.jitsi_link = resp2['content']['zoom_link'];
          this.password_meeting = resp2['content']['pasword_meeting'];
          setTimeout(() => {
            document.getElementById('jitsi_button')!.click();
          }, 100);
        }
      });
  }

  ngOnInit() {
  }

  return(){
    this.router.navigate(['home/pointControlMeeting/' + this.id_conjunto]);
  }

}
