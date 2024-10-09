import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import swal from 'sweetalert2';
import { CreateAnswerService } from '../../service/create-answer.service';
import { SocketService } from '../../service/socket.service';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-vote-result2',
  templateUrl: './vote-result2.component.html',
  styleUrls: ['./vote-result2.component.scss']
})
export class VoteResult2Component implements OnInit {
  private _env = inject(EnvServiceService)
  id_vote = 0;
  votes: [] = [];
  meeting_id!: string;
  user_id!: string;
  residential_id!: any;
  name_vote!: string;
  votes_show = [];
  votes_aporte = [];
  cantidad_votantes!: number;
  status_vote = 0;
  absent:any = [];
  not_voted:any;
  total_votes = 0;
  votes_options: [] = [];
  dato = 0;
  variable = 0;
  unidad = 0;
  asitentes!: number;
  total_aportes = 0;
  unit_to_chart!: string;
  mode_chart!: string;
  absent_save!: string;
  not_voted_save!: string;
  options_save!: string;
  request_accepted!: string;
  keysession!: string;

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router,
     
     
    private route: ActivatedRoute,
    private socketService: SocketService
  ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor' || userStorage['profile'] === 'Moderador' || userStorage['profile'] === 'Soporte telefonico') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home/pointControl']);
      return;
    }

    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.residential_id = this.route.snapshot.paramMap.get('idResidential');
    this.user_id = userStorage['id'];
    this.meeting_id = this.route.snapshot.paramMap.get('idMeeting')!;
    this.keysession = userStorage['token'];
    //Obtener listado de votaciones
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'UtilServices/getVotesByMeeting?key=' + this._env.SECRET_KEY + '&meeting_id=' + this.meeting_id + '&user_id=' + this.user_id)
      .subscribe((resp:any)=> {
        this.votes = resp['content'];
      });
    //Obeter votacion activa
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'VotingServices/getActiveVoteOptionByMeeting?key=' + this._env.SECRET_KEY + '&meeting_id=' + this.meeting_id)
      .subscribe((resp:any)=> {
        if (resp['success'] == false) {
          this.name_vote = "No hay votaciones activas"
        } else {
          this.id_vote = resp['content']['id'];
          this.dato = 1;

          this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/reports/getVotingOptionResults/' + this.keysession + '/' + this.id_vote)
            .subscribe((resp:any)=> {
              this.total_votes = 0;
              this.name_vote = resp['content']['vote']['name'];
              this.votes_options = resp['content']['vote']['options'];
              this.absent = resp['content']['absent'];
              this.not_voted = resp['content']['not_voted'];
              this.status_vote = resp['content']['vote']['status_id'];
              this.total_votes = this.total_votes + this.not_voted['total_aporte'];
              this.unit_to_chart = resp['content']['vote']['unit_to_chart'];
              this.mode_chart = resp['content']['vote']['mode_chart'];
              this.request_accepted = resp['content']['vote']['request_accepted'];
              this.absent_save = JSON.stringify(this.absent);
              this.options_save = JSON.stringify(this.votes_options);
              this.not_voted_save = JSON.stringify(this.not_voted);
              for (let index = 0; index < this.votes.length; index++) {
                const element = this.votes[index];
                this.total_votes = this.total_votes + this.votes[index]['total_aporte'];
              }
              if (this.status_vote == 1) {
                this.socketService.listen('vote_stored_' + this.meeting_id).subscribe((response:any) => {
                  this.total_votes = 0;
                  this.name_vote = response['vote']['name'];
                  this.votes_options = response['vote']['options'];
                  this.absent = response['absent'];
                  this.not_voted = response['not_voted'];
                  this.status_vote = response['vote']['status_id'];
                  this.total_votes = this.total_votes + this.not_voted['total_aporte'];
                  this.unit_to_chart = response['vote']['unit_to_chart'];
                  this.mode_chart = response['vote']['mode_chart'];
                  this.request_accepted = response['vote']['request_accepted'];
                  this.absent_save = JSON.stringify(this.absent);
                  this.options_save = JSON.stringify(this.votes_options);
                  this.not_voted_save = JSON.stringify(this.not_voted);
                  for (let index = 0; index < this.votes.length; index++) {
                    const element = this.votes[index];
                    this.total_votes = this.total_votes + this.votes[index]['total_aporte'];
                  }
                });
              }
            });
        }
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.socketService.removeListen('vote_stored_' + this.meeting_id)
  }

  goVote(id_vote:any) {
    this.router.navigate(['home/resultados2/' + id_vote])
  }

  selectedVote(id_vote:any, status:any) {
    this.id_vote = id_vote;
    this.dato = 1;
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/reports/getVotingOptionResults/' + this.keysession + '/' + this.id_vote)
      .subscribe((resp:any)=> {
        this.total_votes = 0;
        this.name_vote = resp['content']['vote']['name'];
        this.votes_options = resp['content']['vote']['options'];
        this.absent = resp['content']['absent'];
        this.not_voted = resp['content']['not_voted'];
        this.status_vote = resp['content']['vote']['status_id'];
        this.total_votes = this.total_votes + this.not_voted['total_aporte'];
        this.unit_to_chart = resp['content']['vote']['unit_to_chart'];
        this.mode_chart = resp['content']['vote']['mode_chart'];
        this.request_accepted = resp['content']['vote']['request_accepted'];
        this.absent_save = JSON.stringify(this.absent);
        this.options_save = JSON.stringify(this.votes_options);
        this.not_voted_save = JSON.stringify(this.not_voted);
        for (let index = 0; index < this.votes.length; index++) {
          const element = this.votes[index];
          this.total_votes = this.total_votes + this.votes[index]['total_aporte'];
        }
        if (this.status_vote == 1) {
          this.socketService.listen('vote_stored_' + this.meeting_id).subscribe((response:any) => {
            this.total_votes = 0;
            this.name_vote = response['vote']['name'];
            this.votes_options = response['vote']['options'];
            this.absent = response['absent'];
            this.not_voted = response['not_voted'];
            this.status_vote = response['vote']['status_id'];
            this.total_votes = this.total_votes + this.not_voted['total_aporte'];
            this.unit_to_chart = response['vote']['unit_to_chart'];
            this.mode_chart = response['vote']['mode_chart'];
            this.request_accepted = response['vote']['request_accepted'];
            this.absent_save = JSON.stringify(this.absent);
            this.options_save = JSON.stringify(this.votes_options);
            this.not_voted_save = JSON.stringify(this.not_voted);
            for (let index = 0; index < this.votes.length; index++) {
              const element = this.votes[index];
              this.total_votes = this.total_votes + this.votes[index]['total_aporte'];
            }
          });
        }
      });
  }

}