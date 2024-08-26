import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { StoreMeetingService } from '../../service/store-meeting.service';
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { NgForm } from '@angular/forms';
declare var Swal: any;

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.scss']
})
export class EditMeetingComponent implements OnInit {
  residential_id: any;
  meeting_id: any;
  residential_name!: string;
  @Input() loadDatabase = {
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
  };
  meeting_status: any;

  imgURL: any;
  fileData: File|null = null;
  previewUrl: any;

  imgURL1: any;
  fileData1: File|null = null;
  previewUrl1: any;

  imgURL2: any;
  fileData2: File|null = null;
  previewUrl2: any;

  imgURL3: any;
  fileData3: File|null = null;
  previewUrl3: any;

  imgURL4: any;
  fileData4: File|null = null;
  previewUrl4: any;

  imgURL5: any;
  fileData5: File|null = null;
  previewUrl5: any;

  imgURL6: any;
  fileData6: File|null = null;
  previewUrl6: any;

  imgURL7: any;
  fileData7: File|null = null;
  previewUrl7: any;

  imgURL8: any;
  fileData8: File|null = null;
  previewUrl8: any;

  imgURL9: any;
  fileData9: File|null = null;
  previewUrl9: any;

  imgURL10: any;
  fileData10: File|null = null;
  previewUrl10: any;

  imgURL11: any;
  fileData11: File|null = null;
  previewUrl11: any;

  listDocument: [] = [];
  id_conjunto: any;
  user_id!: string;
  keysession!: string;

  constructor(
    private router: Router,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private storeMeeting: StoreMeetingService,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService
  ) {
    const userStorage = this.storage.get('user');


    // tslint:disable-next-line: max-line-length
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor' || userStorage['content']['profile'] === 'Moderador') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }

    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['content']['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.residential_id = this.route.snapshot.paramMap.get('idResidential');
    this.meeting_id = this.route.snapshot.paramMap.get('idMeeting');
    this.user_id = userStorage['content']['id'];
    this.keysession = userStorage['content']['token']
    // tslint:disable-next-line: max-line-length
    this.httpClient.get(this.config.endpoint3 + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this.config.key + '&residential_id=' + this.residential_id)
      .subscribe((resp:any)=> {
        this.residential_name = resp['content']['name'];
      });

    this.httpClient.get(this.config.endpoint3 + 'PreRegisterMeetingServices/getMeetingFilesListedEncoded?key=' + this.config.key + '&residential_id=' + this.residential_id)
      .subscribe((resp2 :any)=> {
        this.listDocument = resp2['content']
      });
  }

  ngOnInit() {
  }

  loadFiles(form: NgForm) {
    const formData = new FormData();
    formData.append('key', this.config.key);
    formData.append('meeting_id', this.meeting_id);
    formData.append('document1', this.loadDatabase['document1']);
    formData.append('document2', this.loadDatabase['document2']);
    formData.append('document3', this.loadDatabase['document3']);
    formData.append('document4', this.loadDatabase['document4']);
    formData.append('document5', this.loadDatabase['document5']);
    formData.append('document6', this.loadDatabase['document6']);
    formData.append('document7', this.loadDatabase['document7']);
    formData.append('document8', this.loadDatabase['document8']);
    formData.append('document9', this.loadDatabase['document9']);
    formData.append('document10', this.loadDatabase['document10']);
    formData.append('document11', this.loadDatabase['document11']);
    formData.append('file1', this.fileData1!);
    formData.append('file2', this.fileData2!);
    formData.append('file3', this.fileData3!);
    formData.append('file4', this.fileData4!);
    formData.append('file5', this.fileData5!);
    formData.append('file6', this.fileData6!);
    formData.append('file7', this.fileData7!);
    formData.append('file8', this.fileData8!);
    formData.append('file9', this.fileData9!);
    formData.append('file10', this.fileData10!);
    formData.append('file11', this.fileData11!);
    this.httpClient.post(this.config.endpoint6 + 'api/meetings/uploadDocumentsForMeeting/' + this.keysession + '/' + this.meeting_id, formData).subscribe((data:any) => {
      let iconStatus: SweetAlertIcon = 'error';
      if (data['success']) {
        iconStatus = 'success';
        this.reLoadFiles();
        form.resetForm();
        this.resetAllFileInputs();
      }
      swal.fire('Correcto', data['message'], iconStatus);
    });
  }

  resetAllFileInputs() {
    this.imgURL1 = null;
    this.fileData1 = null;
    this.previewUrl1 = null;
    (<HTMLInputElement>document.getElementById("file1")).value = "";
    this.imgURL2 = null;
    this.fileData2 = null;
    this.previewUrl2 = null;
    (<HTMLInputElement>document.getElementById("file2")).value = "";
    this.imgURL3 = null;
    this.fileData3 = null;
    this.previewUrl3 = null;
    (<HTMLInputElement>document.getElementById("file3")).value = "";
    this.imgURL4 = null;
    this.fileData4 = null;
    this.previewUrl4 = null;
    (<HTMLInputElement>document.getElementById("file4")).value = "";
    this.imgURL5 = null;
    this.fileData5 = null;
    this.previewUrl5 = null;
    (<HTMLInputElement>document.getElementById("file5")).value = "";
    this.imgURL6 = null;
    this.fileData6 = null;
    this.previewUrl6 = null;
    (<HTMLInputElement>document.getElementById("file6")).value = "";
    this.imgURL7 = null;
    this.fileData7 = null;
    this.previewUrl7 = null;
    (<HTMLInputElement>document.getElementById("file7")).value = "";
    this.imgURL8 = null;
    this.fileData8 = null;
    this.previewUrl8 = null;
    (<HTMLInputElement>document.getElementById("file8")).value = "";
    this.imgURL9 = null;
    this.fileData9 = null;
    this.previewUrl9 = null;
    (<HTMLInputElement>document.getElementById("file9")).value = "";
    this.imgURL10 = null;
    this.fileData10 = null;
    this.previewUrl10 = null;
    (<HTMLInputElement>document.getElementById("file10")).value = "";
    this.imgURL11 = null;
    this.fileData11 = null;
    this.previewUrl11 = null;
    (<HTMLInputElement>document.getElementById("file11")).value = "";
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
  // cargar imagenes1//
  fileProgress1(fileInput: any) {
    this.fileData1 = <File>fileInput.target.files[0];
    this.preview1();
  }
  preview1() {
    // Show preview 
    var mimeType = this.fileData1!.type;
    this.previewUrl1 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl1 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData1!);
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
    var mimeType = this.fileData2!.type;
    this.previewUrl2 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl2 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData2!);
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
    var mimeType = this.fileData3!.type;
    this.previewUrl3 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl3 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData3!);
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
    var mimeType = this.fileData4!.type;
    this.previewUrl4 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl4 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData4!);
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
    var mimeType = this.fileData5!.type;
    this.previewUrl5 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl5 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData5!);
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
    var mimeType = this.fileData6!.type;
    this.previewUrl6 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl6 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData6!);
    reader.onload = (_event) => {
      //this.previewUrl = reader.result; 
    }
  }
  // cargar imagenes7//
  fileProgress7(fileInput: any) {
    this.fileData7 = <File>fileInput.target.files[0];
    this.preview7();
  }
  preview7() {
    // Show preview 
    var mimeType = this.fileData7!.type;
    this.previewUrl7 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl7 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData7!);
    reader.onload = (_event) => {
      //this.previewUrl = reader.result; 
    }
  }
  // cargar imagenes8//
  fileProgress8(fileInput: any) {
    this.fileData8 = <File>fileInput.target.files[0];
    this.preview8();
  }
  preview8() {
    // Show preview 
    var mimeType = this.fileData8!.type;
    this.previewUrl8 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl8 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData8!);
    reader.onload = (_event) => {
      //this.previewUrl = reader.result; 
    }
  }
  // cargar imagenes8//
  fileProgress9(fileInput: any) {
    this.fileData9 = <File>fileInput.target.files[0];
    this.preview9();
  }
  preview9() {
    // Show preview 
    var mimeType = this.fileData9!.type;
    this.previewUrl9 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl9 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData9!);
    reader.onload = (_event) => {
      //this.previewUrl = reader.result; 
    }
  }

  // cargar imagenes10//
  fileProgress10(fileInput: any) {
    this.fileData10 = <File>fileInput.target.files[0];
    this.preview10();
  }
  preview10() {
    // Show preview 
    var mimeType = this.fileData10!.type;
    this.previewUrl10 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl10 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData10!);
    reader.onload = (_event) => {
      //this.previewUrl = reader.result; 
    }
  }

  // cargar imagenes11//
  fileProgress11(fileInput: any) {
    this.fileData11 = <File>fileInput.target.files[0];
    this.preview11();
  }
  preview11() {
    // Show preview 
    var mimeType = this.fileData11!.type;
    this.previewUrl11 = './assets/img/pdf1.png';
    if (mimeType.match(/.pdf\/*/) == null) {
      return;
    }
    if (mimeType == 'application/vnd.ms-excel') {
      this.previewUrl11 = './assets/img/pdf1.png';
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData11!);
    reader.onload = (_event) => {
      //this.previewUrl = reader.result; 
    }
  }

  deleteDocument(id_document:any, nameFile:any) {
    Swal.fire({
      showCancelButton: true,
      text: '¿Esta seguro que desea borrar el documento ' + nameFile + ' ?',
      confirmButtonColor: '#e56e22',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      icon: 'question',
    }).then((result:any) => {
      if (result.value) {
        const formData = new FormData();
        formData.append('key', this.config.key);
        formData.append('user_id', this.user_id);
        formData.append('document_id', id_document);
        this.storeMeeting.deleteDocument(formData);
        setTimeout(() => {
          this.reLoadFiles();
        }, 500)
      }
    });
  }

  reLoadFiles() {
    this.listDocument = [];
    this.httpClient.get(this.config.endpoint3 + 'PreRegisterMeetingServices/getMeetingFilesListedEncoded?key=' + this.config.key + '&residential_id=' + this.residential_id)
      .subscribe((resp2 :any)=> {
        this.listDocument = resp2['content'];
      });
  }

  downloadDocument(documentId:any, nameFile:any) {
    this.httpClient.get(this.config.endpoint6 + 'ApiMeetings/getMeetingFileById/' + this.keysession + '/' + documentId + '/' + this.meeting_id)
      .subscribe((response :any)=> {
        var file = new Blob([this._base64ToArrayBuffer(response['file_content'])], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.download = nameFile;
        fileLink.click();
        //Method secondary
        // var win = window.open();
        // win.document.write('<iframe src="' + fileURL + '" name="'+ nameFile +'" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
      });
  }

  _base64ToArrayBuffer(base64:any) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

}
