import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import swal from 'sweetalert2';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import * as moment from 'moment';


@Component({
  selector: 'app-search-user-task',
  templateUrl: './search-user-task.component.html',
  styleUrls: ['./search-user-task.component.scss']
})
export class SearchUserTaskComponent implements OnInit {
  profile: string;
  listTaksByUser: [] = [];
  showListTaksByUser: [] = [];
  bridge = '';
  keysession: string;
  userId = '';
  dateFrom = '';
  dateTo = '';
  listUsers: any;
  nameUser = '';
  indexOfUser = '';
  nameOfUser = '';
  rest_hour = 1000*60*60*5

  constructor(
    private router: Router,
    private route: ActivatedRoute, @Inject(SESSION_STORAGE)
    private storage: WebStorageService,
    private httpClient: HttpClient,
    private config: ConfigurationRestService) {
    const userStorage = this.storage.get('user');

    // tslint:disable-next-line: max-line-length
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor' || userStorage['content']['profile'] === 'Asesor' || userStorage['content']['profile'] === 'Moderador' || userStorage['content']['profile'] === 'Soporte telefonico') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      sessionStorage.clear();
      this.router.navigate(['/']);
      return;
    }

    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['content']['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.profile = userStorage['content']['profile'];
    this.keysession = userStorage['content']['token'];
  }

  ngOnInit() {
    //Obtener todos los usuarios
    this.httpClient.get(this.config.endpoint + 'UserServices/getAllUsers?key=' + this.config.key)
      .subscribe(resp => {
        this.listUsers = resp['content'];
      });
  }

  goToWorks() {
    this.router.navigate(['/home/tareas']);
  }

  selectedUser() {
    this.listTaksByUser = [];
    var user = this.listUsers.find(user => user.name === this.nameOfUser);
    this.getListByUser(user)
  }

  getListByUser(user) {
    if (this.dateFrom == '' || user == '') {
      swal.fire(
        'mensaje',
        'Debe seleccionar el usuario y la fecha desde',
        'warning'
      );
      return;
    } else {
      this.userId = user['id'];
      this.nameUser = user['name'];
      var queryToSearch = this.config.endpoint6 + 'api/tasks/getTaskByUser/' + this.keysession + '/' + this.dateFrom + '/' + this.userId;
      if (this.dateFrom == this.dateTo || this.dateTo == '') {
        queryToSearch = this.config.endpoint6 + 'api/tasks/getTaskByUser/' + this.keysession + '/' + this.dateFrom + '/' + this.userId;
      } else {
        queryToSearch = this.config.endpoint6 + 'api/tasks/getTaskByUser/' + this.keysession + '/' + this.dateFrom + '/' + this.userId + '/' + this.dateTo
      }
      //Llamar listado de tareas del día actual
      this.httpClient.get(queryToSearch).subscribe((response) => {
        if (response['success']) {

          this.listTaksByUser = response['content'];
          this.bridge = JSON.stringify( this.listTaksByUser)
          this.showListTaksByUser = JSON.parse(this.bridge)
          this.transformTimeZone(this.showListTaksByUser)

        }

        // this.indexOfUser = "";
        // this.dateFrom = "";
        // this.dateTo = "";
      });
    }
  }

  resetSearch() {
    this.listTaksByUser = [];
    this.indexOfUser = '';
    this.nameOfUser = '';
    document.getElementById('input-search-by-name').focus();
  }

  goToEditTask(idTask) {
    this.router.navigate(['/home/editartarea/' + idTask]);
  }

  editTask(idTask, description, start_task, end_task, duration, status_task) {

    var formData = new FormData;
    start_task = this.calculoHoras(start_task)
    end_task = this.calculoHoras(end_task)
    var arrayDataTask2 = {
      "id": idTask,
      "description": description,
      "start_task": start_task,
      "end_task": end_task,
      "duration": duration,
      "status_task": status_task
    }
    var dataTaskToSend = JSON.stringify(arrayDataTask2);
    formData.append("task", dataTaskToSend);
    
    this.httpClient.post(this.config.endpoint6 + 'api/tasks/storeTask/' + this.keysession, formData).subscribe((resp) => {
      if (resp['success']) {
        swal.fire('Mensaje', 'Se ha editado la información de manera exitosa', 'success');
        // this.return();
        document.getElementById("serachUserButton").click();
      } else {
        swal.fire('Atención', 'No se pudo completar su solicitud', 'error');
      }
    });
  }
 
  downloadReport() {
    var queryToSearch;
    if (this.dateFrom == this.dateTo || this.dateTo == '') {
      queryToSearch = this.config.endpoint6 + 'api/reports/getTaskReportExcel/' + this.keysession + '/' + this.userId + '/' + this.dateFrom;
    } else {
      queryToSearch = this.config.endpoint6 + 'api/reports/getTaskReportExcel/' + this.keysession + '/' + this.userId + '/' + this.dateFrom + '/' + this.dateTo
    }
    //Descargar excel con reporte
    this.httpClient.get(queryToSearch).subscribe(response => {
      var base64decode = decodeURIComponent(atob(response['content']).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      var link = document.createElement("a");
      link.href = 'data:text/xls,' + encodeURIComponent(base64decode);
      link.download = "Informe " + this.nameUser + " " + this.dateFrom + ' a ' + this.dateTo + ".xls";
      link.click();
    });
  }

  downloadReportAllUsers() {
    var queryToSearch;
    if (this.dateFrom == this.dateTo || this.dateTo == '') {
      queryToSearch = this.config.endpoint6 + 'api/reports/getTaskReportExcel/' + this.keysession + '/0/' + this.dateFrom;
    } else {
      queryToSearch = this.config.endpoint6 + 'api/reports/getTaskReportExcel/' + this.keysession + '/0/' + this.dateFrom + '/' + this.dateTo
    }
    //Descargar excel con reporte
    this.httpClient.get(queryToSearch).subscribe(response => {
      var base64decode = decodeURIComponent(atob(response['content']).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      var link = document.createElement("a");
      link.href = 'data:text/xls,' + encodeURIComponent(base64decode);
      link.download = "Informe Todos " + this.dateFrom + ' a ' + this.dateTo + ".xls";
      link.click();
    });
  }


  transformTimeZone(dateToTransform) {
    dateToTransform.forEach(element => {
      if(element.start_task != null){
        let dateToBack = Date.parse(element.start_task)
        let actualDate = dateToBack - this.rest_hour
        var datetransformed = moment(actualDate)
        let dateFormate = datetransformed.format('YYYY-MM-DD HH:mm:ss')
        element.start_task = dateFormate
      }
      if(element.end_task != null){
        let dateToBack2 = Date.parse(element.end_task)
        let actualDate2 = dateToBack2 - this.rest_hour
        var datetransformed2 = moment(actualDate2)
        let dateFormate2 = datetransformed2.format('YYYY-MM-DD HH:mm:ss')
        element.end_task = dateFormate2
      }      
    });
  }

  calculoHoras(hora){
      if(hora != null){
        let dateToBack = Date.parse(hora)
        let actualDate = dateToBack + this.rest_hour
        var datetransformed = moment(actualDate)
        let dateFormate = datetransformed.format('YYYY-MM-DD HH:mm:ss')
        hora = dateFormate
        return hora
      }    
  }
  
}
