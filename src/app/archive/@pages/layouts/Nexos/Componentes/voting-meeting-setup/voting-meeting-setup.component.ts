import { Component, OnInit, Input, Inject, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { Globals } from '../../interface/globals.model';
import swal from 'sweetalert2';
import { StoreMeetingService } from '../../service/store-meeting.service';
 
import { json } from 'd3';
import { EnvServiceService } from '@env';
​
@Component({
  selector: 'app-voting-meeting-setup',
  templateUrl: './voting-meeting-setup.component.html',
  styleUrls: ['./voting-meeting-setup.component.scss']
})
export class VotingMeetingSetupComponent implements OnInit {
  private _env = inject(EnvServiceService)
  residential_id: any;
  dataResidential: [] = [];
  max_agents = '3';
  max_units = '3';
  quorum_on_real_time = "1";
  show_results = "0";
  redireccion = '';
  name!: string;
  userToken!: string;
​
  @Input() loadDatabase = {
    id: '0',
    name: '',
    date: '',
    document1: '',
    document2: '',
    document3: '',
    document4: '',
    document5: '',
    document6: '',
    document7: '',
    document8: '',
    document9: '',
    document10: '',
    document11: '',
    meeting_time: '',
    meeting_time_start: '',
    is_online: '1',
    youtube_link: '',
    youtube_share: '',
    support: '',
    request_signin_code: '0',
    session_check_time: '0'
  };
  imgURL: any;
  fileData: File | null = null;
  previewUrl: any;
​
  interval20: any;
  limitUserIntervention = 2;
  OptionsURL: string[] = [];
  limit_aporte = '0';
  limit_amount = '0';
  voted_email = '0';
  user_id!: string;
  listTypeEmail: [] = [];
  email_request_password_id = 32;
  limit_request_by_user = 3;
  end_session_time = 1;
  base_large = '0';
  session_check_time: any;
​
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private globals: Globals,
    private route: ActivatedRoute,
    private storeMeeting: StoreMeetingService,  
     ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    // tslint:disable-next-line: max-line-length
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;
    }
​
    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
​
    this.residential_id = this.route.snapshot.paramMap.get('idResidential');
    this.name = this.route.snapshot.paramMap.get('nameResidential')!;
    this.userToken = userStorage['token'];
    this.user_id = userStorage['id'];
    this.interval20 = setTimeout(() => {
      this.loadDatabase.youtube_link = this._env.ENDPOINT_SECONDARY + 'votacion/#/login/' + this.residential_id;
    }, 500);
​
    this.OptionsURL[0] = this._env.ENDPOINT_SECONDARY + 'votacion/#/login/' + this.residential_id;
    this.OptionsURL[1] = this._env.ENDPOINT_SECONDARY + 'preregistro/#/login/' + this.residential_id;
    this.OptionsURL[2] = this._env.ENDPOINT_SECONDARY + 'votacionslch/#/login/' + this.residential_id;
    this.OptionsURL[3] = this._env.ENDPOINT_SECONDARY + 'votacionslp/#/login/' + this.residential_id;
    // this.OptionsURL[4] = this._env.ENDPOINT_SECONDARY + 'votacionacciones/#/login/' + this.residential_id;
  }
​
​
  ngOnInit() {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'ApiEmailContent/getAllEmailContent?key=' + this._env.SECRET_KEY + '&user_id=' + this.user_id)
      .subscribe((resp:any)=> {
        this.listTypeEmail = resp["content"]
      });
  }
  goHome() {
    this.router.navigate(['home/']);
  }
  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }
  goSearchActiveSets() {
    this.router.navigate(['home/searchSets']);
  }
  saveMeeting() {
    if (this.loadDatabase['name'] === '') {
      swal.fire({
        title: '<strong>Advertencia</strong>',
        icon: 'warning',
        html:
          'El Nombre de la reunion es obligatorio',
        cancelButtonColor: '#727272',
        showCloseButton: true,
        showCancelButton: false,
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> OK',
      });
      return;
    }
    if (this.loadDatabase['date'] === '') {
      swal.fire({
        title: '<strong>Advertencia</strong>',
        icon: 'warning',
        html:
          'la fecha de la reunion es obligatoria',
        cancelButtonColor: '#727272',
        showCloseButton: true,
        showCancelButton: false,
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> OK',
      });
      return;
    }
    if (this.loadDatabase['is_online'] === '') {
      swal.fire({
        title: '<strong>Advertencia</strong>',
        icon: 'warning',
        html:
          'Seleccione si es asamblea a distancia',
        cancelButtonColor: '#727272',
        showCloseButton: true,
        showCancelButton: false,
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> OK',
      });
      return;
    }
    if (this.loadDatabase['meeting_time'] === '') {
      swal.fire({
        title: '<strong>Advertencia</strong>',
        icon: 'warning',
        html:
          'La hora registro y fecha son obligatorios',
        cancelButtonColor: '#727272',
        showCloseButton: true,
        showCancelButton: false,
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> OK',
      });
      return;
    }
    if (this.loadDatabase['youtube_link'] === '') {
      swal.fire({
        title: '<strong>Advertencia</strong>',
        icon: 'warning',
        html:
          'La url de votaciones es obligatoria',
        cancelButtonColor: '#FF8B00',
        showCloseButton: true,
        showCancelButton: false,
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> OK',
      });
    } else {
      if (this.fileData == null) {
        swal.fire({
          title: '<strong>Advertencia</strong>',
          icon: 'warning',
          html:
            'Debe cargar una base de datos',
          showCloseButton: true,
          showCancelButton: false,
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> OK',
        });
      } else {
​
        var objectDataSend = {
          'id': '0',
          'name': this.loadDatabase['name'],
          'residential_id': this.residential_id,
          'date': this.loadDatabase['date'],
          'max_agents': this.max_agents,
          'max_units': this.max_units,
          'meeting_time': this.loadDatabase['meeting_time'],
          'meeting_time_start': this.loadDatabase['meeting_time_start'],
          'is_online': this.loadDatabase['is_online'],
          'youtube_link': this.loadDatabase['youtube_link'],
          'youtube_share': this.loadDatabase['youtube_share'],
          'support': this.loadDatabase['support'],
          'quorum_real_time': this.quorum_on_real_time,
          'show_results': this.show_results,
          'request_signin_code': this.loadDatabase['request_signin_code'],
          'limit_aporte': this.limit_aporte,
          'limit_amount': this.limit_amount,
          'voted_email': this.voted_email,
          'email_request_password_id': this.email_request_password_id,
          'limit_request_by_user': this.limit_request_by_user,
          'end_session_time': this.end_session_time,
          'limit_raising_by_customer': this.limitUserIntervention,
          'url_redirection': this.redireccion,
          'session_check_time': this.session_check_time
        }
        const formData1 = new FormData();
​
        formData1.append('details', JSON.stringify(objectDataSend));
        formData1.append('file', this.fileData);
        
​
        setTimeout(() => {
          this.storeMeeting.storeMeetingService(formData1, this.userToken, this.base_large);
        }, 1000);
​
      }
    }
​
  }
  // cargar imagenes//
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }
  preview() {
    // Show preview 
    var mimeType = this.fileData!.type;
    this.previewUrl = './assets/img/excel.png';
    if (mimeType.match(/csv\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl = './assets/img/excel.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData!);
    reader.onload = (_event) => {
      //this.previewUrl = reader.result; 
    }
  }
​
  reloadDb() {
    this.imgURL = null;
    this.fileData = null;
    this.previewUrl = null;
    (<HTMLInputElement>document.getElementById("file")).value = "";
    // document.getElementById('').value = "";
  }
​
 
}