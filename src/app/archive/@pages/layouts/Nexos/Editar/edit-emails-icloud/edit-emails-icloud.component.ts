import { Component, OnInit, Inject, Input, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { Globals } from '../../interface/globals.model';
 
import { GetAllActiveAppServicesTypeService } from '../../service/get-all-active-app-services-type.service';
import Swal from 'sweetalert2';
import { CreateEmailContentService } from '../../service/create-email-content.service';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-edit-emails-icloud',
  templateUrl: './edit-emails-icloud.component.html',
  styleUrls: ['./edit-emails-icloud.component.scss']
})
export class EditEmailsIcloudComponent implements OnInit {
  private _env = inject(EnvServiceService)
  user_id: any;
  allEmailId: any;
  idEmail: any;
  ListServiceActive: any;
  serviceActive: any;

  @Input() editParamTextEmailContent = {
    id: '',
    subject: '',
    message: '',
    service_id: '',
    status_id: '',
    name_email: ''
  };

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private globals: Globals,
     
     
    private createEmailService: CreateEmailContentService,
    private getAllActiveAppServices: GetAllActiveAppServicesTypeService,
    private route: ActivatedRoute) {

    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    this.user_id = userStorage['id']; 
    this.idEmail = this.route.snapshot.paramMap.get('idEmail');
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor') {
    } else {
      Swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }

    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' ||  userStorage === '' || userStorage['status_id'] === 0 ) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }

    // Obtener all Emails
    // tslint:disable-next-line: max-line-length
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'ApiEmailContent/getEmailContentById?key=' + this._env.SECRET_KEY + '&user_id=' + this.user_id + '&id=' + this.idEmail)
      .subscribe((resp:any)=> {
        this.editParamTextEmailContent.id = resp['content']['id'];
        this.editParamTextEmailContent.subject = resp['content']['subject'];
        this.editParamTextEmailContent.message = resp['content']['message'];
        this.editParamTextEmailContent.service_id = resp['content']['service_id'];
        this.editParamTextEmailContent.status_id = resp['content']['status_id'];
        this.editParamTextEmailContent.name_email = resp['content']['name_email'];

        this.ListServiceActive = this.getAllActiveAppServices.ListServiceActive;

      });

  }

  ngOnInit() {

  }
  goHome() {
    this.router.navigate(['home/']);
  }
  goConfigEmails() {
    this.router.navigate(['home/menusettingEmail']);
  }
  goListEmailsIcloud() {
    this.router.navigate(['home/emailIcloud']);
  }
  editEmailIcloud() {
    if (this.editParamTextEmailContent.subject === '') {
      Swal.fire('Atencion', 'El asunto es obligatorio', 'warning');
      return;
    }
    if (this.editParamTextEmailContent.message === '') {
      Swal.fire('Atencion', 'El mensaje es obligatorio', 'warning');
      return;
    }
    if (this.editParamTextEmailContent.service_id === '0') {
      Swal.fire('Atencion', 'El tipo de cotizacion es obligatorio', 'warning');
      return;
    }
    if (this.editParamTextEmailContent.status_id === '') {
      Swal.fire('Atencion', 'El estado es obligatorio', 'warning');
      return;
    }
    const formData = new FormData();
    formData.append('key', this._env.SECRET_KEY);
    formData.append('user_id', this.user_id);
    formData.append('id', this.editParamTextEmailContent['id']);
    formData.append('subject', this.editParamTextEmailContent['subject']);
    formData.append('name_email', this.editParamTextEmailContent['name_email']);
    formData.append('message', this.editParamTextEmailContent['message']);
    formData.append('service_id', this.editParamTextEmailContent['service_id']);
    formData.append('status_id', this.editParamTextEmailContent['status_id']);

    this.createEmailService.editEmailContent(formData);

  }
}
