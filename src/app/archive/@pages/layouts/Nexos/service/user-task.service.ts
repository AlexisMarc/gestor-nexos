import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from './configuration.rest.service';
import swal from 'sweetalert2';
import { EnvServiceService } from '@env';

@Injectable({
  providedIn: 'root'
})
export class UserTaskService {
  private _env = inject(EnvServiceService)
  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router
  ) { }

  createOrEditTask(data:any, token:any) {
    this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/tasks/storeTask/' + token, data).subscribe((response :any)=> {
      if (response['success'] == true) {

        swal.fire('Correcto', response['message'], 'success');
      } else {

        swal.fire('Correcto', response['message'], 'warning');
      }

    });
  }

  getTasksByUser(userId:any, date:any, token:any) {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ApiTasks/getTaskByUser/' + userId + '/' + date + '/' + token).subscribe((response :any)=> {
      if (response['success'] == true) {

        swal.fire('Correcto', response['message'], 'success');
      } else {

        swal.fire('Correcto', response['message'], 'warning');
      }

    });
  }

  getTaskToday(token:any) {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'api/tasks/getActiveTaskList/' + token).subscribe((response :any)=> {
      if (response['success'] == true) {

        swal.fire('Correcto', response['message'], 'success');
      } else {

        swal.fire('Correcto', response['message'], 'warning');
      }

    });
  }

  getTaskDefault(token:any) {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'api/tasks/getTasks/' + token).subscribe((response :any)=> {
      if (response['success'] == true) {

        swal.fire('Correcto', response['message'], 'success');
      } else {

        swal.fire('Correcto', response['message'], 'warning');
      }

    });
  }

  getTaskDetails(userId:any, token:any) {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'api/tasks/getActiveTaskByUser/' + userId + '/' + token).subscribe((response :any)=> {
      if (response['success'] == true) {

        swal.fire('Correcto', response['message'], 'success');
      } else {

        swal.fire('Correcto', response['message'], 'warning');
      }
    });
  }

}
