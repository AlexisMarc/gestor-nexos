import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { SweetAlertType } from 'sweetalert2';
import { Chats } from '../../Interface/chats.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { SocketService } from '../../service/socket.service';
import { TwitchCallService } from '../../service/twitch-call.service';
import { StoreMeetingService } from '../../service/store-meeting.service';
import { WhatsappService } from '../../service/whatsaap_services';
declare var swal: any;
declare var bootstrap: any;

@Component({
  selector: 'app-intervention-control',
  templateUrl: './intervention-control.component.html',
  styleUrls: ['./intervention-control.component.scss']
})
export class InterventionControlComponent implements OnInit {

  data: any;
  data2: any;
  meeting_status: any;
  residential_id: any;
  meeting_id: any;
  name: string;
  date: any;
  meeting_time: any;
  meeting_time_start: '';
  is_online: any;
  youtube_link: any;
  youtube_share: any;
  max_agents = '3';
  max_units = '3';
  chat: Chats[] = [];
  chats: Chats[] = [];
  user_id = '9913';
  residential: any;
  zoom_link: SafeUrl;
  intervention_cant = 10;
  participants: any;
  interval: any;
  units: any;
  cant_notification = 0;
  cant_notification_compare = 0;
  cant_notification_participants = 0;
  cant_notification_participants_compare = 0;
  cant_user_sign = 0;
  cant_user_sign_compare = 0;
  keysession: string;
  nameUserToEdit = '';
  userIdToEdit = '';
  intervention_active = true;
  jitsi_link: string;
  password_meeting: string;
  userName = 'Nexos';
  hoursTimer = 0;
  minutesTimer = 2;
  secondsTimer = 0;
  hoursTimerLimit = 0;
  minutesTimerLimit = 2;
  secondsTimerLimit = 0;
  timerHide = true;
  viewVote = 0;
  status = 0;
  status2 = 0;
  interval3: any;
  st = '00';
  ht = '00';
  mt = '00';
  pauseTimerStatus = false;
  playTimer = 0;
  isTwitch = false;
  end_session_time: any;
  statusMic = 'true';
  statusCam = 'true';
  newTokenJWT:string
  intervention_status: boolean

  constructor(
    private _whatsappService : WhatsappService,
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService,
    private socketService: SocketService,
    private twitch: TwitchCallService,
    private storeMeeting: StoreMeetingService
  ) {
    
    const userStorage = this.storage.get('user');
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor' || userStorage['content']['profile'] === 'Moderador') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home/pointControl']);
      return;
    }
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['content']['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.keysession = userStorage['content']['token']
    this.residential_id = this.route.snapshot.paramMap.get('idResidential');
    this.httpClient.get(this.config.endpoint3 + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this.config.key + '&residential_id=' + this.residential_id).subscribe((response) => {
      this.meeting_id = response['content']['id'];
      
      this.httpClient.get(this.config.endpoint6+"api/meetings/getVideoMeetingToken/"+this.keysession+'/'+this.meeting_id).subscribe(Response =>{
        this.newTokenJWT = Response['content']
      })
      this.httpClient.get(this.config.endpoint6 + 'api/meetings/getMeetingDetails/' + this.keysession + '/' + this.meeting_id)
        .subscribe(resp => {
          if(resp['message']== "La sesión es inválida"){

          }else{
          this.meeting_status = resp['content']['meeting_status'];
          this.meeting_id = resp['content']['id'];
          this.name = resp['content']['name'];
          this.date = resp['content']['date'];
          this.meeting_time = resp['content']['meeting_time'];
          this.meeting_time_start = resp['content']['meeting_time_start'];
          this.is_online = resp['content']['is_online'];
          this.youtube_link = resp['content']['youtube_link'];
          this.youtube_share = resp['content']['youtube_share'];
          this.residential = resp['content']['residential'];
          this.jitsi_link = resp['content']['zoom_link'];
          this.password_meeting = resp['content']['pasword_meeting'];
          this.end_session_time = resp['content']['end_session_time'];
          if (this.youtube_share.match(/www/gi) == null && this.youtube_share.match(/http/gi) == null) {
            this.isTwitch = true;
          }
          this.zoom_link = this.sanitizer.bypassSecurityTrustResourceUrl('https://meet.jit.si/' + resp['content']['zoom_link']);
          this.interval = setTimeout(() => {
            if (this.youtube_share.match(/www/gi) != null || this.youtube_share.match(/http/gi) != null) {
              document.getElementById('youtube_id').setAttribute('src', this.youtube_share);
            } else {
              try {
                this.twitch.twitchInsert(this.youtube_share);
              } catch (error) {
              }
            }
          }, 1000);
          this.socketService.listen('hand_raised_' + this.meeting_id).subscribe((response) => {
            // console.log(response)
            this.countParticipantsSocket(response);
          });
          this.socketService.listen('new_property_added_' + this.meeting_id).subscribe((data) => {
            // console.log(data)
            this.cant_notification = data['total'];
          });
          this.socketService.listen('meeting_quorum_' + this.meeting_id).subscribe((response) => {
            // console.log(response)
            this.countParticipantsSocket(response);
          });
          this.httpClient.get(this.config.endpoint6 + 'api/units/getCustomerUnitsRequested/' + this.keysession + '/' + this.meeting_id + '/0')
            .subscribe(resp => {
              this.units = resp['content'];
              this.cant_notification = resp['content'].length;
              this.cant_notification_compare = resp['content'].length;
            });
          this.countParticipants();
          this.httpClient.get(this.config.endpoint6 + 'api/raisinghands/getActiveRecordByMeeting/' + this.keysession + '/' + this.meeting_id)
            .subscribe(resp => {
              this.intervention_active = resp['status_id'];
            });
          setTimeout(() => {
            document.getElementById('jitsi_button').click();
            setTimeout(() => {
              document.getElementById('buttonStatusMic').click();
              document.getElementById('buttonStatusCam').click();
              setTimeout(() => {
                this.statusMic = (<HTMLInputElement>document.getElementById('statusMic')).value;
                this.statusCam = (<HTMLInputElement>document.getElementById('statusCam')).value;
              }, 1000);
            }, 500);
          }, 1000);
        }
        }); 
    });

    
  }

  

  ngOnInit() {
    $(".menu-not-closed").click(function (e) {
      e.stopPropagation();
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.socketService.removeListen('hand_raised_' + this.meeting_id);
    this.socketService.removeListen('new_property_added_' + this.meeting_id);
    this.socketService.removeListen('meeting_quorum_' + this.meeting_id)
  }

  goPointContrpl(residential_id) {
    this.router.navigate(['home/pointControlMeeting/' + residential_id])
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

  goCustomerControl() {
    this.router.navigate(['home/interventioncontrol/' + this.residential_id + '/addunits/' + this.residential_id + '/' + this.meeting_id])
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 100);
  }

  goVoteControl() {
    this.router.navigate(['home/interventioncontrol/' + this.residential_id + '/crearVotacion/' + this.residential_id + '/' + this.meeting_id])
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 100);

  }

  goDocument() {
    this._whatsappService.postValidateNexosToken().subscribe(response=>{
      if (response['success'] == false) {
        swal.fire({
          title:'Atención', 
          text:'Su sesión no es valida por favor ingrese de nuevo.', 
          icon:'info',
          backdrop: true,
          allowOutsideClick: false // Aunque se muestre el backdrop, no permitir clics fuera
        }).then(response=>{
          if(response.value){
            this.storage.remove('user');
            this.router.navigate(['/']);
          }
        })
      }else{
        this.router.navigate(['home/interventioncontrol/' + this.residential_id + '/cargardocumentos/' + this.residential_id + '/' + this.meeting_id])
        setTimeout(function () {
          window.scrollTo(0, 550);
        }, 100);
      }
    })
    
  }

  goQuorum() {
    this.router.navigate([
      "home/interventioncontrol/" +
        this.residential_id +
        "/quorum/" +
        this.residential_id +
        "/" +
        this.meeting_id +
        "/1",
    ]);
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 100);
  }

  goVotes() {
    this._whatsappService.postValidateNexosToken().subscribe(response=>{
      if (response['success'] == false) {
        swal.fire({
          title:'Atención', 
          text:'Su sesión no es valida por favor ingrese de nuevo.', 
          icon:'info',
          backdrop: true,
          allowOutsideClick: false // Aunque se muestre el backdrop, no permitir clics fuera
        }).then(response=>{
          if(response.value){
            this.storage.remove('user');
            this.router.navigate(['/']);
          }
        })
      }else{
        this.router.navigate([
          "home/interventioncontrol/" +
            this.residential_id +
            "/votaciones/" +
            this.residential_id +
            "/" +
            this.meeting_id,
        ]);
        setTimeout(function () {
          window.scrollTo(0, 550);
        }, 100);
      }
    })
    
  }

  goChat() {
    this.router.navigate([
      "home/interventioncontrol/" +
        this.residential_id +
        "/chat/" +
        this.residential_id +
        "/" +
        this.meeting_id,
    ]);
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 100);
  }

  goReturn() {
    this.router.navigate(["home/interventioncontrol/" + this.residential_id]);
  }
  //Método que inicia las intervenciones en la plataforma.
  iniciar() {
    this._whatsappService.postValidateNexosToken().subscribe(response=>{
      if(response['success'] == false){
        swal.fire({
          title:'Atención', 
          text:'Su sesión no es valida por favor ingrese de nuevo.', 
          icon:'info',
          backdrop: true,
          allowOutsideClick: false // Aunque se muestre el backdrop, no permitir clics fuera
        }).then(response=>{
          if(response.value){
            this.storage.remove('user');
            this.router.navigate(['/']);
          }
        })
      }else{
        this.status = 1;
        var button = document.getElementById("button-event");
        const formData = new FormData();
        formData.append("key", this.config.key);
        formData.append("residential_id", this.residential_id);
        //Antes de iniciar una ronda de intervenciones, primero debe cerrarse la ronda anterior, para ello se usa el servicio closeRasingHandsRecordPost ->
        this.httpClient
          .post(
            this.config.endpoint3 + "VotingServices/closeRasingHandsRecordPost",
            formData
          )
          .subscribe((resp) => {
            // console.log(resp)
            const formData2 = new FormData();
            formData2.append("key", this.config.key);
            formData2.append("residential_id", this.residential_id);
            formData2.append("participation_limit", "" + this.intervention_cant);
            //Para activar una ronda de intervención, se usa el servicio createRasingHandsRecordPost ->
            this.httpClient
              .post(
                this.config.endpoint3 +
                  'VotingServices/createRasingHandsRecordPost',
                formData2
              )
              .subscribe((resp2) => {
                // console.log(resp2)
                if (resp2["success"]) {
                  this.status = 2;
                  button!.classList.toggle("succes-event");
                  setTimeout(() => {
                    button!.classList.toggle("succes-event");
                    this.status = 0;
                  }, 3000);
                  this.intervention_active = true;
                } else {
                  this.status = 3;
                  button!.classList.toggle("succes-not-event");
                  setTimeout(() => {
                    button!.classList.toggle("succes-not-event");
                    this.status = 0;
                  }, 3000);
                }
              });
          });
      }
    })
    
  }

  click(){
    // console.log(this.participants)
  }

  countParticipantsSocket(resp){
    // console.log(resp)
    this.cant_notification_participants = 0;
    this.cant_notification_participants_compare = 0;
    this.participants = (resp["content"])? JSON.parse(resp["content"]):[]
    // console.log(this.participants)
    this.participants.forEach((element: { raised_hand: any }) => {
      element.raised_hand = (element.raised_hand == 'true')? true : false
      if (element.raised_hand == true) {
        this.cant_notification_participants++;
        this.cant_notification_participants_compare++;
      }
    });
  }
  
  //El siguiente método se usa para actualizar la lista de usuarios que están en participantes.
  countParticipants() {
    //El servicio getCustomersSession obtiene la lista deusuarios que tienen una sesión activa.
    this.httpClient
      .get(
        this.config.endpoint6 +
          "api/customers/getCustomersSession/" +
          this.keysession +
          "/" +
          this.meeting_id
      )
      .subscribe((resp) => {
        // console.log(resp)
        this.cant_notification_participants = 0;
        this.cant_notification_participants_compare = 0;
        this.participants = resp["content"];
        this.participants.forEach((element: { raised_hand: any }) => {
          if (element.raised_hand) {
            this.cant_notification_participants++;
            this.cant_notification_participants_compare++;
          }
        });
      });
  }

  cerrar() {
    this.status2 = 1;
    var button = document.getElementById("button-event-2");
    this.httpClient
      .get(
        this.config.endpoint6 +
          "api/raisinghands/closeRasingHandsRecord/" +
          this.keysession +
          "/" +
          this.meeting_id
      )
      .subscribe((resp) => {
        if (resp['message'] == "La sesión es inválida") {
          swal.fire({
            title:'Atención', 
            text:'Su sesión no es valida por favor ingrese de nuevo.', 
            icon:'info',
            backdrop: true,
            allowOutsideClick: false // Aunque se muestre el backdrop, no permitir clics fuera
          }).then(response=>{
            if(response.value){
              this.storage.remove('user');
              this.router.navigate(['/']);
            }
          })
        }else{
        if (resp["success"]) {
          this.status2 = 2;
          button!.classList.toggle("succes-event");
          setTimeout(() => {
            button!.classList.toggle("succes-event");
            this.status2 = 0;
          }, 3000);
          this.intervention_active = false;
        } else {
          this.status2 = 3;
          button!.classList.toggle("succes-not-event");
          setTimeout(() => {
            button!.classList.toggle("succes-not-event");
            this.status2 = 0;
          }, 3000);
        }
      }
      });
  }

  status1() {
    const formData2 = new FormData();
    formData2.append("id", this.meeting_id);
    formData2.append("meeting_status", "1");
    this.meeting_status = "1";
    this.httpClient
      .post(
        this.config.endpoint6 +
          "api/meetings/updateMeetingDetails/" +
          this.keysession,
        formData2
      )
      .subscribe((data) => {
        this.data = data;
        let iconStatus: SweetAlertType = "success";
        let iconStatus2: SweetAlertType = "warning";
        if (data["success"] === true) {
          if (data["success"]) {
            iconStatus = "success";
          }
          swal.fire("Correcto", data["message"], iconStatus);
        } else {
          if (data["success"]) {
            iconStatus2 = "warning";
          }
          swal.fire("Incorrecto", data["message"], iconStatus2);
        }
      });
  }

  closeMeeting() {
    const formData2 = new FormData();
    // formData2.append('key', this.config.key);
    formData2.append("id", this.meeting_id);
    formData2.append("meeting_status", "2");
    this.meeting_status = "2";
    swal
      .fire({
        title: "Esta seguro de cerrar la asamblea?",
        showCancelButton: true,
        confirmButtonColor: "#ff7300",
        cancelButtonColor: "#444",
        confirmButtonText: "Si, cerrar!",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.value) {
          this.httpClient
            .post(
              this.config.endpoint6 +
                "api/meetings/updateMeetingDetails/" +
                this.keysession,
              formData2
            )
            .subscribe((data) => {
              this.data2 = data;
              let iconStatus: SweetAlertType = "success";
              let iconStatus2: SweetAlertType = "warning";
              if (data["success"] === true) {
                if (data["success"]) {
                  iconStatus = "success";
                }
                swal.fire("Correcto", data["message"], iconStatus);
              } else {
                if (data["success"]) {
                  iconStatus2 = "warning";
                }
                swal.fire("Incorrecto", data["message"], iconStatus2);
              }
            });
        }
      });
  }

  closeRegister() {
    const formData2 = new FormData();
    formData2.append("key", this.config.key);
    formData2.append("id", this.meeting_id);
    formData2.append("meeting_status", "3");
    this.meeting_status = "2";
    swal
      .fire({
        title: "Esta seguro de cerrar el registro?",
        showCancelButton: true,
        confirmButtonColor: "#ff7300",
        cancelButtonColor: "#444",
        confirmButtonText: "Si, cerrar!",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.value) {
          this.httpClient
            .post(
              this.config.endpoint3 +
                "PreRegisterMeetingServices/updateMeetingDetails",
              formData2
            )
            .subscribe((data) => {
              this.data2 = data;
              let iconStatus: SweetAlertType = "success";
              let iconStatus2: SweetAlertType = "warning";
              if (data["success"] === true) {
                if (data["success"]) {
                  iconStatus = "success";
                }
                swal.fire("Correcto", data["message"], iconStatus);
              } else {
                if (data["success"]) {
                  iconStatus2 = "warning";
                }
                swal.fire("Incorrecto", data["message"], iconStatus2);
              }
            });
        }
      });
  }

  statuschat1() {
    const formData2 = new FormData();
    formData2.append("key", this.config.key);
    formData2.append("id", this.meeting_id);
    formData2.append("enable_chat", "1");
    this.httpClient
      .post(
        this.config.endpoint3 +
          "PreRegisterMeetingServices/updateMeetingDetails",
        formData2
      )
      .subscribe((data) => {
        let iconStatus: SweetAlertType = "success";
        let iconStatus2: SweetAlertType = "warning";
        if (data["success"] === true) {
          if (data["success"]) {
            iconStatus = "success";
          }
          swal.fire("Correcto", data["message"], iconStatus);
        } else {
          if (data["success"]) {
            iconStatus2 = "warning";
          }
          swal.fire("Incorrecto", data["message"], iconStatus2);
        }
      });
  }

  statuschat2() {
    const formData2 = new FormData();
    formData2.append("key", this.config.key);
    formData2.append("id", this.meeting_id);
    formData2.append("enable_chat", "0");
    this.httpClient
      .post(
        this.config.endpoint3 +
          "PreRegisterMeetingServices/updateMeetingDetails",
        formData2
      )
      .subscribe((data) => {
        let iconStatus: SweetAlertType = "success";
        let iconStatus2: SweetAlertType = "warning";
        if (data["success"] === true) {
          if (data["success"]) {
            iconStatus = "success";
          }
          swal.fire("Correcto", data["message"], iconStatus);
        } else {
          if (data["success"]) {
            iconStatus2 = "warning";
          }
          swal.fire("Incorrecto", data["message"], iconStatus2);
        }
      });
  }

  reloadTransmision() {
    var iframe = document.getElementById("youtube_id") as HTMLImageElement;
    iframe.src = iframe.src;
  }

  Delete(
    request_id: string,
    index: number,
    customer_id: string,
    unit_id: string
  ) {
    var formData = new FormData();
    formData.append("id", request_id);
    formData.append("status", "2");
    formData.append("customer_id", customer_id);
    formData.append("unit_id", unit_id);
    formData.append("meeting_id", this.meeting_id);
    this.httpClient
      .post(
        this.config.endpoint6 +
          "api/units/updatePropertyRequestRecord/" +
          this.keysession,
        formData
      )
      .subscribe((response) => {
        if (response["success"]) {
          // swal.fire({
          //   icon: 'success',
          //   text: 'La solicitud ha sido denegada correctamente',
          //   confirmButtonColor: '#e56e22 ',
          //   confirmButtonText: 'Ok ',
          //   timer: '5000'
          // });
          var myAlert = document.getElementById("alert-union-2");
          var bsAlert = new bootstrap.Toast(myAlert, { delay: 5000 });
          bsAlert.show();
          this.units.splice(index, 1);
          this.cant_notification--;
          this.cant_notification_compare--;
        } else {
          swal.fire({
            icon: "info",
            text: "No se pudo completar su solicitud",
            confirmButtonColor: "#e56e22 ",
            confirmButtonText: "Ok ",
            timer: "5000",
          });
        }
      });
  }

  Save(
    request_id: string,
    index: number,
    customer_id: string,
    unit_id: string
  ) {
    var formData = new FormData();
    formData.append("id", request_id);
    formData.append("status", "1");
    formData.append("customer_id", customer_id);
    formData.append("unit_id", unit_id);
    formData.append("meeting_id", this.meeting_id);
    this.httpClient
      .post(
        this.config.endpoint6 +
          "api/units/updatePropertyRequestRecord/" +
          this.keysession,
        formData
      )
      .subscribe((response) => {
        if (response["success"]) {
          var myAlert = document.getElementById("alert-union");
          var bsAlert = new bootstrap.Toast(myAlert, { delay: 5000 });
          bsAlert.show();
          // swal.fire({
          //   icon: 'success',
          //   text: 'La solicitud ha sido confirmada correctamente',
          //   confirmButtonColor: '#e56e22 ',
          //   confirmButtonText: 'Ok ',
          //   timer: '5000'
          // });
          this.units.splice(index, 1);
          this.cant_notification--;
          this.cant_notification_compare--;
        } else {
          swal.fire({
            icon: "info",
            text: "No se pudo completar su solicitud",
            confirmButtonColor: "#e56e22 ",
            confirmButtonText: "Ok ",
            timer: "5000",
          });
        }
      });
  }

  kickoutParticipant(customer_id: string) {
    swal
      .fire({
        showCancelButton: true,
        text: "¿Esta seguro que desea expulsar a este usuario?",
        confirmButtonColor: "#e56e22",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        icon: "question",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.httpClient
            .get(
              this.config.endpoint6 +
                "api/customers/removeUserFromMeeting/" +
                this.keysession +
                "/" +
                customer_id +
                "/" +
                this.meeting_id
            )
            .subscribe((response) => {
              if (response["success"]) {
                swal.fire({
                  icon: "success",
                  text: response["message"],
                  confirmButtonColor: "#e56e22 ",
                  confirmButtonText: "Ok ",
                  timer: "5000",
                });
                this.countParticipants();
              } else {
                swal.fire({
                  icon: "info",
                  text: response["message"],
                  confirmButtonColor: "#e56e22 ",
                  confirmButtonText: "Ok ",
                  timer: "5000",
                });
              }
            });
        }
      });
  }

  getListRequestByUser() {
    if (this.cant_notification_compare != this.cant_notification) {
      this.httpClient
        .get(
          this.config.endpoint6 +
            "api/units/getCustomerUnitsRequested/" +
            this.keysession +
            "/" +
            this.meeting_id +
            "/0"
        )
        .subscribe((resp) => {
          this.units = resp["content"];
          this.cant_notification = resp["content"].length;
          this.cant_notification_compare = resp["content"].length;
        });
    }
  }

  closedDropDown(elementId) {
    document.getElementById(elementId).click();
  }

  accepted_intervention(
    customer_id: string | Blob,
    raised_hand_id: string | Blob,
    raising_hand_record_id

  ) {
    var formData = new FormData();
    formData.append("customer_id", customer_id);
    formData.append("meeting_id", this.meeting_id);
    formData.append("id", raised_hand_id);
    formData.append("raising_hand_record_id", raising_hand_record_id);
    formData.append("accepted", "1");
    this.httpClient
      .post(
        this.config.endpoint6 + "api/raisinghands/store/" + this.keysession,
        formData
      )
      .subscribe((resp) => {
        if (resp["success"]) {
          this.countParticipants();
        }
      });
  }

  refuse_intervention(customer_id, raising_hand_id,raising_hand_record_id) {
    if (
      raising_hand_id != null &&
      raising_hand_id != "" &&
      raising_hand_id != undefined
    ) {
      var formData = new FormData();
      formData.append("customer_id", customer_id);
      formData.append("meeting_id", this.meeting_id);
      formData.append("id", raising_hand_id);
      formData.append("raising_hand_record_id", raising_hand_record_id);
      formData.append("accepted", "2");
      this.httpClient
        .post(
          this.config.endpoint6 + "api/raisinghands/store/" + this.keysession,
          formData
        )
        .subscribe((resp) => {
          if (resp["success"]) {
            this.countParticipants();
          }
        });
    }
  }

  raised_hand_from_gestor(customer_id) {
    var formData = new FormData();
    formData.append("customer_id", customer_id);
    formData.append("meeting_id", this.meeting_id);
    formData.append("id", "0");
    formData.append("accepted", "1");
    this.httpClient
      .post(
        this.config.endpoint6 + "api/raisinghands/store/" + this.keysession,
        formData
      )
      .subscribe((resp) => {
        if (resp["success"]) {
          this.countParticipants();
        }
      });
  }

  selectUser(customer_id, nameRegister) {
    this.userIdToEdit = customer_id;
    this.nameUserToEdit = nameRegister;
  }

  changeNameOfUser() {
    const formData = new FormData();
    formData.append("key", this.config.key);
    formData.append("id", this.userIdToEdit);
    formData.append("nameRegister", this.nameUserToEdit);
    this.httpClient
      .post(
        this.config.endpoint3 +
          "CustomerRegistrationServices/updateCustomerData",
        formData
      )
      .subscribe((response) => {
        if (response["success"]) {
          this.countParticipants();
        }
      });
  }

  getlistParticipants() {
    if (
      this.cant_notification_participants !=
      this.cant_notification_participants_compare
    ) {
      this.countParticipants();
    }
  }

  showUnitsVote() {
    this.viewVote = 1;
  }

  verifyQuorum() {
    // if (this.viewVote = 0) {
    //   this.viewVote = 1;
    // } else {
    this.viewVote = 2;
    // }
    // swal.fire({
    //   showCancelButton: true,
    //   text: 'Desea activar una verificación de quorum?',
    //   confirmButtonColor: '#e56e22',
    //   confirmButtonText: 'Si',
    //   cancelButtonText: 'No',
    //   icon: 'question',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     const formData = new FormData();
    //     formData.append('key', this.config.key);
    //     formData.append('id', this.meeting_id);
    //     formData.append('end_session_time', this.end_session_time);
    //     this.httpClient.post(this.config.endpoint3 + 'PreRegisterMeetingServices/updateMeetingDetails', formData).subscribe(data => {
    //       if (data['success']) {
    //         this.httpClient.get(this.config.endpoint6 + 'ApiCustomers/askForCustomerPresence/' + this.keysession + '/' + this.meeting_id).subscribe(response => {
    //         });
    //       }
    //     });
    //   }
    // })
  }

  startTimer() {
    clearInterval(this.interval3);
    this.httpClient
      .get(
        this.config.endpoint6 +
          "api/meetings/startTimer/" +
          this.keysession +
          "/" +
          this.meeting_id +
          "/" +
          this.hoursTimer +
          "/" +
          this.minutesTimer +
          "/" +
          this.secondsTimer
      )
      .subscribe((response) => {
        this.startTimerShow(
          this.hoursTimer,
          this.minutesTimer,
          this.secondsTimer
        );
        this.playTimer = 1;
        this.pauseTimerStatus = false;
      });
  }

  startTimerShow(hours, minutes, seconds) {
    if (seconds > 0 || minutes > 0 || hours > 0) {
      this.interval3 = setInterval(() => {
        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          }
          if (hours > 0 && minutes == 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          }
        }
        if (minutes == 0 && seconds == 0 && hours == 0) {
          clearInterval(this.interval3);
          this.playTimer = 0;
        }
        this.st = ("0" + seconds).slice(-2);
        this.mt = ("0" + minutes).slice(-2);
        this.ht = ("0" + hours).slice(-2);
      }, 1000);
    }
  }

  reloadTimer() {
    this.hoursTimer = this.hoursTimerLimit;
    this.minutesTimer = this.minutesTimerLimit;
    this.secondsTimer = this.secondsTimerLimit;
    clearInterval(this.interval3);
    this.httpClient
      .get(
        this.config.endpoint6 +
          "api/meetings/startTimer/" +
          this.keysession +
          "/" +
          this.meeting_id +
          "/" +
          this.hoursTimer +
          "/" +
          this.minutesTimer +
          "/" +
          this.secondsTimer
      )
      .subscribe((response) => {
        this.startTimerShow(
          this.hoursTimer,
          this.minutesTimer,
          this.secondsTimer
        );
      });
  }

  pauseTimer() {
    if (this.pauseTimerStatus) {
      clearInterval(this.interval3);
      this.httpClient
        .get(
          this.config.endpoint6 +
            "api/meetings/startTimer/" +
            this.keysession +
            "/" +
            this.meeting_id +
            "/" +
            this.ht +
            "/" +
            this.mt +
            "/" +
            this.st
        )
        .subscribe((response) => {
          this.startTimerShow(this.ht, this.mt, this.st);
          this.pauseTimerStatus = false;
          this.playTimer = 1;
        });
    } else {
      clearInterval(this.interval3);
      this.httpClient
        .get(
          this.config.endpoint6 +
            "api/meetings/startTimer/" +
            this.keysession +
            "/" +
            this.meeting_id +
            "/0/0/0"
        )
        .subscribe((response) => {
          this.pauseTimerStatus = true;
          this.playTimer = 2;
        });
    }
  }

  stopTimer() {
    clearInterval(this.interval3);
    this.httpClient
      .get(
        this.config.endpoint6 +
          "api/meetings/startTimer/" +
          this.keysession +
          "/" +
          this.meeting_id +
          "/d/a/s"
      )
      .subscribe((response) => {
        this.playTimer = 0;
        this.ht = "00";
        this.mt = "00";
        this.st = "00";
      });
  }

  hideTimer(statusShowTimer) {
    if (this.timerHide) {
      this.timerHide = false;
    } else {
      this.timerHide = true;
    }
  }

  showUnitToVote() {
    this.viewVote = 0;
  }

  voteModal() {
    this.viewVote = 0;
  }

  blockChat(customer_id: string, status_chat, index) {
    const formData2 = new FormData();
    formData2.append("key", this.config.key);
    formData2.append("id", customer_id);
    formData2.append("can_chat", status_chat);
    this.httpClient
      .post(
        this.config.endpoint3 +
          "CustomerRegistrationServices/updateCustomerData",
        formData2
      )
      .subscribe((response) => {
        if (response["success"]) {
          this.participants[index]["can_chat"] = status_chat;
        }
      });
  }

  getUnitByFilter2(n: any, id: any) {
    if((document.getElementById(id) as HTMLInputElement).value.toUpperCase().length >0){
      this.socketService.removeListen('hand_raised_' + this.meeting_id)
      this.socketService.removeListen('meeting_quorum_' + this.meeting_id)
    }else{
      this.countParticipants();
     this.socketService.listen('hand_raised_' + this.meeting_id).subscribe((response) => {
        this.countParticipantsSocket(response);
      });
      this.socketService.listen('meeting_quorum_' + this.meeting_id).subscribe((response) => {
        this.countParticipantsSocket(response);
      });
    }
    
    // Declare variables
    const input = (document.getElementById(id) as HTMLInputElement).value.toUpperCase();
    const table = document.getElementById("myTable2") as HTMLTableElement;
    const tr = table.getElementsByTagName("tr");
    
    for (let i = 0; i < tr.length; i++) {
      const td = tr[i].getElementsByTagName("td")[n];
      if (td) {
        const txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(input) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  changeIconMic() {
    if (this.statusMic == "true") {
      this.statusMic = "false";
    } else {
      this.statusMic = "true";
    }
  }

  changeIconMicButton() {
    setTimeout(() => {
      this.statusMic = (<HTMLInputElement>(
        document.getElementById("statusMic")
      )).value;
      this.statusCam = (<HTMLInputElement>(
        document.getElementById("statusCam")
      )).value;
    }, 500);
  }

  changeIconCam() {
    if (this.statusCam == "true") {
      this.statusCam = "false";
    } else {
      this.statusCam = "true";
    }
  }

  changeIconCamButton() {
    setTimeout(() => {
      this.statusMic = (<HTMLInputElement>(
        document.getElementById("statusMic")
      )).value;
      this.statusCam = (<HTMLInputElement>(
        document.getElementById("statusCam")
      )).value;
    }, 500);
  }

  // BLUM(){
  //   const token = generate('my private key', { // Pass your generated private key
  //     id: uuid(), // You can generate your own id and replace uuid()
  //     name: "my user name", // Set the user name
  //     email: "my user email", // Set the user email
  //     avatar: "my avatar url", // Set the user avatar
  //     appId: "my app id", // Your AppID
  //     kid: "my api key" // Set the api key, see https://jaas.8x8.vc/#/apikeys for more info.
  // });

  // console.log(token); // Write JWT to console.
  // }
}
