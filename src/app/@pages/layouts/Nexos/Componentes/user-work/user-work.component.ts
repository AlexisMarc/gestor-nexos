import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import swal from 'sweetalert2';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import * as moment from 'moment';


@Component({
  selector: 'app-user-work',
  templateUrl: './user-work.component.html',
  styleUrls: ['./user-work.component.scss']
})
export class UserWorkComponent implements OnInit {

  profile!: string;
  listActiveUser: any;
  keysession!: string;
  rest_hour = 1000*60*60*5

  constructor(

    private router: Router,
     
     
    private httpClient: HttpClient,
    private config: ConfigurationRestService) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;

    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor' || userStorage['profile'] === 'Asesor' || userStorage['profile'] === 'Moderador' || userStorage['profile'] === 'Soporte telefonico') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      sessionStorage.clear();
      this.router.navigate(['/']);
      return;
    }
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.profile = userStorage['profile'];
    this.keysession = userStorage['token'];
  }

  ngOnInit() {
    //Llamar listado de tareas del día actual
    this.httpClient.get(this.config.endpoint6 + 'api/tasks/getActiveTaskList/' + this.keysession).subscribe((response:any) => {
      if (response['success']) {
        this.listActiveUser = response['content']
        this.transformTimeZone(this.listActiveUser)
      }
    });
  }

  goToWorks() {
    this.router.navigate(['/home/tareas']);
  }

  transformTimeZone(dateToTransform:any) {
    dateToTransform.forEach((element:any) => {
      if(element.start_task != null){
        let dateToBack = Date.parse(element.start_task)
        let actualDate = dateToBack - this.rest_hour
        //@ts-ignore
        var datetransformed = moment(actualDate)
        let dateFormate = datetransformed.format('YYYY-MM-DD HH:mm:ss')
        element.start_task = dateFormate
      }
      if(element.end_task != null){
        let dateToBack2 = Date.parse(element.end_task)
        let actualDate2 = dateToBack2 - this.rest_hour
        //@ts-ignore
        var datetransformed2 = moment(actualDate2)
        let dateFormate2 = datetransformed2.format('YYYY-MM-DD HH:mm:ss')
        element.end_task = dateFormate2
      }      
    });
    // console.log(this.showListTaksByUser)
  }

}
