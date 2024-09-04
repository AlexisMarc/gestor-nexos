import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { ConfigurationRestService } from '../../service/configuration.rest.service';
declare var swal: any;

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  idTask!: string;
  description = '';
  start_task = '';
  end_task = '';
  duration = '';
  profile!: string;
  keysession!: string;
  userId!: string;
  user_name!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,  
     
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
    this.userId = userStorage['id'];
    this.idTask = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.httpClient.get(this.config.endpoint6 + 'ApiTasks/getTaskById/' + this.keysession + '/' + this.idTask).subscribe((response:any) => {
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
    this.httpClient.post(this.config.endpoint6 + 'api/tasks/storeTask/' + this.keysession, formData).subscribe((resp:any) => {
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
