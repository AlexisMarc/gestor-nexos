
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import swal from 'sweetalert2';
import { DataProfileVoter } from '../../interface/dataProfileVoter.model';
import { DataOptionsvote } from '../../interface/dataOptionsVote.model';
import { DataProfileVoterSend } from '../../interface/dataProfileVoterSend.model';
import { CreateAnswerService } from '../../service/create-answer.service';

@Component({
  selector: 'app-create-virtual-votes',
  templateUrl: './create-virtual-votes.component.html',
  styleUrls: ['./create-virtual-votes.component.scss']
})
export class CreateVirtualVotesComponent implements OnInit {

  residential_id: string;
  nameVote = "";
  options: DataOptionsvote[] = [];
  voter_profiles: DataProfileVoter[] = [];
  id = 0;
  user_id: string;
  allProfilesVotation: [] = [];
  ProfileSelected = "0";
  nameOption = "";
  ProfilesToSend: DataProfileVoterSend[] = [];
  request_accepted = 1;
  nameOptionDefault = '';
  defaultOptions: any;
  mode_chart = '1';
  unit_chart = '1';

  constructor(private router: Router,
    private config: ConfigurationRestService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
     
     
    private createAnswerService: CreateAnswerService) {

    this.defaultOptions = [
      'APROBACION ESTADOS FINANCIEROS',
      'APROBACION PRESUPUESTO',
      'ELECCION REVISRO FISCAL',
      'APROBACION CUOTAEXTRAORDINARIA'
    ];

    this.residential_id = this.route.snapshot.paramMap.get('idResidential')!;
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    this.user_id = userStorage['id'];

    this.httpClient.get(this.config.endpoint + 'ApiVoting/getAllVoterProfiles?key=' + this.config.key + '&user_id=' + this.user_id)
      .subscribe((resp:any)=> {
        // this.allProfilesVotation = resp['content'];
        // let num = 1;
        // const profileVoterForAdd = new DataProfileVoter(this.allProfilesVotation[num]['id'], this.allProfilesVotation[num]['name']);
        // this.voter_profiles.push(profileVoterForAdd);
        // const ProfileAddToSend = new DataProfileVoterSend(this.allProfilesVotation[num]['id'])
        // this.ProfilesToSend.push(ProfileAddToSend)
      });
  }

  ngOnInit() {
  }
  goPointContrpl(residential_id:any) {
    this.router.navigate(['home/pointControlMeeting/' + residential_id]);
  }
  goSearchPointControl() {
    this.router.navigate(['home/pointControl']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }

  goSearchVituralVotes() {
    this.router.navigate(['home/buscarConjunto']);
  }

  goListVotes() {
    this.router.navigate(['home/listaVotaciones/' + this.residential_id]);
  }

  createVote() {
    if (this.options.length == 0) {
      swal.fire(
        'Alerta',
        'No puede crear una votacion sin opciones',
        'warning'
      )
      return
    }

    if (this.ProfilesToSend.length == 0) {
      swal.fire(
        'Alerta',
        'No puede crear una votacion sin perfiles',
        'warning'
      )
      return
    }

    if (this.nameVote == "") {
      swal.fire(
        'Alerta',
        'No puede crear una votacion sin nombre',
        'warning'
      )
      return
    }
    const options = JSON.stringify(this.options);
    const voteProfiles = JSON.stringify(this.ProfilesToSend);
    const formData = new FormData();
    formData.append('key', this.config.key);
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
    // this.createAnswerService.createAnswer(formData, this.residential_id);
  }

  addProfileVoter() {
    if (this.ProfileSelected == "0") {
      swal.fire(
        'Alerta',
        'Debe seleccionar algun perfil para agregarlo',
        'warning'
      )
    } else {
      // const ProfileSplit = this.ProfileSelected.split(",")
      // const profileVoterForAdd = new DataProfileVoter(ProfileSplit[0], ProfileSplit[1]);
      // this.voter_profiles.push(profileVoterForAdd);
      // const ProfileAddToSend = new DataProfileVoterSend(ProfileSplit[0])
      // this.ProfilesToSend.push(ProfileAddToSend)

      // this.ProfileSelected = "0";
    }

  }

  addOptionVote() {
    if (this.nameOption == "") {
      swal.fire(
        'Alerta',
        'La opcion no puede ir vacia',
        'warning'
      )
    } else {
      // const OptionAdd = new DataProfileVoter("0", this.nameOption);
      // this.options.push(OptionAdd);

      // this.nameOption = "";
    }

  }

  addDefaultAnswer() {
    // this.options = [];
    // this.voter_profiles = [];
    // this.ProfilesToSend = [];

    // this.nameVote = this.nameOptionDefault;

    // const OptionAdd = new DataProfileVoter("0", "SI APRUEBA");
    // this.options.push(OptionAdd);

    // const OptionAdd2 = new DataProfileVoter("0", "NO APRUEBA");
    // this.options.push(OptionAdd2);
    // let num = 1;
    // const profileVoterForAdd = new DataProfileVoter(this.allProfilesVotation[num]['id'], this.allProfilesVotation[num]['name']);
    // this.voter_profiles.push(profileVoterForAdd);
    // const ProfileAddToSend = new DataProfileVoterSend(this.allProfilesVotation[num]['id'])
    // this.ProfilesToSend.push(ProfileAddToSend)

  }

  resetAnswers() {
    this.options = [];
  }

  resetProfilesToQuestion() {
    this.voter_profiles = [];
  }

  deleteProfilesToQuestion(index:any) {
    this.voter_profiles.splice(index, 1);
    this.ProfilesToSend.splice(index, 1);
  }

  deleteOption(index:any) {
    this.options.splice(index, 1);
  }

}