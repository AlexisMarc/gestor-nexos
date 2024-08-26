import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { SocketService } from '../../service/socket.service';
declare var swal: any;
declare var require: any;
var domtoimage = require('dom-to-image');

@Component({
  selector: 'app-quorum',
  templateUrl: './quorum.component.html',
  styleUrls: ['./quorum.component.scss']
})
export class QuorumComponent implements OnInit {

  quorum!: number;
  quorumShow = 0;
  residential_id: any;
  id_user: any;
  asistentes: any;
  aportes: any;
  meeting_id!: string;
  unidades: any;
  user_id!: string;
  keysession!: string;
  progress: any;
  valueContainer: any;
  end_session_time: any;
  verifyShow: any;
  withLimitTime = false;

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService,
    private socketService: SocketService) {
    const userStorage = this.storage.get('user');
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor' || userStorage['content']['profile'] === 'Moderador' || userStorage['content']['profile'] === 'Soporte telefonico') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home/pointControl']);
      return;
    }
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['content']['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.residential_id = this.route.snapshot.paramMap.get('idResidential');
    this.user_id = userStorage['content']['id'];
    this.meeting_id = this.route.snapshot.paramMap.get('idMeeting')!;
    this.verifyShow = this.route.snapshot.paramMap.get('showVerify');
    this.id_user = userStorage['user_id'];
    this.keysession = userStorage['content']['token'];
    this.httpClient.get(this.config.endpoint6 + 'api/meetings/getMeetingDetails/' + this.keysession + '/' + this.meeting_id)
      .subscribe((resp:any)=> {
        // console.log(resp)
        this.end_session_time =(resp['success']== false)?'': resp['content']['end_session_time'];
      });
  }

  ngOnInit() {
    this.httpClient.get(this.config.endpoint6 + 'api/reports/getChartsByMeeting/' + this.keysession + '/' + this.meeting_id)
      .subscribe((resp2 :any)=> {
        if (resp2['message'] == "La sesión es inválida") {
          swal.fire({
            title:'Atención', 
            text:'Su sesión no es valida por favor ingrese de nuevo.', 
            icon:'info',
            backdrop: true,
            allowOutsideClick: false // Aunque se muestre el backdrop, no permitir clics fuera
          }).then((response:any)=>{
            if(response.value){
              this.storage.remove('user');
              this.router.navigate(['/']);
            }
          })
        } else {
          if (resp2 == null) {
            this.quorum = 0;
            this.asistentes = 0;
          }
          else {
            this.quorum = resp2['coefficient'];
            this.quorumShow = 0;
            this.asistentes = resp2['attendance'];
            this.aportes = resp2['aportes'];
            this.unidades = resp2['total_properties'];
            if (this.quorumShow != this.quorum) {
              this.quorumAnimated(this.quorum)
            }
          }
        }
      });
    this.socketService.listen('meeting_quorum_' + this.meeting_id).subscribe((response:any) => {
      clearInterval(this.progress);
      this.quorum = response['coefficient'];
      this.asistentes = response['attendance'];
      this.aportes = response['aportes'];
      this.unidades = response['total_properties'];
      this.quorumAnimatedSocket(this.quorum);
    });
  }

  ngOnDestroy() {
    this.socketService.removeListen('meeting_quorum_' + this.meeting_id)
    clearInterval(this.progress);
  }

  screenShotQuorum() {
    this.InformAttendance();
    domtoimage.toJpeg(document.getElementById('content-quorum'), { quality: 1 })
      .then(function (dataUrl:any) {
        var link = document.createElement('a');
        link.download = 'Quorum.jpeg';
        link.href = dataUrl;
        link.click();
      });
  }

  InformAttendance() {
    var date = new Date();
    var name = 'Informe de asistencia ' + date.getDate() + "-" + date.getMonth() + '-' + date.getFullYear() + ' ' + date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds() + ' %' + this.quorum;
    this.httpClient.get(this.config.endpoint6 + 'api/reports/getUnitsByMeetingForWeb/' + this.keysession + '/' + this.meeting_id)
      .subscribe((resp:any)=> {
        var base64decode = decodeURIComponent(atob(resp['content']).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        var blob = new Blob([base64decode], { type: 'application/vnd.ms-excel' });
        const file = new File([blob], 'report.xlsx',
          { type: 'application/vnd.ms-excel' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = name + '.xls';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  quorumAnimated(coefficient:any) {
    var progressBar = document.getElementById("circularprogress")!;
    this.valueContainer = document.querySelector(".value-container");
    var progressValue = this.quorumShow;
    if (coefficient < 100) {
      var progressEndValue = coefficient.toString().slice(0, 5);
    } else {
      var progressEndValue = coefficient;
    }
    progressEndValue = parseFloat(progressEndValue);
    var speed = 30;
    if (progressBar) {
      this.progress = setInterval(() => {
        progressValue++;
        progressBar.style.background = `conic-gradient(
        #e56e22 ${progressValue * 3.6}deg,
        #EEEEEE ${progressValue * 3.6}deg
      )`;
        if (progressValue > progressEndValue) {
          clearInterval(this.progress);
          this.valueContainer.textContent = `${progressEndValue}%`;
        } else {
          this.valueContainer.textContent = `${progressValue}%`;
        }
        if (progressValue > 100) {
          progressValue = 0;
          clearInterval(this.progress);
        }
      }, speed);
    }
    this.quorumShow = coefficient;
  }

  quorumAnimatedSocket(coefficient:any) {
    var progressBar = document.getElementById("circularprogress")!;
    this.valueContainer = document.querySelector(".value-container");
    var progressValue = this.quorumShow;
    if (coefficient < 100) {
      var progressEndValue = coefficient.toString().slice(0, 5);
    } else {
      var progressEndValue = coefficient;
    }
    progressEndValue = parseFloat(progressEndValue);
    var speed = 30;
    if (progressBar) {
      if (progressValue > progressEndValue) {
        this.progress = setInterval(() => {
          progressValue--;

          progressBar.style.background = `conic-gradient(
          #e56e22 ${progressValue * 3.6}deg,
          #EEEEEE ${progressValue * 3.6}deg
        )`;
          if (progressValue < progressEndValue) {
            clearInterval(this.progress);
            this.valueContainer.textContent = `${progressEndValue}%`;
          } else {
            this.valueContainer.textContent = `${progressValue}%`;
          }
          if (progressValue < 0) {
            progressValue = 0;
            clearInterval(this.progress);
          }
        }, speed);
      } else {
        this.progress = setInterval(() => {
          progressValue++;
          progressBar.style.background = `conic-gradient(
          #e56e22 ${progressValue * 3.6}deg,
          #EEEEEE ${progressValue * 3.6}deg
        )`;
          if (progressValue > progressEndValue) {
            clearInterval(this.progress);
            this.valueContainer.textContent = `${progressEndValue}%`;
          } else {
            this.valueContainer.textContent = `${progressValue}%`;
          }
          if (progressValue > 100) {
            progressValue = 0;
            clearInterval(this.progress);
          }
        }, speed);
      }
    }
    this.quorumShow = coefficient;
  }

  verifyQuorum() {
    if (this.withLimitTime) {
      swal.fire({
        showCancelButton: true,
        text: '¿Desea activar una verificación de Quórum?',
        confirmButtonColor: '#e56e22',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        icon: 'question',
      }).then((result:any) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append('key', this.config.key);
          formData.append('id', this.meeting_id);
          formData.append('end_session_time', this.end_session_time);
          this.httpClient.post(this.config.endpoint3 + 'PreRegisterMeetingServices/updateMeetingDetails', formData).subscribe((data:any) => {
            if (data['success']) {
              this.httpClient.get(this.config.endpoint6 + 'api/customers/askForCustomerPresence/' + this.keysession + '/' + this.meeting_id).subscribe((response :any)=> {
                this.httpClient.get(this.config.endpoint6 + 'api/reports/getChartsByMeeting/' + this.keysession + '/' + this.meeting_id)
                  .subscribe((resp2 :any)=> {
                    if (resp2['message'] == "La sesión es inválida") {
                      swal.fire({
                        title:'Atención', 
                        text:'Su sesión no es valida por favor ingrese de nuevo.', 
                        icon:'info',
                        backdrop: true,
                        allowOutsideClick: false // Aunque se muestre el backdrop, no permitir clics fuera
                      }).then((response:any)=>{
                        if(response.value){
                          this.storage.remove('user');
                          this.router.navigate(['/']);
                        }
                      })
                    } else {
                      if (resp2 == null) {
                        this.quorum = 0;
                        this.asistentes = 0;
                      }
                      else {
                        this.quorum = resp2['coefficient'];
                        this.asistentes = resp2['attendance'];
                        this.aportes = resp2['aportes'];
                        this.unidades = resp2['total_properties'];
                        if (this.quorumShow != this.quorum) {
                          this.quorumAnimatedSocket(this.quorum)
                        }
                      }
                    }
                  });
              });
            }
          });
        }
      });
    } else {
      swal.fire({
        showCancelButton: true,
        text: '¿Desea activar una verificación de Quórum?',
        confirmButtonColor: '#e56e22',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        icon: 'question',
      }).then((result:any) => {
        if (result.isConfirmed) {
          this.end_session_time = 2000;
          const formData = new FormData();
          formData.append('key', this.config.key);
          formData.append('id', this.meeting_id);
          formData.append('end_session_time', this.end_session_time);
          this.httpClient.post(this.config.endpoint3 + 'PreRegisterMeetingServices/updateMeetingDetails', formData).subscribe((data:any) => {
            if (data['success']) {
              this.httpClient.get(this.config.endpoint6 + 'api/customers/askForCustomerPresence/' + this.keysession + '/' + this.meeting_id).subscribe((response :any)=> {
                this.httpClient.get(this.config.endpoint6 + 'api/reports/getChartsByMeeting/' + this.keysession + '/' + this.meeting_id)
                  .subscribe((resp2 :any)=> {
                    if (resp2['message'] == "La sesión es inválida") {
                      swal.fire({
                        title:'Atención', 
                        text:'Su sesión no es valida por favor ingrese de nuevo.', 
                        icon:'info',
                        backdrop: true,
                        allowOutsideClick: false // Aunque se muestre el backdrop, no permitir clics fuera
                      }).then((response:any)=>{
                        if(response.value){
                          this.storage.remove('user');
                          this.router.navigate(['/']);
                        }
                      })
                    } else {
                      if (resp2 == null) {
                        this.quorum = 0;
                        this.asistentes = 0;
                      }
                      else {
                        this.quorum = resp2['coefficient'];
                        this.asistentes = resp2['attendance'];
                        this.aportes = resp2['aportes'];
                        this.unidades = resp2['total_properties'];
                        if (this.quorumShow != this.quorum) {
                          this.quorumAnimatedSocket(this.quorum)
                        }
                      }
                    }
                  });
              });
            }
          });
        }
      });
    }
  }

  closeVerifyQuorum() {
    this.httpClient.get(this.config.endpoint6 + 'api/customers/dropCustomerSessionsByMeeting/' + this.keysession + '/' + this.meeting_id).subscribe((response :any)=> {
    });
  }

}