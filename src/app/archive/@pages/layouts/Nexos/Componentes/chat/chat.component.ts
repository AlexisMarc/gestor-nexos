import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import * as jsPDF from 'jspdf';
 
import Swal from 'sweetalert2';
import { Chats } from '../../interface/chats.model';
declare var moment: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('content', { static: false }) content!: ElementRef;

  residential_id: any;
  meeting_id: any;
  chat: any[] = [];
  chats: any[] = [];
  user_id!: string;
  residential: any;
  keysession!: string;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
     
     ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor' || userStorage['profile'] === 'Moderador') {
    } else {
      Swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.user_id = userStorage['id'];
    this.residential_id = this.route.snapshot.paramMap.get('id');
    this.keysession = userStorage['token'];
    this.httpClient.get(this.config.endpoint3 + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this.config.key + '&residential_id=' + this.residential_id)
      .subscribe((resp:any)=> {
        this.meeting_id = resp['content']['id'];
        this.residential = resp['content']['residential'];
        this.httpClient.get(this.config.endpoint6 + 'api/chat/getMessagesFromMeeting/' + this.keysession + '/' + this.meeting_id + '/0')
          .subscribe((resp2 :any)=> {
            if (resp2['success']) {
              for (let index = 0; index < resp2['content']['messages'].length; index++) {
                if (resp2['content']['messages'][index]['user_id']) {
                  const chats = new Chats(
                    resp2['content']['messages'][index]['id'],
                    resp2['content']['messages'][index]['message'],
                    this.transformTimeZone(resp2['content']['messages'][index]['created_at']),
                    resp2['content']['messages'][index]['name'],
                    resp2['content']['messages'][index]['number'],
                    resp2['content']['messages'][index]['building_id'],
                    resp2['content']['messages'][index]['sector_name'],
                    'Soporte técnico',
                    resp2['content']['messages'][index]['sector_number']);
                  this.chats.push(chats);
                }
                else {
                  const chats = new Chats(
                    resp2['content']['messages'][index]['id'],
                    resp2['content']['messages'][index]['message'],
                    this.transformTimeZone(resp2['content']['messages'][index]['created_at']),
                    resp2['content']['messages'][index]['name'],
                    resp2['content']['messages'][index]['number'],
                    resp2['content']['messages'][index]['building_id'],
                    resp2['content']['messages'][index]['sector_name'],
                    resp2['content']['messages'][index]['nameRegister'],
                    resp2['content']['messages'][index]['sector_number']);
                  this.chats.push(chats);
                }
              }
            }
          });
      });
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['home/']);
  }

  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }

  goPointContrpl(residential_id:any) {
    this.router.navigate(['home/pointControlMeeting/' + residential_id]);
  }

  goSearchPointContrpl() {
    this.router.navigate(['home/pointControl']);
  }

  goBack() {
    this.router.navigate(['home/pointControlMeeting/' + this.residential_id]);
  }

  downloadPdf(name:any) {
    //@ts-ignore
    var pdf = new jsPDF('p', 'pt', 'letter');
    var source = $('#content')[0];
    var specialElementHandlers = {
      '#bypassme': function (element:any, renderer:any) {
        return true
      }
    };
    var margins = {
      top: 30,
      bottom: 1,
      left: 40,
      width: 522
    };
    pdf.fromHTML(
      source,
      margins.left,
      margins.top, {
      'width': margins.width,
      'elementHandlers': specialElementHandlers
    },
      function () {
        pdf.save('Chat ' + name + '.pdf');
      }, margins
    );
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