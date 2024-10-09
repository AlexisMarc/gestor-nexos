import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import swal from 'sweetalert2';
import { CreateAnswerService } from '../../service/create-answer.service';
import { SocketService } from '../../service/socket.service';
import { WhatsappService } from '../../service/whatsaap_services';
import { DomToImage } from 'dom-to-image';
import { EnvServiceService } from '@env';

declare var require: any

@Component({
  selector: 'app-vote-result',
  templateUrl: './vote-result.component.html',
  styleUrls: ['./vote-result.component.scss']
})
export class VoteResultComponent implements OnInit {
  private _env = inject(EnvServiceService)
  private name_name = '';
  private vote_vote = 0;


  id_vote = 0;
  votes: [] = [];
  meeting_id!: string;
  user_id!: string;
  residential_id: any;
  name_vote = '';
  votes_show = [];
  votes_aporte = [];
  cantidad_votantes!: number;
  status_vote = 0;
  absent:any = [];
  not_voted:any = [];
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
  orderDesc = true;
  with_cutomer_name = 'false';
  
  bandera_whatsapp_icon = true;


  // unit_to_chart_show: any;

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router,
     
     
    private route: ActivatedRoute,
    private createAnswerService: CreateAnswerService,
    private socketService: SocketService,
    private createQuestion: CreateAnswerService,
    private _whatsappService : WhatsappService
  ) {
    
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    //Verifica si quien hace la petición es un Superusuario, Supervisor o Moderador.
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor' || userStorage['profile'] === 'Moderador' || userStorage['profile'] === 'Soporte telefonico') {
    } 
    else {
      
      swal.fire('Atención', 'Usted no está autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
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

    this.createQuestion.activeVote.subscribe((data:any) => {
      if (data == 1) {
        this.chargeVotes();
      } else {
        this.getListVotes();
      }
    });
  }

  ngOnInit() {
    this.chargeVotes();
  }

  chargeVotes() {
    //Obtener listado de votaciones
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'UtilServices/getVotesByMeeting?key=' + this._env.SECRET_KEY + '&meeting_id=' + this.meeting_id + '&user_id=' + this.user_id)
      .subscribe((resp:any)=> {
        this.votes = resp['content'];
      });

    //Obeter votacion activa
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'VotingServices/getActiveVoteOptionByMeeting?key=' + this._env.SECRET_KEY + '&meeting_id=' + this.meeting_id)
      .subscribe((response :any)=> {
        if (response['success'] == false) {
          this.name_vote = "En este momento no hay una votación activa"
        } else {
          this.id_vote = response['content']['id'];
          this.dato = 1;

          ///////////////////////////////////////////

          //Activa el socket para escuchar la votación.
          this.socketService.listen('vote_stored_' + this.meeting_id).subscribe((response:any) => {
            
            
            this.total_votes = 0;
            this.name_vote = response['vote']['name'];
            this.votes_options = response['vote']['options'];
            this.absent = response['absent'];
            this.not_voted = response['not_voted'];
            this.status_vote = response['vote']['status_id'];
            //@ts-ignore
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


          this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/reports/getVotingOptionResults/' + this.keysession + '/' + this.id_vote)
            .subscribe((resp:any)=> {
              this.total_votes = 0;
              this.name_vote = resp['content']['vote']['name'];
              this.votes_options = resp['content']['vote']['options'];
              this.absent = resp['content']['absent'];
              this.not_voted = resp['content']['not_voted'];
              this.status_vote = resp['content']['vote']['status_id'];
              //@ts-ignore
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
                this.socketService.listen('meeting_quorum_' + this.meeting_id).subscribe((response:any) => {
                  this.getResults();
                });
                // this.socketService.listen('vote_stored_' + this.meeting_id).subscribe((response:any) => {
                //   this.total_votes = 0;
                //   this.name_vote = response['vote']['name'];
                //   this.votes_options = response['vote']['options'];
                //   this.absent = response['absent'];
                //   this.not_voted = response['not_voted'];
                //   this.status_vote = response['vote']['status_id'];
                //   this.total_votes = this.total_votes + this.not_voted['total_aporte'];
                //   this.unit_to_chart = response['vote']['unit_to_chart'];
                //   this.mode_chart = response['vote']['mode_chart'];
                //   this.request_accepted = response['vote']['request_accepted'];
                //   this.absent_save = JSON.stringify(this.absent);
                //   this.options_save = JSON.stringify(this.votes_options);
                //   this.not_voted_save = JSON.stringify(this.not_voted);
                //   for (let index = 0; index < this.votes.length; index++) {
                //     const element = this.votes[index];
                //     this.total_votes = this.total_votes + this.votes[index]['total_aporte'];
                //   }
                // });
              }
            });
        }
      });
  }

  getListVotes() {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'UtilServices/getVotesByMeeting?key=' + this._env.SECRET_KEY + '&meeting_id=' + this.meeting_id + '&user_id=' + this.user_id)
      .subscribe((resp:any)=> {
        this.votes = resp['content'];
      });
    this.status_vote = 0;
  }

  goVote(id_vote:any) {
    this.router.navigate(['home/resultados2/' + id_vote])
  }

  ngOnDestroy() {
    this.socketService.removeListen('vote_stored_' + this.meeting_id)
  }

  selectedVote(id_vote:any, status:any) {
    this.orderDesc = true;
    this.id_vote = id_vote;
    this.vote_vote = id_vote;
    this.dato = 1;
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/reports/getVotingOptionResults/' + this.keysession + '/' + this.id_vote)
      .subscribe((resp:any)=> {
        this.total_votes = 0;
        this.name_vote = resp['content']['vote']['name'];
        this.name_name = this.name_vote
        this.votes_options = resp['content']['vote']['options'];
        this.absent = resp['content']['absent'];
        this.not_voted = resp['content']['not_voted'];
        this.status_vote = resp['content']['vote']['status_id'];
        //@ts-ignore
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
          this.socketService.listen('meeting_quorum_' + this.meeting_id).subscribe((response:any) => {
            this.getResults();
          });
          this.socketService.listen('vote_stored_' + this.meeting_id).subscribe((response:any) => {
            
            this.total_votes = 0;
            this.name_vote = response['vote']['name'];
            this.votes_options = response['vote']['options'];
            this.absent = response['absent'];
            this.not_voted = response['not_voted'];
            this.status_vote = response['vote']['status_id'];
            //@ts-ignore
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

  close_vote() {
    var text = "Si, cerrar";
    var textheader = 'Seguro desea cerrar la votacion?';
    this.vote_vote = this.id_vote;
    swal.fire({
      title: textheader,
      showCancelButton: true,
      confirmButtonColor: '#FF7300',
      cancelButtonColor: '#262626',
      confirmButtonText: text
    }).then((result) => {
      this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/reports/getVotingOptionResults/' + this.keysession + '/' + this.id_vote)
        .subscribe((resp:any)=> {
          this.total_votes = 0;
          this.name_vote = resp['content']['vote']['name'];
          this.votes_options = resp['content']['vote']['options'];
          this.absent = resp['content']['absent'];
          this.name_name = this.name_vote;
          this.not_voted = resp['content']['not_voted'];
          this.status_vote = resp['content']['vote']['status_id'];
          //@ts-ignore
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
          if (result['value'] == true) {
            const formData = new FormData();
            formData.append('residential_id', this.residential_id);
            formData.append('name', this.name_vote);
            formData.append('id', this.id_vote.toString());
            formData.append('request_accepted', this.request_accepted);
            formData.append('status_id', '0');
            this.createAnswerService.editAnswer(formData, this.residential_id, status, "1", this.meeting_id, this.keysession);
          }
        });
    })
  }

  goToInforms() {
    this.router.navigate(['/home/interventioncontrol/' + this.residential_id + '/' + 'listaVotaciones/' + this.residential_id + '/' + this.meeting_id]);
    setTimeout(function () {
      window.scrollTo(0, 550);
    }, 100);
  }

  Inform() {
    
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/voting/getVotingReportByHeaderExcel/' + this.keysession + '/' + this.vote_vote + '/' + this.with_cutomer_name)
      .subscribe((resp:any)=> {
        var base64decode = decodeURIComponent(atob(resp['content']).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        var blob = new Blob([base64decode], { type: 'application/vnd.ms-excel' });
        const file = new File([blob], 'report.xlsx',
          { type: 'application/vnd.ms-excel' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = this.name_name + '.xls';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  screenShotVote(nameVote:any) {
    DomToImage.toJpeg(document.getElementById('content-vote')!, { quality: 0.95 })
      .then(function (dataUrl:any) {
        var link = document.createElement('a');
        link.download = nameVote + '.jpeg';
        link.href = dataUrl;
        link.click();
      });
  }

  getResults() {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/reports/getVotingOptionResults/' + this.keysession + '/' + this.id_vote)
      .subscribe((resp:any)=> {
        this.total_votes = 0;
        this.name_vote = resp['content']['vote']['name'];
        this.votes_options = resp['content']['vote']['options'];
        this.absent = resp['content']['absent'];
        this.not_voted = resp['content']['not_voted'];
        this.status_vote = resp['content']['vote']['status_id'];
        //@ts-ignore
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
      });
  }

  orderVotes() {
    if (this.orderDesc) {
      this.votes_options.sort((a, b) => {
        return b['total_coefficient'] - a['total_coefficient'];
      });
      this.orderDesc = false;
    } else {
      this.votes_options.sort((a, b) => {
        return a['total_coefficient'] - b['total_coefficient'];
      });
      this.orderDesc = true;
    }
  }

  orderVotesOriginal() {
    this.orderDesc = true;
    this.votes_options.sort((a, b) => {
      return a['desktop_id'] - b['desktop_id'];
    });
  }

  reSendWhatsapp(){
    let data = {'voting_header_id': this.id_vote,'meeting_id': this.meeting_id}
    this._whatsappService.postReSendWhatsapp(data).subscribe(response=>{
      // console.log(response)
    })
  }

}