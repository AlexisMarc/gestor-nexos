import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationRestService } from './configuration.rest.service';
declare var swal: any

@Injectable({
  providedIn: 'root'
})
export class CreateAnswerService {
  activeVote: any;

  constructor(private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router) {
    this.activeVote = new EventEmitter;
  }

  //Método que crea la votación.
  createAnswer(dataQuestion:any, residential_id:any, iniciada:any, meeting_id:any, keysession:any) {
    dataQuestion.forEach((value:any,key:any) => {
       });
    this.httpClient.post(this.config.endpoint6 + 'api/voting/createVoteOption/' + keysession, dataQuestion)
      .subscribe((data:any) => {
        let iconStatus = 'success';
        let iconStatus2 = 'warning';
        if (data['success'] == true) {
          iconStatus = 'success', 

          // Se envía al usuario al componente que trae el listado de votaciones. (vote-result.components.ts)
          this.router.navigate(['home/interventioncontrol/' + residential_id + '/votaciones/' + residential_id + '/' + meeting_id]), setTimeout(function () {
            window.scrollTo(0, 550);
          }, 100);

          setTimeout(() => { 
            this.activeVote.emit(1);
          }, 100);

          swal.fire('Correcto', data['message'], iconStatus);
        } else {
          if (data['success']) {
            iconStatus2 = 'warning';
          }
          swal.fire('Incorrecto', data['message'], iconStatus2);
        }
      });
  }

  // Servicio que se usa para editar y para cerrar la votación. 
  editAnswer(dataQuestion:any, residential_id:any, status:any, message:any, meeting_id:any, keysession:any) {
    this.httpClient.post(this.config.endpoint6 + 'api/voting/editVoteOption/' + keysession, dataQuestion)
      .subscribe((data:any) => {
        let iconStatus = 'success';
        let iconStatus2 = 'warning';
        if (data['success'] == true) {
          if (data['success']) {
            if (status == '1') {
              swal.fire('Mensaje', data['message'], 'success');
              // Se envía al usuario al componente que trae el listado de votaciones. (vote-result.components.ts)
              this.router.navigate(['home/interventioncontrol/' + residential_id + '/votaciones/' + residential_id + '/' + meeting_id]);
              setTimeout(function () {
                window.scrollTo(0, 550);
              }, 100);
              setTimeout(() => {
                this.activeVote.emit(0);
              }, 100);
            }
            else {
              swal.fire('Mensaje', data['message'], 'success');
              setTimeout(function () {
                window.scrollTo(0, 550);
              }, 100);;
              setTimeout(() => {
                this.activeVote.emit(0);
              }, 100);
            }
          }
        } else {
          if (data['success']) {
            iconStatus2 = 'warning';
          }
          swal.fire('Incorrecto', data['message'], iconStatus2);
        }
      });
  }
}
