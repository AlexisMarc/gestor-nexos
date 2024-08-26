import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { CreateAnswerService } from '../../service/create-answer.service';
import * as jsPDF from 'jspdf';
import swal from 'sweetalert2';
import $ from "jquery";
import { Chats } from '../../interface/chats.model';
declare var moment:any;

@Component({
  selector: 'app-list-vote-by-residential',
  templateUrl: './list-vote-by-residential.component.html',
  styleUrls: ['./list-vote-by-residential.component.scss']
})
export class ListVoteByResidentialComponent implements OnInit {

  Votes: [] = [];
  user_id: string;
  residential_id: string;
  meeting_id: any;
  id_vote_active!: string;
  absent_save!: string;
  not_voted_save!: string;
  options_save!: string;
  request_accepted!: string;
  unit_to_chart!: string;
  mode_chart!: string;
  keysession: string;
  with_cutomer_name = 'false';
  chats: Chats[] = [];
  residential_name!: string;
  cant_votes!: number;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService,
    private route: ActivatedRoute,
    private createAnswerService: CreateAnswerService) {
    const userStorage = this.storage.get('user');
    this.user_id = userStorage['content']['id'];
    this.residential_id = this.route.snapshot.paramMap.get('idResidential')!;
    this.meeting_id = this.route.snapshot.paramMap.get('idMeeting');
    this.keysession = userStorage['content']['token'];
  }

  ngOnInit() {
    this.httpClient.get(this.config.endpoint3 + 'UtilServices/getVotesByMeeting?key=' + this.config.key + '&meeting_id=' + this.meeting_id + '&user_id=' + this.user_id)
      .subscribe((resp:any)=> {
        this.Votes = resp['content'];
        this.cant_votes = resp['content'].length;
      });
  }
  goBack() {
    this.router.navigate(['home/interventioncontrol/' + this.residential_id + '/votaciones/' + this.residential_id + '/' + this.meeting_id]);
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 100);
  }

  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }

  goSearchVituralVotes() {
    this.router.navigate(['home/buscarConjunto']);
  }

  goCreateVotation() {
    this.router.navigate(['home/interventioncontrol/' + this.residential_id + '/crearVotacion/' + this.residential_id + '/' + this.meeting_id]);
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 100);
  }

  goEditVotation(voting_id:any) {
    this.router.navigate(['home/interventioncontrol/' + this.residential_id + '/editaVotacion/' + this.residential_id + '/' + voting_id + '/' + this.meeting_id]);
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 100);
  }

  goUsersInRoom(voting_id:any) {
    this.router.navigate(['home/interventioncontrol/' + this.residential_id + '/usuariosVotantesEnSala/' + this.residential_id + '/' + this.meeting_id + '/' + voting_id]);
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 300);
  }

  goPendientes(voting_id:any) {
    this.router.navigate(['home/interventioncontrol/' + this.residential_id + '/pendientes/' + this.residential_id + '/' + this.meeting_id + '/' + voting_id]);
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 300);
  }

  Inform(voting_id:any, name:any) {
    this.httpClient.get(this.config.endpoint6 + 'api/voting/getVotingReportByHeaderExcel/' + this.keysession + '/' + voting_id + '/' + this.with_cutomer_name)
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

  reload() {
    this.httpClient.get(this.config.endpoint3 + 'UtilServices/getVotesByMeeting?key=' + this.config.key + '&meeting_id=' + this.meeting_id + '&user_id=' + this.user_id)
      .subscribe((resp:any)=> {
        this.Votes = resp['content'];
        this.cant_votes = resp['content'].length;
      });
  }

  statusVote(id_vote:any, name:any, request_accepte:any, status:any) {
    var text = "";
    var textheader = "";
    if (status == "1") {
      text = "Si, abrir";
      textheader = 'Seguro desea abrir la votacion?';
      this.httpClient.get(this.config.endpoint3 + 'VotingServices/getActiveVoteOptionByMeeting?key=' + this.config.key + '&meeting_id=' + this.meeting_id)
        .subscribe((resp:any)=> {
          if (resp['success'] == true) {
            swal.fire({
              title: 'Hay otra votacion activa desea desactivar esa y activar la seleccionada?',
              showCancelButton: true,
              confirmButtonColor: '#FF7300',
              cancelButtonColor: '#262626',
              confirmButtonText: 'Si'
            }).then((result) => {
              if (result['value'] == true) {
                const formData2 = new FormData();
                formData2.append('residential_id', this.residential_id);
                formData2.append('name', resp['content']['name']);
                formData2.append('id', resp['content']['id']);
                formData2.append('request_accepted', resp['content']['request_accepted']);
                formData2.append('status_id', "0");
                this.createAnswerService.editAnswer(formData2, this.residential_id, "0", "0", this.meeting_id, this.keysession);
                const formData = new FormData();
                formData.append('residential_id', this.residential_id);
                formData.append('name', name);
                formData.append('id', id_vote);
                formData.append('request_accepted', this.request_accepted);
                formData.append('status_id', status);
                this.createAnswerService.editAnswer(formData, this.residential_id, status, "1", this.meeting_id, this.keysession);
                setTimeout(function () {
                  (<HTMLInputElement>document.getElementById('reload')).click();
                }, 500);
              }
            })
          } else {
            swal.fire({
              title: textheader,
              showCancelButton: true,
              confirmButtonColor: '#FF7300',
              cancelButtonColor: '#262626',
              confirmButtonText: text
            }).then((result) => {
              if (result['value'] == true) {
                const formData = new FormData();
                formData.append('residential_id', this.residential_id);
                formData.append('name', name);
                formData.append('id', id_vote);
                formData.append('request_accepted', this.request_accepted);
                formData.append('status_id', status);
                this.createAnswerService.editAnswer(formData, this.residential_id, status, "1", this.meeting_id, this.keysession);
                setTimeout(function () {
                  (<HTMLInputElement>document.getElementById('reload')).click();
                }, 3000);
              }
            })

          }
        });
    }
    else {
      this.httpClient.get(this.config.endpoint3 + 'VotingServices/getVotingOptionResults?key=' + this.config.key + '&user_id=' + this.user_id + '&header_id=' + id_vote)
        .subscribe((resp:any)=> {
          this.unit_to_chart = resp['content']['vote']['unit_to_chart'];
          this.mode_chart = resp['content']['vote']['mode_chart'];
          this.absent_save = JSON.stringify(resp['content']['absent']);
          this.options_save = JSON.stringify(resp['content']['vote']['options']);
          this.not_voted_save = JSON.stringify(resp['content']['not_voted']);
          const formData = new FormData();
          formData.append('residential_id', this.residential_id);
          formData.append('name', name);
          formData.append('id', id_vote);
          formData.append('request_accepted', this.request_accepted);
          formData.append('status_id', status);
          this.createAnswerService.editAnswer(formData, this.residential_id, status, "1", this.meeting_id, this.keysession);
          const formData2 = new FormData();
          formData2.append('key', this.config.key);
          formData2.append('absent', this.absent_save)
          formData2.append('not_voted', this.not_voted_save)
          formData2.append('options', this.options_save);
          formData2.append('name', name);
          formData2.append('mode_chart', this.mode_chart);
          formData2.append('unit_to_chart', this.unit_to_chart);
          formData2.append('voting_header_id', id_vote);
          formData2.append('user_id', this.user_id);
          formData2.append('id', '0');
          setTimeout(function () {
            (<HTMLInputElement>document.getElementById('reload')).click();
          }, 500);
        });
    }
  }

  deleteQuetion(vote_id:any) {
    swal.fire({
      title: 'Esta seguro de borrar esta votacion?',
      showCancelButton: true,
      confirmButtonColor: '#FF7300',
      cancelButtonColor: '#262626',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result['value'] == true) {
        const formData2 = new FormData();
        formData2.append('key', this.config.key);
        formData2.append('user_id', this.user_id)
        formData2.append('voting_header_id', vote_id)
        this.httpClient.post(this.config.endpoint + 'ApiVoting/deleteVotingQuestion', formData2).subscribe((resp3) => {
        });
      }
    })
  }

  InformAttendance() {
    
    this.httpClient.get(this.config.endpoint6 + 'api/reports/getUnitsByMeetingForWeb/' + this.keysession + '/' + this.meeting_id)
      .subscribe((resp:any)=> {
        var base64decode = decodeURIComponent(atob(resp['content']).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        var blob = new Blob([base64decode], { type: 'application/vnd.ms-excel' });
        var objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl);
      });
  }

  InformAttendanceRealTime() {
    this.httpClient.get(this.config.endpoint6 + 'api/reports/getSessionConfirmation/' + this.keysession + '/' + this.meeting_id)
      .subscribe((resp:any)=> {
        var base64decode = decodeURIComponent(atob(resp['content']).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        var blob = new Blob([base64decode], { type: 'application/vnd.ms-excel' });
        var objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl);
      });
  }

  InformChat() {
    var unitsText = '';
    var htmlElement;
    var nameResidential = "";
    this.httpClient.get(this.config.endpoint6 + 'api/meetings/getMeetingDetails/' + this.keysession + '/' + this.meeting_id)
      .subscribe((response :any)=> {
        this.residential_name = response['content']['residential'];
        nameResidential = response['content']['residential'];
      });
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
              // unitsText += '<div>' +
              //   '<strong style="color: red">' + resp2['content']['messages'][index]['sector_name'] + resp2['content']['messages'][index]['sector_number'] + resp2['content']['messages'][index]['name'] + resp2['content']['messages'][index]['number'] + '</strong>' +
              //   'Soporte técnico' +
              //   '<p>' + resp2['content']['messages'][index]['message'] + '<br>' + resp2['content']['messages'][index]['created_at'] + '</p>' +
              //   '<p *ngIf="(i+1)%12==0">__________________________________________________________________________________pag {{(i+1)/12}}</p>' +
              //   '<div style="page-break-before: always; break-after: page"></div>'+
              //   '<h5 class="page" *ngIf="(i+1)%12==0">Conjunto</h5>' +
              //   '<br>' +
              //   '</div>';
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





        setTimeout(() => {
          // htmlElement = '<div id="content" #content class="chat">' +
          //   '<strong><h5>Conjunto</h5></strong>' +
          //   unitsText +
          //   '</div>';
          //@ts-ignore
          var pdf = new jsPDF('p', 'pt', 'letter');
          var source = $('#content')[0];
          // var source = htmlElement;
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
              pdf.save('CHAT ' + nameResidential + '.pdf');
            }, margins
          );
        }, 3000);
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