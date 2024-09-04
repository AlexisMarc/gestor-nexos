import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CreateEmailContentService } from '../../service/create-email-content.service';
import { GetAllActiveAppServicesTypeService } from '../../service/get-all-active-app-services-type.service';
import Swal from 'sweetalert2';
import { ConfigurationRestService } from '../../service/configuration.rest.service';

@Component({
  selector: 'app-create-email-icloud',
  templateUrl: './create-email-icloud.component.html',
  styleUrls: ['./create-email-icloud.component.scss']
})
export class CreateEmailIcloudComponent implements OnInit {
  ListServiceActive: any;
  user_id: any;
  @Input() createParamTextEmailContent = {
    subject: '',
    message: '',
    service_id: '0',
    status_id: '1',
    name_email: ''
  };
  constructor(private router: Router,
              private createEmailService: CreateEmailContentService,
              private config: ConfigurationRestService,
              private getAllActiveAppServices: GetAllActiveAppServicesTypeService,
               
               ) {


                const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
                 this.user_id = userStorage['id'];
               }

  ngOnInit() {
    this.ListServiceActive = this.getAllActiveAppServices.ListServiceActive;
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
  createEmailIcloud() {
    // if (this.createParamTextEmailContent.subject === '') {
    //   Swal.fire('Atencion', 'El asunto es obligatorio', 'warning');
    //   return;
    // }
    // if (this.createParamTextEmailContent.message === '') {
    //   Swal.fire('Atencion', 'El mensaje es obligatorio', 'warning');
    //   return;
    // }
    // if (this.createParamTextEmailContent.service_id === '') {
    //   Swal.fire('Atencion', 'El tipo de cotizacion es obligatorio', 'warning');
    //   return;
    // }
    // if (this.createParamTextEmailContent.status_id === '') {
    //   Swal.fire('Atencion', 'El estado es obligatorio', 'warning');
    //   return;
    // }
    const formData = new FormData();
    formData.append('key', this.config.key);
    formData.append('user_id', this.user_id);
    formData.append('id', '0');
    formData.append('subject', this.createParamTextEmailContent['subject']);
    formData.append('name_email', this.createParamTextEmailContent['name_email']);
    formData.append('message', this.createParamTextEmailContent['message']);
    formData.append('service_id', this.createParamTextEmailContent['service_id']);
    formData.append('status_id', this.createParamTextEmailContent['status_id']);

     this.createEmailService.createEmailContent(formData);

  }
}
