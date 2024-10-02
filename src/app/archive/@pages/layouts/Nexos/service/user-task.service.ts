import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from './configuration.rest.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserTaskService {

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router
  ) { }

  createOrEditTask(data, token) {
    this.httpClient.post(this.config.endpoint6 + 'api/tasks/storeTask/' + token, data).subscribe((response :any)=> {
      if (response['success'] == true) {

        swal.fire('Correcto', response['message'], 'success');
      } else {

        swal.fire('Correcto', response['message'], 'warning');
      }

    });
  }

  getTasksByUser(userId, date, token) {
    this.httpClient.get(this.config.endpoint + 'ApiTasks/getTaskByUser/' + userId + '/' + date + '/' + token).subscribe((response :any)=> {
      if (response['success'] == true) {

        swal.fire('Correcto', response['message'], 'success');
      } else {

        swal.fire('Correcto', response['message'], 'warning');
      }

    });
  }

  getTaskToday(token) {
    this.httpClient.get(this.config.endpoint + 'api/tasks/getActiveTaskList/' + token).subscribe((response :any)=> {
      if (response['success'] == true) {

        swal.fire('Correcto', response['message'], 'success');
      } else {

        swal.fire('Correcto', response['message'], 'warning');
      }

    });
  }

  getTaskDefault(token) {
    this.httpClient.get(this.config.endpoint + 'api/tasks/getTasks/' + token).subscribe((response :any)=> {
      if (response['success'] == true) {

        swal.fire('Correcto', response['message'], 'success');
      } else {

        swal.fire('Correcto', response['message'], 'warning');
      }

    });
  }

  getTaskDetails(userId, token) {
    this.httpClient.get(this.config.endpoint + 'api/tasks/getActiveTaskByUser/' + userId + '/' + token).subscribe((response :any)=> {
      if (response['success'] == true) {

        swal.fire('Correcto', response['message'], 'success');
      } else {

        swal.fire('Correcto', response['message'], 'warning');
      }
    });
  }

}
