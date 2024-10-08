import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { GetAllActiveAppServicesTypeService } from '../../service/get-all-active-app-services-type.service';
import { EnvServiceService } from '@env';
declare var Swal: any;

@Component({
  selector: 'app-search-active-sets',
  templateUrl: './search-active-sets.component.html',
  styleUrls: ['./search-active-sets.component.scss']
})
export class SearchActiveSetsComponent implements OnInit {
  private _env = inject(EnvServiceService)
  param2 = '0';
  ListQuote: [] = [];
  ListServiceActive: any;
  searchPost = '';
  meeting_id: any;
  keysession!: string;
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private getAllActiveAppServices: GetAllActiveAppServicesTypeService,  
     ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor') {
    } else {
      Swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;
    }
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.ListServiceActive = this.getAllActiveAppServices.ListServiceActive;
    this.keysession = userStorage['token'];
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['home/']);
  }

  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }

  goPreRegistration(idResidential:any) {
    this.router.navigate(['home/preregistration/' + idResidential]);
  }

  goVote(idResidential:any, name:any) {
    this.router.navigate(['home/votingMeeting/' + idResidential + '/' + name]);
  }

  goEditMetting(idResidential:any) {
    this.router.navigate(['home/editMeeting/' + idResidential]);
  }

  goVoteAndPreRegistration(idResidential:any) {
    this.router.navigate(['home/votingAndPreregistration/' + idResidential]);
  }

  Search2() {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ResidentialServices/getAllResidentialByParam?key=' + this._env.SECRET_KEY + '&param=' + this.searchPost + '&quote_type_id=1')
      .subscribe((resp1 :any)=> {
        this.ListQuote = resp1['content'];
      });
  }

  clone(idResidential:any) {
    Swal.fire({
      icon: 'question',
      title: '¿Esta seguro de clonar esta reunión?',
      showCancelButton: true,
      confirmButtonColor: '#ff7300',
      cancelButtonColor: '#444',
      confirmButtonText: 'Si, Iniciar!',
      cancelButtonText: 'No'
    }).then((result:any) => {
      if (result.value) {
        this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this._env.SECRET_KEY + '&residential_id=' + idResidential).subscribe((response:any) => {
          if (response['success']) {
            if (response['content']['status_preregister'] == '1') {
              Swal.fire('Mensaje', 'Tiene un preregistro activo, no puede clonar la reunión sin haberlo cerrado', 'info')
            } else {
              if (response['content']['meeting_status'] == '1' || response['content']['meeting_status'] == '3') {
                Swal.fire('Mensaje', 'La asamblea esta activa debe finalizarla para poder clonar', 'info')
              } else {
                this.meeting_id = response['content']['id'];
                const formData2 = new FormData();
                formData2.append('id', this.meeting_id);
                formData2.append('meeting_status', '2');
                this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/meetings/updateMeetingDetails/' + this.keysession, formData2).subscribe((data:any) => {
                  if (data['success']) {
                    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/meetings/cloneMeeting/' + this.keysession + '/' + this.meeting_id)
                      .subscribe((resp2 :any)=> {
                        if (resp2['success']) {
                          Swal.fire('Atención', 'Se ha clonado con exito la reunión', 'success');
                        } else {
                          Swal.fire('Atención', 'Falló la clonación de la reunión', 'error');
                        }
                      });
                  }
                });
              }
            }
          }
        });
      }
    });
  }

}
