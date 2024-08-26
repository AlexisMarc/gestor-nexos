import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { StoreMeetingService } from '../../service/store-meeting.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Globals } from '../../interface/globals.model';


@Component({
  selector: 'app-point-control-meeting-active',
  templateUrl: './point-control-meeting-active.component.html',
  styleUrls: ['./point-control-meeting-active.component.scss']
})
export class PointControlMeetingActiveComponent implements OnInit {
  data: any;
  data2: any;
  meeting_status: any;
  residential_id: any;
  meeting_id: any;
  name!: string;
  date: any;
  meeting_time: any;
  meeting_time_start!: '';
  is_online: any;
  youtube_link!: string;
  youtube_share!: string ;
  max_agents = '3';
  max_units = '3';
  
  user_id = '9913';
  residential: any;
  zoom_link!: string;
  userStorage: any;
  password_meeting!: string;
  quorum_real_time!: string;
  keysession!: string;
  withRegister = false;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
    private storeMeeting: StoreMeetingService, @Inject(SESSION_STORAGE)
    private storage: WebStorageService,
    private global: Globals) {

    this.userStorage = this.storage.get('user');
    if (this.userStorage['content']['profile'] === 'Super Usuario' || this.userStorage['content']['profile'] === 'Supervisor' || this.userStorage['content']['profile'] === 'Moderador') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;
    }
    if (this.userStorage === null || this.userStorage === 'null' || this.userStorage === undefined || this.userStorage === 'undefined' || this.userStorage === '' || this.userStorage['content']['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.residential_id = this.route.snapshot.paramMap.get('idResidential');
    this.keysession = this.userStorage['content']['token'];
    this.httpClient.get(this.config.endpoint3 + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this.config.key + '&residential_id=' + this.residential_id)
      .subscribe((resp:any)=> {
        // console.log(resp)
        this.meeting_status = resp['content']['meeting_status'];
        this.meeting_id = resp['content']['id'];
        this.name = resp['content']['name'];
        this.date = resp['content']['date'];
        this.meeting_time = resp['content']['meeting_time'];
        this.meeting_time_start = resp['content']['meeting_time_start'];
        this.is_online = resp['content']['is_online'];
        this.youtube_link = resp['content']['youtube_link'];
        this.residential = resp['content']['residential'];
        
        if(resp['content']['youtube_share'] ===''){
          this.youtube_share = 'asambleasvirtuales'
        }else{
          this.youtube_share = resp['content']['youtube_share'];
        }
        
        this.zoom_link = resp['content']['zoom_link'];
        this.password_meeting = resp['content']['pasword_meeting'];
        this.global.quorum_real_time = resp['content']['quorum_real_time'];
      });
  }

  ngOnInit() {
  }

  gointerventioncontrol(residential_id:any) {
    this.router.navigate(['home/interventioncontrol/' + residential_id]);
  }

  goHome() {
    this.router.navigate(['home/']);
  }
  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }
  goSearchPointContrpl() {
    this.router.navigate(['home/pointControl']);
  }

  goRegisterWhatsapp(){
this.router.navigate(['home/registervotewhatsapp/'+this.residential_id])
  }

  status1() {
    const formData2 = new FormData();
    formData2.append('id', this.meeting_id);
    formData2.append('meeting_status', '1');
    this.meeting_status = '1';
    this.httpClient.post(this.config.endpoint6 + 'api/meetings/updateMeetingDetails/' + this.keysession, formData2).subscribe((data:any) => {
      this.data = data;
      let iconStatus: SweetAlertIcon = 'success';
      let iconStatus2: SweetAlertIcon = 'warning';
      if (data['success'] === true) {
        if (data['success']) {
          iconStatus = 'success';
        }
        swal.fire('Correcto', data['message'], iconStatus);
      } else {
        if (data['success']) {
          iconStatus2 = 'warning';
        }
        swal.fire('Incorrecto', data['message'], iconStatus2);
      }
    });
  }

  status2() {
    const formData2 = new FormData();
    formData2.append('id', this.meeting_id);
    formData2.append('meeting_status', '2');
    this.meeting_status = '2';
    swal.fire({
      title: 'Esta seguro de cerrar la asamblea?',
      showCancelButton: true,
      confirmButtonColor: '#ff7300',
      cancelButtonColor: '#444',
      confirmButtonText: 'Si, cerrar!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.httpClient.post(this.config.endpoint6 + 'api/meetings/updateMeetingDetails/' + this.keysession, formData2).subscribe((data:any) => {
          this.data2 = data;
          let iconStatus: SweetAlertIcon = 'success';
          let iconStatus2: SweetAlertIcon = 'warning';
          if (data['success'] === true) {
            if (data['success']) {
              iconStatus = 'success';
            }
            swal.fire('Correcto', data['message'], iconStatus);
          } else {
            if (data['success']) {
              iconStatus2 = 'warning';
            }
            swal.fire('Incorrecto', data['message'], iconStatus2);
          }
        });
      }
    });
  }

  editMeeting() {
    const formData = new FormData();
    formData.append('key', this.config.key);
    formData.append('id', this.meeting_id);
    formData.append('youtube_share', this.youtube_share);
    formData.append('zoom_link', this.zoom_link);
    formData.append('pasword_meeting', this.password_meeting);
    this.storeMeeting.editstoreMeetingService(formData);
  }

  goChat() {
    this.router.navigate(['home/chat/' + this.residential_id]);
  }

  goLoadFiles() {
    this.router.navigate(['home/cargardocumentos/' + this.residential_id + '/' + this.meeting_id]);
  }

  goAddUnits() {
    this.router.navigate(['home/addunits/' + this.residential_id + '/' + this.meeting_id]);
  }

  goPresent() {
    this.router.navigate(['home/Ausentes/' + this.residential_id + '/' + this.meeting_id]);
  }
  goCreateVituralVotes() {
    this.router.navigate(['home/crearVotacion/' + this.residential_id + '/' + this.meeting_id]);
  }

  goUserInRoom() {
    this.router.navigate(['home/UsuariosEnSala/' + this.residential_id + '/' + this.meeting_id]);
  }

  goQRCode() {
    this.router.navigate(['home/crearQr/' + this.residential_id + '/' + this.meeting_id]);
  }

  extractPreregister() {
    var withRegister = '0';
    if (this.withRegister) {
      withRegister = '1'
    } else {
      withRegister = '0'
    }
    this.httpClient.get(this.config.endpoint6 + 'api/reports/getUnitsInAMeetingExcel/' + this.keysession + '/' + this.meeting_id + '/' + withRegister)
      .subscribe((resp:any)=> {
        var base64decode = decodeURIComponent(atob(resp['content']).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        var blob = new Blob([base64decode], { type: 'application/vnd.ms-excel' });
        var objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl);
      });
  }

  extractAssistantRepport() {
    // console.log(this.meeting_id)
    // this.httpClient.get(this.config.endpoint6 + 'api/reports/getUnitsByMeetingForWeb/' + this.keysession + '/' + this.meeting_id)
    //   .subscribe((resp:any)=> {
    //     var base64decode = decodeURIComponent(atob(resp['content']).split('').map(function (c) {
    //       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     }).join(''));
    //     var blob = new Blob([base64decode], { type: 'application/vnd.ms-excel' });
    //     var objectUrl = URL.createObjectURL(blob);
    //     window.open(objectUrl);
    //   });
  }

  startPreregister() {
    const formData2 = new FormData();
    formData2.append('key', this.config.key);
    formData2.append('id', this.meeting_id);
    formData2.append('status_preregister', '1');
    swal.fire({
      title: 'Esta seguro de iniciar el preregistro?',
      showCancelButton: true,
      confirmButtonColor: '#ff7300',
      cancelButtonColor: '#444',
      confirmButtonText: 'Si, Iniciar!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.httpClient.post(this.config.endpoint3 + 'PreRegisterMeetingServices/updateMeetingDetails', formData2).subscribe((data:any) => {
          this.data2 = data;
          let iconStatus: SweetAlertIcon = 'success';
          let iconStatus2: SweetAlertIcon = 'warning';
          if (data['success'] === true) {
            if (data['success']) {
              iconStatus = 'success';
            }
            swal.fire('Correcto', data['message'], iconStatus);
          } else {
            if (data['success']) {
              iconStatus2 = 'warning';
            }
            swal.fire('Incorrecto', data['message'], iconStatus2);
          }
        });
      }
    });
  }

  endPreregister() {
    const formData2 = new FormData();
    formData2.append('key', this.config.key);
    formData2.append('id', this.meeting_id);
    formData2.append('status_preregister', '0');
    swal.fire({
      title: 'Esta seguro de cerrar el preregistro?',
      showCancelButton: true,
      confirmButtonColor: '#ff7300',
      cancelButtonColor: '#444',
      confirmButtonText: 'Si, Cerrar!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.httpClient.post(this.config.endpoint3 + 'PreRegisterMeetingServices/updateMeetingDetails', formData2).subscribe((data:any) => {
          this.data2 = data;
          let iconStatus: SweetAlertIcon = 'success';
          let iconStatus2: SweetAlertIcon = 'warning';
          if (data['success'] === true) {
            if (data['success']) {
              iconStatus = 'success';
            }
            swal.fire('Correcto', data['message'], iconStatus);
          } else {
            if (data['success']) {
              iconStatus2 = 'warning';
            }
            swal.fire('Incorrecto', data['message'], iconStatus2);
          }
        });
      }
    });
  }

  Visado() {
    this.router.navigate(['home/visado/' + this.residential_id]);
  }

  goTransmision() {
    this.router.navigate(['home/transmision/' + this.residential_id]);
  }

  status3() {
    const formData2 = new FormData();
    formData2.append('key', this.config.key);
    formData2.append('id', this.meeting_id);
    formData2.append('meeting_status', '3');
    this.meeting_status = '2';
    swal.fire({
      title: 'Esta seguro de cerrar el registro?',
      showCancelButton: true,
      confirmButtonColor: '#ff7300',
      cancelButtonColor: '#444',
      confirmButtonText: 'Si, cerrar!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.httpClient.post(this.config.endpoint3 + 'PreRegisterMeetingServices/updateMeetingDetails', formData2).subscribe((data:any) => {
          this.data2 = data;
          let iconStatus: SweetAlertIcon = 'success';
          let iconStatus2: SweetAlertIcon = 'warning';
          if (data['success'] === true) {
            if (data['success']) {
              iconStatus = 'success';
            }
            swal.fire('Correcto', data['message'], iconStatus);
          } else {
            if (data['success']) {
              iconStatus2 = 'warning';
            }
            swal.fire('Incorrecto', data['message'], iconStatus2);
          }
        });
      }
    })
  }

}