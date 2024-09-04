import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { DataOptionsvote } from '../../interface/dataOptionsVote.model';
import { DataOptionVote } from '../../interface/dataOptionVote.model';
import { DataProfileVoter } from '../../interface/dataProfileVoter.model';
import { DataProfileVoterSend } from '../../interface/dataProfileVoterSend.model';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { CreateAnswerService } from '../../service/create-answer.service';
declare var swal: any;

@Component({
  selector: 'app-edit-vote',
  templateUrl: './edit-vote.component.html',
  styleUrls: ['./edit-vote.component.scss']
})
export class EditVoteComponent implements OnInit {

  residential_id: string;
  nameVote_edit = '';
  options_edit: DataOptionsvote[] = [];
  voter_profiles_edit: DataProfileVoter[] = [];
  id_edit = 0;
  user_id: string;
  allProfilesVotation_edit: DataProfileVoter[] = [];
  ProfileSelected_edit = "0";
  nameOption_edit!: string;
  ProfilesToSend_edit: DataProfileVoterSend[] = [];
  request_accepted_edit = 1;
  vote_id_edit: string;
  mode_chart_edit = '1';
  unit_chart_edit = '1';
  ausentes_edit = false;
  pendientes_edit = true;
  status_id_edit!: string;
  meeting_id_edit: string;
  keysession_edit: string;
  totalProfiles_edit = 0;
  nameOptionDefault_edit = '';
  selectAllProfiles_edit = false;

  constructor(private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
     
     
    private createAnswerService: CreateAnswerService) {

    this.residential_id = this.route.snapshot.paramMap.get('idResidential')!;
    this.meeting_id_edit = this.route.snapshot.paramMap.get('idMeeting')!;
    this.vote_id_edit = this.route.snapshot.paramMap.get('idVote')!;
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    this.user_id = userStorage['id'];
    this.keysession_edit = userStorage['token']
    var profileVoterForAddList_edit: DataProfileVoter;

    this.httpClient.get(this.config.endpoint + 'ApiVoting/getAllVoterProfiles?key=' + this.config.key + '&user_id=' + this.user_id)
      .subscribe((resp:any)=> {
        this.totalProfiles_edit = resp['content'].length;
        for (let index = 0; index < resp['content'].length; index++) {
          if (resp['content'][index]['id'] == 1) {
            profileVoterForAddList_edit = new DataProfileVoter(resp['content'][index]['id'], resp['content'][index]['name'], true);
          } else {
            profileVoterForAddList_edit = new DataProfileVoter(resp['content'][index]['id'], resp['content'][index]['name'], false);
          }
          this.allProfilesVotation_edit.push(profileVoterForAddList_edit);
        }
        var profileDefault = new DataProfileVoterSend('1')
        this.ProfilesToSend_edit.push(profileDefault);
      });

    this.httpClient.get(this.config.endpoint + 'ApiVoting/getVoteOptionById?key=' + this.config.key + '&id=' + this.vote_id_edit + '&user_id=' + this.user_id)
      .subscribe((resp:any)=> {
        if (resp['content']['mode_chart'] == '1') {
          this.pendientes_edit = true;
          this.ausentes_edit = true;
        }
        if (resp['content']['mode_chart'] == '2') {
          this.pendientes_edit = true;
          this.ausentes_edit = false;
        }
        if (resp['content']['mode_chart'] == '3') {
          this.pendientes_edit = false;
          this.ausentes_edit = true;
        }
        if (resp['content']['mode_chart'] == '4') {
          this.pendientes_edit = false;
          this.ausentes_edit = false;
        }
        this.unit_chart_edit = resp['content']['unit_to_chart'];
        this.nameVote_edit = resp['content']['name'];
        this.request_accepted_edit = resp['content']['request_accepted'];
        this.status_id_edit = resp['content']['status_id'];
        for (let index = 0; index < resp['content']['options'].length; index++) {
          const OptionAdd = new DataOptionVote(resp['content']['options'][index]['id'], resp['content']['options'][index]['name']);
          this.options_edit.push(OptionAdd);
        }
      });
  }

  ngOnInit() {
  }

  resetProfilesToQuestion() {
    this.voter_profiles_edit = [];
  }

  selectedProfilesToQuestion_edit() {
    var profileDefault;
    if (this.selectAllProfiles_edit) {
      this.ProfilesToSend_edit = [];
      for (let index = 0; index < this.allProfilesVotation_edit.length; index++) {
        this.allProfilesVotation_edit[index]['selected'] = true;
        profileDefault = new DataProfileVoterSend(this.allProfilesVotation_edit[index]['id'])
        this.ProfilesToSend_edit.push(profileDefault);
      }
    } else {
      this.ProfilesToSend_edit = [];
      for (let index = 0; index < this.allProfilesVotation_edit.length; index++) {
        this.allProfilesVotation_edit[index]['selected'] = false;
      }
    }
  }

  changeProfileById_edit(profile_id:any, selected:any) {
    if (selected) {
      var profileDefault = new DataProfileVoterSend(profile_id)
      this.ProfilesToSend_edit.push(profileDefault);
    } else {
      for (let index = 0; index < this.ProfilesToSend_edit.length; index++) {
        if (this.ProfilesToSend_edit[index]['id'] == profile_id) {
          this.ProfilesToSend_edit.splice(index, 1);
        }
      }
    }
    if (this.totalProfiles_edit == this.ProfilesToSend_edit.length) {
      this.selectAllProfiles_edit = true;
    } else {
      this.selectAllProfiles_edit = false;
    }
  }

  goBack() {
    this.router.navigate(['home/interventioncontrol/' + this.residential_id + '/listaVotaciones/' + this.residential_id + '/' + this.meeting_id_edit]);
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 100);
  }

  goListVotes() {
    this.router.navigate(['home/interventioncontrol/' + this.residential_id + '/listaVotaciones/' + this.residential_id]);
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 100);
  }

  editVote_edit() {
    if (this.pendientes_edit == false && this.ausentes_edit == true) {
      swal.fire(
        'Alerta',
        'Esta configuración de gráfico (Sin pendientes y con ausentes) no es valida.',
        'warning'
      );
    } else {
      if (this.pendientes_edit == true && this.ausentes_edit == true) {
        this.mode_chart_edit = '1';
      }
      if (this.pendientes_edit == true && this.ausentes_edit == false) {
        this.mode_chart_edit = '2';
      }
      if (this.pendientes_edit == false && this.ausentes_edit == false) {
        this.mode_chart_edit = '4';
      }
      const options = JSON.stringify(this.options_edit);
      const voteProfiles = JSON.stringify(this.ProfilesToSend_edit);
      const formData = new FormData();
      formData.append('residential_id', this.residential_id);
      formData.append('name', this.nameVote_edit);
      formData.append('options', options);
      formData.append('voter_profiles', voteProfiles);
      formData.append('id', this.vote_id_edit);
      // formData.append('user_id', this.user_id);
      formData.append('request_accepted', this.request_accepted_edit + '');
      formData.append('status_id', this.status_id_edit);
      formData.append('mode_chart', this.mode_chart_edit);
      formData.append('unit_to_chart', this.unit_chart_edit);
      this.createAnswerService.createAnswer(formData, this.residential_id, this.status_id_edit, this.meeting_id_edit, this.keysession_edit);
    }
  }

  addOptionVote_edit() {
    if (this.nameOption_edit == "") {
      swal.fire(
        'Alerta',
        'La opcion no puede ir vacia',
        'warning'
      )
    } else {
      const OptionAdd = new DataOptionVote("0", this.nameOption_edit);
      this.options_edit.push(OptionAdd);
      this.nameOption_edit = "";
    }
  }

  resetAnswers() {
    this.options_edit = [];
  }

}