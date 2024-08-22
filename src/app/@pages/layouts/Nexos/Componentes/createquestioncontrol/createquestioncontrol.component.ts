import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import swal from 'sweetalert2';
import { DataProfileVoter } from '../../interface/dataProfileVoter.model';
import { DataOptionsvote } from '../../interface/dataOptionsVote.model';
import { DataProfileVoterSend } from '../../interface/dataProfileVoterSend.model';
import { CreateAnswerService } from '../../service/create-answer.service';
import { DataOptionVote } from '../../interface/dataOptionVote.model';
declare var bootstrap: any;

@Component({
  selector: 'app-createquestioncontrol',
  templateUrl: './createquestioncontrol.component.html',
  styleUrls: ['./createquestioncontrol.component.scss']
})
export class CreatequestioncontrolComponent implements OnInit {

  @Input() residential_id: string;
  @Input() meeting_id: string;

  nameVote = "";
  options: DataOptionsvote[] = [];
  id = 0;
  user_id: string;
  allProfilesVotation: DataProfileVoter[] = [];
  ProfileSelected = "0";
  @Input() nameOption = { name: '' };
  ProfilesToSend: DataProfileVoterSend[] = [];
  request_accepted = 1;
  nameOptionDefault = '';
  defaultOptions: any;
  mode_chart = '1';
  unit_chart = '1';
  ausentes = false;
  pendientes = true;
  keysession: string;
  selectAllProfiles = false;
  totalProfiles = 0;

  constructor(private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService,
    private createAnswerService: CreateAnswerService) {

    this.defaultOptions = [
      'APROBACIÓN DEL ORDEN DEL DÍA',
      'ELECCIÓN DEL PRESIDENTE Y SECRETARIO DE LA ASAMBLEA',
      'APROBACIÓN DEL REGLAMENTO DE LA ASAMBLEA',
      'APROBACIÓN DE LOS ESTADOS FINANCIEROS',
      'APROBACIÓN DEL PROYECTO DE PRESUPUESTO',
      'APROBACIÓN DEL CONSEJO DE ADMINISTRACIÓN',
      'APROBACIÓN DEL COMITÉ DE CONVIVENCIA'
    ];

    const userStorage = this.storage.get('user');
    this.user_id = userStorage['content']['id'];
    var profileVoterForAddList;
    this.httpClient.get(this.config.endpoint + 'ApiVoting/getAllVoterProfiles?key=' + this.config.key + '&user_id=' + this.user_id)
      .subscribe(resp => {
        this.totalProfiles = resp['content'].length;
        for (let index = 0; index < resp['content'].length; index++) {
          if (resp['content'][index]['id'] == 1) {
            profileVoterForAddList = new DataProfileVoter(resp['content'][index]['id'], resp['content'][index]['name'], true);
          } else {
            profileVoterForAddList = new DataProfileVoter(resp['content'][index]['id'], resp['content'][index]['name'], false);
          }
          this.allProfilesVotation.push(profileVoterForAddList);
        }
        var profileDefault = new DataProfileVoterSend('1')
        this.ProfilesToSend.push(profileDefault);
      });
    this.keysession = userStorage['content']['token']
  }

  ngOnInit() {
  }

  createVote() {
    if (this.request_accepted < 0 || this.request_accepted > this.options.length) {
      if (this.request_accepted < 0) {
        swal.fire(
          'Alerta',
          'La cantidad de votos a recibir no es válida',
          'warning'
        )
      } else {
        swal.fire(
          'Alerta',
          'La cantidad de votos a recibir supera la cantidad de respuestas',
          'warning'
        )
      }
    } else {
      if (this.options.length == 0) {
        swal.fire(
          'Alerta',
          'No puede crear una votacion sin opciones',
          'warning'
        )
      } else {
        if (this.ProfilesToSend.length == 0) {
          swal.fire(
            'Alerta',
            'No puede crear una votacion sin perfiles',
            'warning'
          )
        } else {
          if (this.nameVote == "") {
            swal.fire(
              'Alerta',
              'No puede crear una votacion sin nombre',
              'warning'
            )
          } else {
            if (this.nameVote.length > 300) {
              swal.fire(
                'Alerta',
                'La pregunta debe tener maximo 190 caracteres su pregunta tiene' + this.nameVote.length,
                'warning'
              )
            } else {
              if (this.pendientes == false && this.ausentes == true) {
                swal.fire(
                  'Alerta',
                  'Esta configuración de gráfico (Sin pendientes y con ausentes) no es valida.',
                  'warning'
                )
              } else {
                if (this.pendientes == true && this.ausentes == true) {
                  this.mode_chart = '1';
                }

                if (this.pendientes == true && this.ausentes == false) {
                  this.mode_chart = '2';
                }

                if (this.pendientes == false && this.ausentes == false) {
                  this.mode_chart = '4';
                }
                swal.fire({
                  title: '<strong>Desea activar de una vez la pregunta</strong>',
                  type: 'question',
                  html: '',
                  showCloseButton: true,
                  showCancelButton: true,
                  focusConfirm: true,
                  confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Si',
                  cancelButtonText:
                    '<i class="fa fa-thumbs-down"></i> No',
                }).then((result) => {
                  if (result.value) {
                    this.httpClient.get(this.config.endpoint3 + 'VotingServices/getActiveVoteOptionByMeeting?key=' + this.config.key + '&meeting_id=' + this.meeting_id)
                      .subscribe(resp => {
                        if (resp['success']) {
                          var formData2 = new FormData();
                          formData2.append('residential_id', this.residential_id);
                          formData2.append('name', resp['content']['name']);
                          formData2.append('id', resp['content']['id']);
                          formData2.append('request_accepted', resp['content']['request_accepted']);
                          formData2.append('status_id', "0");
                          this.httpClient.post(this.config.endpoint6 + 'api/voting/editVoteOption/' + this.keysession, formData2)
                            .subscribe(data => {
                              if (data['success']) {
                                const options = JSON.stringify(this.options);
                                const voteProfiles = JSON.stringify(this.ProfilesToSend);
                                const formData = new FormData();
                                formData.append('residential_id', this.residential_id);
                                formData.append('name', this.nameVote);
                                formData.append('options', options);
                                formData.append('voter_profiles', voteProfiles);
                                formData.append('id', "0");
                                formData.append('user_id', this.user_id);
                                formData.append('request_accepted', this.request_accepted + '');
                                formData.append('status_id', "1");
                                formData.append('mode_chart', this.mode_chart);
                                formData.append('unit_to_chart', this.unit_chart);
                                this.createAnswerService.createAnswer(formData, this.residential_id, 1, this.meeting_id, this.keysession);
                                document.getElementById('modal-vote-close').click();
                                this.resetDataToCreateVote();
                              } else {
                                swal.fire('Mensaje', 'No se pudo crear la pregunta, por favor intentelo nuevamente.', 'info')
                              }
                            });
                        } else {
                          // var formData2 = new FormData();
                          // formData2.append('residential_id', this.residential_id);
                          // formData2.append('name', resp['content']['name']);
                          // formData2.append('id', resp['content']['id']);
                          // formData2.append('request_accepted', resp['content']['request_accepted']);
                          // formData2.append('status_id', "0");
                          // this.httpClient.post(this.config.endpoint6 + 'ApiVoting/editVoteOption/' + this.keysession, formData2)
                          //   .subscribe(data => {
                          // if (data['success']) {
                          const options = JSON.stringify(this.options);
                          const voteProfiles = JSON.stringify(this.ProfilesToSend);
                          const formData = new FormData();
                          formData.append('residential_id', this.residential_id);
                          formData.append('name', this.nameVote);
                          formData.append('options', options);
                          formData.append('voter_profiles', voteProfiles);
                          formData.append('id', "0");
                          formData.append('user_id', this.user_id);
                          formData.append('request_accepted', this.request_accepted + '');
                          formData.append('status_id', "1");
                          formData.append('mode_chart', this.mode_chart);
                          formData.append('unit_to_chart', this.unit_chart);
                          this.createAnswerService.createAnswer(formData, this.residential_id, 1, this.meeting_id, this.keysession);
                          document.getElementById('modal-vote-close').click();
                          this.resetDataToCreateVote();
                          // } else {
                          //   swal.fire('Mensaje', 'No se pudo crear la pregunta, por favor intentelo nuevamente.', 'info')
                          // }
                          // });
                        }
                      });
                  } else {
                    const options = JSON.stringify(this.options);
                    const voteProfiles = JSON.stringify(this.ProfilesToSend);
                    const formData = new FormData();
                    formData.append('residential_id', this.residential_id);
                    formData.append('name', this.nameVote);
                    formData.append('options', options);
                    formData.append('voter_profiles', voteProfiles);
                    formData.append('id', "0");
                    formData.append('user_id', this.user_id);
                    formData.append('request_accepted', this.request_accepted + '');
                    formData.append('status_id', "0");
                    formData.append('mode_chart', this.mode_chart);
                    formData.append('unit_to_chart', this.unit_chart);
                    this.createAnswerService.createAnswer(formData, this.residential_id, 0, this.meeting_id, this.keysession);
                    document.getElementById('modal-vote-close').click();
                    this.resetDataToCreateVote();
                  }
                });
              }
            }

          }
        }
      }
    }
  }

  addOptionVote() {
    if (this.nameOption.name == "") {
      swal.fire(
        'Alerta',
        'La opcion no puede ir vacia',
        'warning'
      )
    } else {
      const OptionAdd = new DataOptionVote("0", this.nameOption.name);
      this.options.push(OptionAdd);
      this.nameOption.name = "";
    }
  }

  addDefaultAnswer() {
    this.options = [];
    this.ProfilesToSend = [];
    for (let index = 0; index < this.allProfilesVotation.length; index++) {
      if (this.allProfilesVotation[index]['id'] == '1') {
        this.allProfilesVotation[index]['selected'] = true;
      } else {
        this.allProfilesVotation[index]['selected'] = false;
      }
    }

    this.nameVote = this.nameOptionDefault;
    const OptionAdd = new DataOptionVote("0", "SI");
    this.options.push(OptionAdd);
    const OptionAdd2 = new DataOptionVote("0", "NO");
    this.options.push(OptionAdd2);
    var profileDefault = new DataProfileVoterSend('1')
    this.ProfilesToSend.push(profileDefault);
  }

  resetAnswers() {
    this.options = [];
  }

  selectedProfilesToQuestion() {
    var profileDefault;
    if (this.selectAllProfiles) {
      this.ProfilesToSend = [];
      for (let index = 0; index < this.allProfilesVotation.length; index++) {
        this.allProfilesVotation[index]['selected'] = true;
        profileDefault = new DataProfileVoterSend(this.allProfilesVotation[index]['id'])
        this.ProfilesToSend.push(profileDefault);
      }
    } else {
      this.ProfilesToSend = [];
      for (let index = 0; index < this.allProfilesVotation.length; index++) {
        this.allProfilesVotation[index]['selected'] = false;
      }
    }
  }

  changeProfileById(profile_id, selected) {
    if (selected) {
      var profileDefault = new DataProfileVoterSend(profile_id)
      this.ProfilesToSend.push(profileDefault);
    } else {
      for (let index = 0; index < this.ProfilesToSend.length; index++) {
        if (this.ProfilesToSend[index]['id'] == profile_id) {
          this.ProfilesToSend.splice(index, 1);
        }
      }
    }
    if (this.totalProfiles == this.ProfilesToSend.length) {
      this.selectAllProfiles = true;
    } else {
      this.selectAllProfiles = false;
    }
  }

  deleteOption(index) {
    this.options.splice(index, 1);
  }

  // defaultOptions2() {
  //   this.options = [];
  //   const OptionAdd = new DataOptionVote("0", "SI");
  //   this.options.push(OptionAdd);
  //   const OptionAdd2 = new DataOptionVote("0", "NO");
  //   this.options.push(OptionAdd2);
  // }

  resetDataToCreateVote() {
    this.nameOptionDefault = ''
    this.nameVote = ''
    this.options = [];
    this.ProfilesToSend = [];
    var profileDefault = new DataProfileVoterSend('1')
    this.ProfilesToSend.push(profileDefault);
    this.request_accepted = 1;
  }

}