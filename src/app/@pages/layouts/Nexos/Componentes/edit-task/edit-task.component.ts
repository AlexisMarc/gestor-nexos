import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
declare var swal: any;

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  idTask: string;
  description = '';
  start_task = '';
  end_task = '';
  duration = '';
  profile: string;
  keysession: string;
  userId: string;
  user_name: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute, @Inject(SESSION_STORAGE)
    private storage: WebStorageService,
    private httpClient: HttpClient,
    private config: ConfigurationRestService) {
    const userStorage = this.storage.get('user');
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor' || userStorage['content']['profile'] === 'Asesor' || userStorage['content']['profile'] === 'Moderador' || userStorage['content']['profile'] === 'Soporte telefonico') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      sessionStorage.clear();
      this.router.navigate(['/']);
      return;
    }
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['content']['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.profile = userStorage['content']['profile'];
    this.keysession = userStorage['content']['token'];
    this.userId = userStorage['content']['id'];
    this.idTask = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.httpClient.get(this.config.endpoint6 + 'ApiTasks/getTaskById/' + this.keysession + '/' + this.idTask).subscribe((response) => {
      if (response['success']) {
        this.user_name = response['content']['user_name']
        this.description = response['content']['description'];
        this.start_task = response['content']['start_task'];
        this.end_task = response['content']['end_task'];
        this.duration = response['content']['duration'];
      }
    });
  }

  editTask() {
    var formData = new FormData;
    var arrayDataTask2 = {
      "id": this.idTask,
      "description": this.description,
      "start_task": this.start_task,
      "end_task": this.end_task,
      "duration": this.duration
    }
    var dataTaskToSend = JSON.stringify(arrayDataTask2);
    formData.append("task", dataTaskToSend);
    this.httpClient.post(this.config.endpoint6 + 'api/tasks/storeTask/' + this.keysession, formData).subscribe((resp) => {
      if (resp['success']) {
        swal.fire('Mensaje', 'Se ha editado la información de manera exitosa', 'success');
        this.return();
      } else {
        swal.fire('Atención', 'No se pudo completar su solicitud', 'error');
      }
    });
  }

  return() {
    this.router.navigate(['/home/buscarTareasPorUsuario']);
  }

}
