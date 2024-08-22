import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { Globals } from '../../interface/globals.model';
import swal from 'sweetalert2';
import { StoreMeetingService } from '../../service/store-meeting.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-votiing-and-preregistration',
  templateUrl: './votiing-and-preregistration.component.html',
  styleUrls: ['./votiing-and-preregistration.component.scss']
})
export class VotiingAndPreregistrationComponent implements OnInit {
  residential_id: any;
  dataResidential: [] = [];

  @Input() loadDatabase = {
    id: '0',
    name: '',
    date: '',
    max_units: '1',
    max_agents: '1',
    document1: '',
    document2: '',
    document3: '',
    document4: '',
    document5: '',
    document6: '',
    document7: '',
    document8: '',
    meeting_time: '',
    meeting_time_start: '',
    is_online: '1',
    youtube_link: '',
    youtube_share: '',
  };

  imgURL: any;
  fileData: File = null;
  previewUrl: any;

  imgURL1: any;
  fileData1: File = null;
  previewUrl1: any;

  imgURL2: any;
  fileData2: File = null;
  previewUrl2: any;

  imgURL3: any;
  fileData3: File = null;
  previewUrl3: any;

  imgURL4: any;
  fileData4: File = null;
  previewUrl4: any;

  imgURL5: any;
  fileData5: File = null;
  previewUrl5: any;

  imgURL6: any;
  fileData6: File = null;
  previewUrl6: any;

  imgURL8: any;
  fileData8: File = null;
  previewUrl8: any;

  imgURL7: any;
  fileData7: File = null;
  previewUrl7: any;

  token: string;
  
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private globals: Globals,
    private route: ActivatedRoute,
    private storeMeeting: StoreMeetingService, @Inject(SESSION_STORAGE)
    private storage: WebStorageService) {
    const userStorage = this.storage.get('user');
    // tslint:disable-next-line: max-line-length
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }

    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' ||  userStorage === '' || userStorage['content']['status_id'] === 0 ) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }

    this.residential_id = this.route.snapshot.paramMap.get('idResidential');
    this.loadDatabase.youtube_link = this.config.endpoint4 + 'votacion/#/login/' + this.residential_id;
   }

  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['home/']);
  }
  goMenuSettingVoting(){
    this.router.navigate(['home/menusettingVoting']);
  }
  goSearchActiveSets(){
    this.router.navigate(['home/searchSets']);
  }
  saveMeeting() {
    if (this.loadDatabase['name'] ==  "") {
      swal.fire({
        title: '<strong>Advertencia</strong>',
        type: 'warning',
        html:
          'El Nombre de la reunion es obligatorio',
       cancelButtonColor: '#727272',
        showCloseButton: true,
        showCancelButton: false,
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> OK',
      });
      return
    }
    if ( this.loadDatabase['meeting_time'] == "") {
      swal.fire({
        title: '<strong>Advertencia</strong>',
        type: 'warning',
        html:
        'La hora registro y fecha son obligatorios',
       cancelButtonColor: '#727272',
        showCloseButton: true,
        showCancelButton: false,
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> OK',
      });
      return
    }
    if (this.loadDatabase['youtube_link'] == "") {
      swal.fire({
        title: '<strong>Advertencia</strong>',
        type: 'warning',
        html:
        'El link de las Votaciones es obligatorio',
       cancelButtonColor: '#727272',
        showCloseButton: true,
        showCancelButton: false,
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> OK',
      });
      return
    }
    
  
    
    
    if ( this.loadDatabase['max_units'] == null) {
      swal.fire({
        title: '<strong>Advertencia</strong>',
        type: 'warning',
        html:
        'la maxima cantidad de unidades es obligatoria',
       cancelButtonColor: '#727272',
        showCloseButton: true,
        showCancelButton: false,
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> OK',
      });
      return
    }
      if (this.loadDatabase['max_units'] == '0' ) {
        swal.fire({
          title: '<strong>Advertencia</strong>',
          type: 'warning',
          html:
          'la maxima cantidad debe ser mayor que cero',
         cancelButtonColor: '#727272',
          showCloseButton: true,
          showCancelButton: false,
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> OK',
        });
        return
    }
    if ( this.loadDatabase['max_agents'] == null) {
      swal.fire({
        title: '<strong>Advertencia</strong>',
        type: 'warning',
        html:
        'la maxima cantidad de poderes es obligatoria',
       cancelButtonColor: '#727272',
        showCloseButton: true,
        showCancelButton: false,
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> OK',
      });
      return
    }
    if ( this.loadDatabase['max_agents'] == "0" ) {
      swal.fire({
        title: '<strong>Advertencia</strong>',
        type: 'warning',
        html:
        'la maxima cantidad de poderes debe ser mayor que cero',
       cancelButtonColor: '#727272',
        showCloseButton: true,
        showCancelButton: false,
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> OK',
      });
      return
    }
    if (this.loadDatabase['date'] == "") {
      swal.fire({
        title: '<strong>Advertencia</strong>',
        type: 'warning',
        html:
          'la fecha de la reunion es obligatoria',
       cancelButtonColor: '#727272',
        showCloseButton: true,
        showCancelButton: false,
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> OK',
      });
      return
    }
   
    if ( this.loadDatabase.is_online === "") {
        swal.fire({
          title: '<strong>Advertencia</strong>',
          type: 'warning',
          html:
            'La url de votaciones es obligatoria',
         cancelButtonColor: '#FF8B00',
          showCloseButton: true,
          showCancelButton: false,
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> OK',
      });
    }

    else { 
      if (this.fileData == null) {
        swal.fire({
          title: '<strong>Advertencia</strong>',
          type: 'warning',
          html:
            'Debe cargar una base de datos',
          showCloseButton: true,
          showCancelButton: false,
          cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> OK',
        });
      }
      else {
        const formData = new FormData();

        formData.append('key', this.config.key);
        formData.append('id', '0');
        formData.append('name', this.loadDatabase['name']);
        formData.append('residential_id', this.residential_id);
        formData.append('date', this.loadDatabase['date']);
        formData.append('max_agents', this.loadDatabase['max_agents']);
        formData.append('max_units', this.loadDatabase['max_units']);
        formData.append('meeting_time', this.loadDatabase['meeting_time']);
        formData.append('meeting_time_start', this.loadDatabase.meeting_time_start);
        formData.append('is_online', this.loadDatabase['is_online']);
        formData.append('document1', this.loadDatabase['document1']);
        formData.append('document2', this.loadDatabase['document2']);
        formData.append('document3', this.loadDatabase['document3']);
        formData.append('document4', this.loadDatabase['document4']);
        formData.append('document5', this.loadDatabase['document5']);
        formData.append('document6', this.loadDatabase['document6']);
        formData.append('document7', this.loadDatabase['document7']);
        formData.append('document8', this.loadDatabase['document8']);
        formData.append('file', this.fileData);
        formData.append('file1', this.fileData1);
        formData.append('file2', this.fileData2);
        formData.append('file3', this.fileData3);
        formData.append('file4', this.fileData4);
        formData.append('file5', this.fileData5);
        formData.append('file6', this.fileData6); 
        formData.append('file6', this.fileData7); 
        formData.append('file6', this.fileData8);  
        formData.append('youtube_link', this.loadDatabase['youtube_link']);
        formData.append('youtube_share', this.loadDatabase['youtube_share']);
       
       this.storeMeeting.storeMeetingService(formData, this.token, 0);

      }
    }

  }

// cargar imagenes//
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    this.previewUrl = './assets/img/excel.png';
    if (mimeType.match(/csv\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl = './assets/img/excel.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      //this.previewUrl = reader.result; 
    }
  }
  // cargar imagenes1//
  fileProgress1(fileInput: any) {
    this.fileData1 = <File>fileInput.target.files[0];
    this.preview1();
  }
  preview1() {
    // Show preview 
    var mimeType = this.fileData1.type;
    this.previewUrl1 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl1 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData1);
    reader.onload = (_event) => {
      //this.previewUrl = reader.result; 
    }
  }
  // cargar imagenes2//
  fileProgress2(fileInput: any) {
    this.fileData2 = <File>fileInput.target.files[0];
    this.preview2();
  }
  preview2() {
    // Show preview 
    var mimeType = this.fileData2.type;
    this.previewUrl2 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl2 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData2);
    reader.onload = (_event) => {
      //this.previewUrl = reader.result; 
    }
  }
  // cargar imagenes3//
  fileProgress3(fileInput: any) {
    this.fileData3 = <File>fileInput.target.files[0];
    this.preview3();
  }
  preview3() {
    // Show preview 
    var mimeType = this.fileData3.type;
    this.previewUrl3 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl3 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData3);
    reader.onload = (_event) => {
      //this.previewUrl = reader.result; 
    }
  }
  // cargar imagenes4//
  fileProgress4(fileInput: any) {
    this.fileData4 = <File>fileInput.target.files[0];
    this.preview4();
  }
  preview4() {
    // Show preview 
    var mimeType = this.fileData4.type;
    this.previewUrl4 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl4 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData4);
    reader.onload = (_event) => {
      //this.previewUrl = reader.result; 
    }
  }
  // cargar imagenes5//
  fileProgress5(fileInput: any) {
    this.fileData5 = <File>fileInput.target.files[0];
    this.preview5();
  }
  preview5() {
    // Show preview 
    var mimeType = this.fileData5.type;
    this.previewUrl5 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl5 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData5);
    reader.onload = (_event) => {
      //this.previewUrl = reader.result; 
    }
  }
  // cargar imagenes6//
  fileProgress6(fileInput: any) {
    this.fileData6 = <File>fileInput.target.files[0];
    this.preview6();
  }
  preview6() {
    // Show preview 
    var mimeType = this.fileData6.type;
    this.previewUrl6 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl6 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData6);
    reader.onload = (_event) => {
      //this.previewUrl = reader.result; 
    }
  }

}
