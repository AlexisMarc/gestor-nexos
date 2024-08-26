import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { listadoUnidadEnvio } from '../../interface/listadounidadenvio';
import { AddunitserviceService } from '../../service/addunitservice.service';
import { listadoUnidad } from '../../interface/listadounidad';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { StoreMeetingService } from '../../service/store-meeting.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { FormControl, FormGroup } from '@angular/forms';
import { SendMessageService } from '../../service/send-message.service';
import { EditEmailUserService } from '../../service/editEmailUser.service';
import { AddSupportCalledService } from '../../service/AddSupportCalled.service';
import { SendmailService } from '../../service/sendmail.service';
import { SocketService } from '../../service/socket.service';
import { TwitchCallService } from '../../service/twitch-call.service';
declare var moment: any;

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  profileForm = new FormGroup({
    message: new FormControl(''),
  });

  residential_id: any;
  document_number: any;
  customer_id!: string;
  listadoUnidad: any = []
  listadoUnidadData: any =[];
  ListadoConjuntosSelect: [] = [];
  ListadoUnidades: [] = [];
  sector!: string;
  name_unidad!: string;
  int = 'value';
  int2:any = 'value';
  unidadesOk = false;
  id_unit_add = 'value';
  add_unit_text!: string;
  show_components = 0;
  nameRegister!: string;
  name!: string;
  residential_name!: string;
  meeting_id!: string;
  Problem = '0';
  userEmail: any;
  dataUser: any;
  userStorage: any;
  interval5: any;
  youtube_link!: string;
  //var chat
  message!: string;
  id_conjunto: any;
  user_id: string;
  unit_id!: string;
  messages: any[] = [];
  chats!: number;
  is_mobil = false;
  code: any;
  id_user: any;
  votacion = 0;
  enable_chat = 0;
  filter = '';
  moroso!: string;
  token!: string;
  customer_id_send!: string;
  //Form receive call
  form_name!: string;
  form_email = '';
  form_phone!: string;
  form_description = "";
  form_resolve = "1"
  form_unit!: string;
  scrollAuto = 1;
  keysession: string;
  newMessage: any;
  listDocument: [] = [];
  interval: any;
  isTwitch = false;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
    private editEmailService: EditEmailUserService, @Inject(SESSION_STORAGE)
    private storage: WebStorageService,
    private sendMessage: SendMessageService,
    private addSupportCalledService: AddSupportCalledService,
    private sendmailService: SendmailService,
    private socketService: SocketService,
    private twitch: TwitchCallService) {
    this.residential_id = this.route.snapshot.paramMap.get('idResidential');
    this.userStorage = this.storage.get('user');
    this.user_id = this.userStorage['content']['id'];
    this.keysession = this.userStorage['content']['token'];
    this.httpClient.get(this.config.endpoint3 + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this.config.key + '&residential_id=' + this.residential_id)
      .subscribe((resp:any)=> {
        this.residential_name = resp['content']['residential'];
        this.meeting_id = resp['content']['id'];
        this.youtube_link = resp['content']['youtube_share'];
        if (this.youtube_link.match(/www/gi) == null && this.youtube_link.match(/http/gi) == null) {
          this.isTwitch = true;
        }
        this.interval = setTimeout(() => {
          if (this.youtube_link.match(/www/gi) != null || this.youtube_link.match(/http/gi) != null) {
            document.getElementById('youtube')!.setAttribute('src', this.youtube_link);
          } else {
            try {
              this.twitch.twitchInsert(this.youtube_link);
            } catch (error) {

            }
          }
        }, 1000);
        this.httpClient.get(this.config.endpoint6 + 'api/chat/getMessagesFromMeeting/' + this.keysession + '/' + this.meeting_id + '/50')
          .subscribe((resp2 :any)=> {
            this.messages = resp2['content']['messages'];
            if (this.scrollAuto == 1) {
              setTimeout(() => {
                this.scrollBottom();
              }, 500);
            }
            for (let index = 0; index < this.messages.length; index++) {
              this.messages[index]['created_at'] = this.transformTimeZone(this.messages[index]['created_at']);
            }
          });
        this.socketService.listen('meeting_chat_' + this.meeting_id).subscribe((response:any) => {
          this.newMessage = response;
          this.newMessage['created_at'] = this.transformTimeZone(this.newMessage['created_at']);
          this.messages.push(this.newMessage);
          if (this.scrollAuto == 1) {
            setTimeout(() => {
              this.scrollBottom();
            }, 500);
          }
        });
      });
    //Listado de documentos
    this.httpClient.get(this.config.endpoint3 + 'PreRegisterMeetingServices/getMeetingFilesListedEncoded?key=' + this.config.key + '&residential_id=' + this.residential_id)
      .subscribe((resp2 :any)=> {
        this.listDocument = resp2['content']
      });
    //servicio obtener unidades
    this.httpClient.get(this.config.endpoint3 + 'AppServices/getBuildingsUnitByResidential?key=' + this.config.key + '&user_id=' + this.customer_id + '&residential_id=' + this.residential_id)
      .subscribe((resp4:any) => {
        this.ListadoConjuntosSelect = resp4['content'];
        if (resp4['success'] === true) {
          this.sector = resp4['content'][0]['name'];
        } else {
          this.sector = 'Sector';
        }
        if (resp4['success'] === true) {
          this.name_unidad = resp4['content'][0]['units'][0]['name'];
        } else {
          this.name_unidad = 'Unidad';
        }
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    clearInterval(this.interval5);
    this.socketService.removeListen('meeting_chat_' + this.meeting_id)
  }

  onSubmit() {
    if (this.profileForm.value.message == '' || this.profileForm.value.message == ' ') {
      swal.fire({
        title: '<strong>Atención</strong>',
        icon: 'error',
        html:
          'Debe escribir algo',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> ok',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> No',
      })
      return
    }
    if (this.profileForm.value.message == null || this.profileForm.value.message == 'null') {
      swal.fire({
        title: '<strong>Atención</strong>',
        icon: 'error',
        html:
          'No se pueden enviar caracteres especiales',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> ok',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> No',
      })
      return
    }
    const formData = new FormData();
    formData.append('meeting_id', this.meeting_id);
    formData.append('message', this.profileForm.value.message);
    this.sendMessage.sendMessage(formData, this.keysession);
    this.message = '';
    this.profileForm.reset();
  }


  registerSupport() {
  }

  cambio() {
    if (this.int2 == 'value') {
      this.id_unit_add = 'value';
      this.unidadesOk = true;
    }
    else {
      this.ListadoUnidades = this.ListadoConjuntosSelect[this.int2]['units'];
      this.int = this.ListadoConjuntosSelect[this.int2]['number'];
      this.unidadesOk = true;
      this.id_unit_add = 'value';
    }
  }

  enableLogin() {
    const formData2 = new FormData();
    formData2.append('key', this.config.key);
    formData2.append('is_online', "0")
    formData2.append('document_number', this.document_number)
    formData2.append('token', this.token);
    this.httpClient.post(this.config.endpoint3 + 'CustomerRegistrationServices/updateUserSignInStatus', formData2).subscribe((resp3:any) => {
      swal.fire({
        title: '<strong>Mensaje</strong>',
        icon: 'success',
        html:
          resp3['message'],
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> ok',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> No',
      })
    });
  }

  getCustomerDetails() {
    this.listadoUnidad = [];
    this.httpClient.get(this.config.endpoint3 + 'ResidentServices/getResidentByDocumentNumber?key=' + this.config.key + '&document_number=' + this.document_number)
      .subscribe((resp:any)=> {
        if (resp['success'] === true) {
          this.show_components = 1;
          this.nameRegister = resp['content']['nameRegister'];
          this.name = resp['content']['name'];
          this.userEmail = resp['content']['email'];
          this.form_email = resp['content']['email'];
        }
        this.customer_id = resp['content']['id'];
        this.customer_id_send = resp['content']['id'];
        this.httpClient.get(this.config.endpoint3 + 'ResidentialServices/getCustomerProperties?key=' + this.config.key + '&user_id=' + this.customer_id + '&residential_id=' + this.residential_id)
          .subscribe((resp2 :any)=> {
            this.listadoUnidadData = resp2['content']['properties'];
            this.moroso = resp2['content']['moroso'];
            for (let index = 0; index < this.listadoUnidadData.length; index++) {
              let unidad = new listadoUnidad(this.listadoUnidadData[index]['building_name'], this.listadoUnidadData[index]['building_number'],
                this.listadoUnidadData[index]['unit_name'], this.listadoUnidadData[index]['unit_number'], this.listadoUnidadData[index]['unit_id'],
                this.listadoUnidadData[index]['total_users'])
              this.listadoUnidad.push(unidad);
            }
            this.httpClient.get(this.config.endpoint3 + 'CustomerRegistrationServices/getEntryTokenByCustomerByMeeting?key=' + this.config.key + '&customer_id=' + this.customer_id + '&meeting_id=' + this.meeting_id)
              .subscribe((resp3:any) => {
                this.token = resp3['content'];
              });
          });
      });
  }

  selectedUser() {
    var unit_name = this.ListadoUnidades.find(units => units['id'] === this.id_unit_add)!;
    this.form_unit = this.ListadoConjuntosSelect[this.int2]['name'] + " " + this.ListadoConjuntosSelect[this.int2]['number'] + ' ' + unit_name['name'] + ' ' + unit_name['number']
    this.httpClient.get(this.config.endpoint3 + 'ResidentServices/getResidentByUnitNumber?key=' + this.config.key + '&unit_id=' + this.id_unit_add)
      .subscribe((resp:any)=> {
        this.document_number = resp['content']['document_number'];
        this.getCustomerDetails();
      });
  }

  goMenuSearchMeeting() {
    this.router.navigate(['home/Soporte']);
  }

  goHome() {
    this.router.navigate(['home/']);
  }

  sendMail() {


    if (this.userEmail != '') {
      this.sendmailService.SendMailServiceByUnit(this.keysession, this.customer_id_send, this.meeting_id);
    } else {
      swal.fire(
        'Alerta',
        'El usuario no tiene un correo registrado',
        'warning'
      )
    }
  }

  editEmail() {
    const formData2 = new FormData();
    formData2.append('key', this.config.key);
    formData2.append('id', this.customer_id);
    formData2.append('email', this.userEmail);
    this.editEmailService.editMail(formData2);
  }

  saveFormCall() {
    const formData = new FormData();
    formData.append('key', this.config.key)
    formData.append('id', '0')
    formData.append('name_client', this.form_name)
    formData.append('phone', this.form_phone)
    formData.append('email', this.form_email)
    formData.append('description', this.form_description)
    formData.append('result', this.form_resolve)
    formData.append('unit', this.form_unit)
    formData.append('user_id', this.user_id)
    this.addSupportCalledService.addSupportCallReport(formData);
    this.form_name = '';
    this.form_email = '';
    this.form_phone = "";
    this.form_description = "";
    this.form_resolve = "1";
    this.form_unit = "";
  }

  download(id_file:any, name_file:any) {
    this.httpClient.get(this.config.endpoint3 + 'PreRegisterMeetingServices/getMeetingFileById?key=' + this.config.key + '&id=' + id_file)
      .subscribe((resp2 :any)=> {
        const linkSource = `data:application/pdf;base64,${resp2['content']['file_content']}`;
        const downloadLink = document.createElement("a");
        const fileName = name_file;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      });
  }

  reset() {
    this.listadoUnidad = [];
    this.show_components = 0;
    this.nameRegister = '';
    this.name = '';
    this.userEmail = '';
    this.form_email = '';
    this.int2 = 'value';
    this.id_unit_add = 'value';
    this.moroso = '';
    this.form_unit = '';
    this.form_name = '';
    this.form_email = '';
    this.form_phone = "";
    this.form_description = "";
    this.form_resolve = "1";
    this.form_unit = "";
  }

  goCustomerControl() {
    this.router.navigate(['home/SoporteTelefonico/' + this.residential_id + '/usuarios/' + this.residential_id + '/' + this.meeting_id])
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 100);
  }

  goQuorum() {
    this.router.navigate(['home/SoporteTelefonico/' + this.residential_id + '/quorum/' + this.residential_id + '/' + this.meeting_id + '/0'])
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 100);
  }

  goVotes() {
    this.router.navigate(['home/SoporteTelefonico/' + this.residential_id + '/votaciones/' + this.residential_id + '/' + this.meeting_id])
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 100);
  }

  goReturn() {
    this.router.navigate(['home/SoporteTelefonico/' + this.residential_id])
  }

  scrollBottom() {
    var element = document.getElementById("style-1")!;
    element.scrollTop = element.scrollHeight;
  }

  scrollTop() {
    var element = document.getElementById("style-1")!;
    element.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  stopScroll() {
    this.scrollAuto = 0;
  }

  refreshAuto() {
    this.scrollAuto = 1;
    this.scrollBottom();
  }

  transformTimeZone(dateToTransform:any) {
    var date = new Date();
    var offset = date.getTimezoneOffset();
    var dateGot = dateToTransform.trim();
    if (dateGot.length > 0) {
      var day = moment(dateGot);
      var updateTime = offset * -1;
      var dateLocalized = day.add(updateTime, 'minutes');
      // var dateFormatted = dateLocalized.format('L');
      var timeFormatted = dateLocalized.format('LT');
      return timeFormatted;
    }
  }

}