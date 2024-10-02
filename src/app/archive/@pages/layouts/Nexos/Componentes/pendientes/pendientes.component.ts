import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { DataVoterList } from '../../interface/dataVoterList.model';
import { ConfigurationRestService } from '../../service/configuration.rest.service';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {

  meeting_id: string;
  residential_id: string;
  user_id: string;
  voting_header_id: string;
  list_units: any[] = [];
  list_units_show: any[] = [];
  list_votes: any[] = [];
  total = 0;
  interval11: any;
  keysession: string;
  voting_header_id_select: any;
  optionsByVote: any;
  nameVote!: string;
  attendancePercent = 0;
  voterPercent = 0;
  voterByOption = 0;
  voting_option_name = '';
  optionSelected = 'all';
  status_vote: any;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
     
     
  ) {
    this.meeting_id = this.route.snapshot.paramMap.get('idMeeting')!;
    this.residential_id = this.route.snapshot.paramMap.get('idResidential')!;
    this.voting_header_id = this.route.snapshot.paramMap.get('idVote')!;
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    this.user_id = userStorage['id'];
    this.keysession = userStorage['token']
  }

  ngOnInit() {
    this.getVoteWithOptions();
  }

  ngOnDestroy() {
    clearInterval(this.interval11);
  }

  goBack() {
    this.router.navigate(['/home/interventioncontrol/' + this.residential_id + '/' + 'listaVotaciones/' + this.residential_id + '/' + this.meeting_id]);
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 100);
  }

  getVoteWithOptions() {
    this.httpClient.get(this.config.endpoint + 'ApiVoting/getVoteOptionById?key=' + this.config.key + '&id=' + this.voting_header_id + '&user_id=' + this.user_id)
      .subscribe((resp:any)=> {
        this.nameVote = resp['content']['name'];
        this.optionsByVote = resp['content']['options'];
        this.status_vote = resp['content']['status_id'];
        this.getVotersByVote(this.status_vote);
      });
  }

  getVotersByVote(status:any) {
    this.list_units = [];
    this.list_units_show = [];
    if (status == 1) {
      this.httpClient.get(this.config.endpoint6 + 'api/voting/getVotingReportByHeader/' + this.keysession + '/' + this.voting_header_id)
        .subscribe((resp:any)=> {
          resp['content'].forEach((voter:any) => {
            voter['coefficient'] = voter['coefficient'].replace(',', '.');
            if (voter['option_name']) {
              var voterAdd = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], voter['option_name'], voter['present'], voter['unit_details'])
              this.list_units.push(voterAdd);
              this.list_units_show.push(voterAdd);
              if (voter['option_name'] != '') {
                this.voterPercent = this.voterPercent + (voter['coefficient'] * 1);
              }
            } else {
              var voterAdd = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], '', voter['present'], voter['unit_details'])
              this.list_units.push(voterAdd);
              this.list_units_show.push(voterAdd);
            }
            if (voter['present'] == 'Sí') {
              this.attendancePercent = this.attendancePercent + (voter['coefficient'] * 1);
            }
          });
        });
      // this.interval11 = setInterval(() => {
      //   this.refreshData();
      // }, 5000)
    } else {
      this.httpClient.get(this.config.endpoint6 + 'api/voting/getCurrentVotingReportByHeader/' + this.keysession + '/' + this.voting_header_id)
        .subscribe((resp:any)=> {
          resp['content'].forEach((voter:any) => {
            voter['Coeficiente'] = voter['Coeficiente'].replace(',', '.');
            if (voter['Opcion']) {
              var voterAdd = new DataVoterList(voter['Aporte'], voter['Coeficiente'], voter['Nombre'], voter['Opcion'], voter['Asistencia'], voter['Unidad'])
              this.list_units.push(voterAdd);
              this.list_units_show.push(voterAdd);
              if (voter['Opcion'] != '') {
                this.voterPercent = this.voterPercent + (voter['Coeficiente'] * 1);
              }
            } else {
              var voterAdd = new DataVoterList(voter['Aporte'], voter['Coeficiente'], voter['Nombre'], '', voter['Asistencia'], voter['Unidad'])
              this.list_units.push(voterAdd);
              this.list_units_show.push(voterAdd);
            }
            if (voter['Asistencia'] == 'Sí') {
              this.attendancePercent = this.attendancePercent + (voter['Coeficiente'] * 1);
            }
          });
        });
    }
  }

  selectVote(voting_header_id:any) {
    this.voting_header_id_select = voting_header_id;
  }

  showVoterByOption(option_name: string) {
    this.refreshData()
    this.optionSelected = option_name;
    this.voterByOption = 0;
    this.voting_option_name = ' por ' + option_name + ':';
    this.list_units_show = [];
    this.list_units.forEach(voter => {
      if (voter['option_name'] == option_name) {
        var voterAdd = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], voter['option_name'], voter['present'], voter['unit_details'])
        this.list_units_show.push(voterAdd);
        this.voterByOption = this.voterByOption + (voter['coefficient'] * 1);
      }
    });
  }

  showNotVote() {
    this.refreshData()
    this.optionSelected = 'not_voted';
    this.voting_option_name = '';
    this.list_units_show = [];
    this.list_units.forEach(voter => {
      if (voter['present'] == 'Si' && voter['option_name'] == '') {
        var voterAdd = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], voter['option_name'], voter['present'], voter['unit_details'])
        this.list_units_show.push(voterAdd);
      }
    });
  }

  showAbsent() {
    this.refreshData()
    this.optionSelected = 'absent';
    this.voting_option_name = '';
    this.list_units_show = [];
    this.list_units.forEach(voter => {
      if (voter['present'] == 'No') {
        var voterAdd = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], voter['option_name'], voter['present'], voter['unit_details'])
        this.list_units_show.push(voterAdd);
      }
    });
  }

  showAll() {
    this.refreshData()
    this.list_units_show = [];
    this.optionSelected = 'all';
    this.voting_option_name = '';
    this.list_units.forEach(voter => {
      var voterAdd = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], voter['option_name'], voter['present'], voter['unit_details'])
      this.list_units_show.push(voterAdd);
    });
  }

  showVoters() {
    this.refreshData()
    this.optionSelected = 'voters';
    this.voterByOption = 0;
    this.list_units_show = [];
    this.voting_option_name = ':';
    this.list_units.forEach(voter => {
      if (voter['option_name'] != '') {
        var voterAdd = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], voter['option_name'], voter['present'], voter['unit_details'])
        this.list_units_show.push(voterAdd);
        this.voterByOption = this.voterByOption + (voter['coefficient'] * 1);
      }
    });
  }

  refreshData() {
    this.list_units = [];
    this.list_units_show = [];
    this.attendancePercent = 0;
    this.voterPercent = 0;
    this.voterByOption = 0;
    this.httpClient.get(this.config.endpoint6 + 'api/voting/getVotingReportByHeader/' + this.keysession + '/' + this.voting_header_id)
      .subscribe((resp:any)=> {
        resp['content'].forEach((voter:any) => {
          voter['coefficient'] = voter['coefficient'].replace(',', '.');
          if (voter['option_name']) {
            var voterAdd2 = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], voter['option_name'], voter['present'], voter['unit_details'])
            this.list_units.push(voterAdd2);
            if (this.optionSelected == 'all') {
              var voterAdd = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], voter['option_name'], voter['present'], voter['unit_details'])
              this.list_units_show.push(voterAdd);
            }
            if (this.optionSelected == 'absent') {
              if (voter['present'] == 'No') {
                var voterAdd = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], voter['option_name'], voter['present'], voter['unit_details'])
                this.list_units_show.push(voterAdd);
              }
            }
            if (this.optionSelected == 'voters') {
              if (voter['option_name'] != '') {
                var voterAdd = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], voter['option_name'], voter['present'], voter['unit_details'])
                this.list_units_show.push(voterAdd);
                this.voterByOption = this.voterByOption + (voter['coefficient'] * 1);
              }
            }
            if (this.optionSelected != 'all' && this.optionSelected != 'not_voted' && this.optionSelected != 'absent' && this.optionSelected != 'voters') {
              if (voter['option_name'] == this.optionSelected) {
                var voterAdd = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], voter['option_name'], voter['present'], voter['unit_details'])
                this.list_units_show.push(voterAdd);
                this.voterByOption = this.voterByOption + (voter['coefficient'] * 1);
              }
            }
            if (voter['option_name'] != '') {
              this.voterPercent = this.voterPercent + (voter['coefficient'] * 1);
            }
          } else {
            var voterAdd3 = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], '', voter['present'], voter['unit_details'])
            this.list_units.push(voterAdd3);
            if (this.optionSelected == 'all') {
              var voterAdd = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], '', voter['present'], voter['unit_details'])
              this.list_units_show.push(voterAdd);
            }
            if (this.optionSelected == 'not_voted') {
              if (voter['present'] == 'Sí' && (voter['option_name'] == '' || !voter['option_name'])) {
                var voterAdd = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], '', voter['present'], voter['unit_details'])
                this.list_units_show.push(voterAdd);
              }
            }
            if (this.optionSelected == 'absent') {
              if (voter['present'] == 'No') {
                var voterAdd = new DataVoterList(voter['aporte'], voter['coefficient'], voter['nameRegister'], '', voter['present'], voter['unit_details'])
                this.list_units_show.push(voterAdd);
              }
            }
          }
          if (voter['present'] == 'Sí') {
            this.attendancePercent = this.attendancePercent + (voter['coefficient'] * 1);
          }
        });
      });
  }

}