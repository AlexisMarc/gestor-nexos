import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import swal from 'sweetalert2';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { SendMessageService } from '../../service/send-message.service';
import { SocketService } from '../../service/socket.service';
declare var moment: any;

@Component({
  selector: 'app-chat-control',
  templateUrl: './chat-control.component.html',
  styleUrls: ['./chat-control.component.scss']
})
export class ChatControlComponent implements OnInit {

  profileForm = new FormGroup({
    message: new FormControl(''),
  });
  message!: string;
  messages: any[] = [];
  meeting_id: string;
  user_id: any;
  is_mobil = false;
  scrollAuto = 1;
  keysession: string;
  newMessage: any;
  enable_chat = 1;

  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private sendMessage: SendMessageService,
    private route: ActivatedRoute,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService,
    private socketService: SocketService
  ) {
    this.meeting_id = this.route.snapshot.paramMap.get('idMeeting')!;
    const userStorage = this.storage.get('user');
    this.user_id = userStorage['content']['id'];
    this.keysession = userStorage['content']['token'];
    var isMobile = {
      mobilecheck: function () {
        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent || navigator.vendor) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor).substr(0, 4)))
      }
    }
    this.is_mobil = isMobile.mobilecheck();
  }

  ngOnInit() {
    this.httpClient.get(this.config.endpoint6 + 'api/chat/getMessagesFromMeeting/' + this.keysession + '/' + this.meeting_id + '/50')
      .subscribe((resp2 :any)=> {
        if (resp2['message'] == "La sesión es inválida") {
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
        this.enable_chat = resp2['content']['enable_chat'];
        this.messages = resp2['content']['messages'];
        if (this.scrollAuto == 1) {
          setTimeout(() => {
            this.scrollBottom();
          }, 500);
        }
        for (let index = 0; index < this.messages.length; index++) {
          this.messages[index]['created_at'] = this.transformTimeZone(this.messages[index]['created_at']);
        }
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
  }

  ngOnDestroy() {
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

  scrollBottom() {
    var element = document.getElementById("style-1")!;
    element.scrollTop = element.scrollHeight;
  }

  stopScroll() {
    this.scrollAuto = 0;
  }

  refreshAuto() {
    this.scrollAuto = 1;
    this.scrollBottom();
  }

  cahngeStatusChat(statusChat:any) {
    const formData2 = new FormData();
    formData2.append('key', this.config.key);
    formData2.append('id', this.meeting_id);
    formData2.append('enable_chat', statusChat);
    this.httpClient.post(this.config.endpoint3 + 'PreRegisterMeetingServices/updateMeetingDetails', formData2).subscribe((data:any) => {
      if (statusChat == '1') {
        this.enable_chat = 1;
      } else {
        this.enable_chat = 0;
      }
    });
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