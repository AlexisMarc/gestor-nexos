import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import moment from 'moment';
import 'moment/locale/es';
declare var swal: any;



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  profile!: string;
  taskToCreate = '';
  minutesToEndTask = 0;
  hoursToEndTask = 0;
  limitTask = false;
  durationHour = 0;
  durationMin = 0;
  durationSec = 0;
  dateToSearchTaskByDay!: string;
  listTaksDay: any;
  listTasksDefalut: any;
  dateFrom = '';
  dateTo = '';
  currentTimeStamp: any;
  keysession!: string;
  userId!: string;
  //Tarea activa
  taskActiveName = '';
  taskActiveId = '';
  secondsFromBeginActiveTask = 0;
  interval: any;
  interval2: any;
  interval3: any;
  intiTaskActive!: string;

  constructor(

    private router: Router,
    private route: ActivatedRoute,  
     
    private httpClient: HttpClient,
    private config: ConfigurationRestService) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;

    // tslint:disable-next-line: max-line-length
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor' || userStorage['profile'] === 'Asesor' || userStorage['profile'] === 'Moderador' || userStorage['profile'] === 'Soporte telefonico') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      sessionStorage.clear();
      this.router.navigate(['/']);
      return;
    }

    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.profile = userStorage['profile'];
    this.keysession = userStorage['token'];
    this.userId = userStorage['id'];
  }


  ngOnInit() {
    //Obtener el día actual
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hh = today.getHours().toString();
    var ii = today.getMinutes().toString();
    var ss = today.getSeconds().toString();
    var ddstr: string;
    var mmstr: string;
    if (dd < 10) {
      ddstr = '0' + dd;
    } else {
      ddstr = dd.toString();
    }
    if (mm < 10) {
      mmstr = '0' + mm;
    } else {
      mmstr = mm.toString();
    }
    if (parseInt(hh) < 10) {
      hh = '0' + hh;
    } else {
      hh = hh.toString();
    }
    if (parseInt(ii) < 10) {
      ii = '0' + ii;
    } else {
      ii = ii.toString();
    }
    if (parseInt(ss) < 10) {
      ss = '0' + ss;
    } else {
      ss = ss.toString();
    }
    this.dateFrom = yyyy + '-' + mmstr + '-' + ddstr;
    this.currentTimeStamp = yyyy + '-' + mmstr + '-' + ddstr + ' ' + hh + ':' + ii + ':' + ss;

    this.httpClient.get(this.config.endpoint6 + 'api/tasks/getTaskByUser/' + this.keysession + '/' + this.dateFrom + '/' + this.userId).subscribe((response:any) => {
      if (response['success']) {
        this.listTaksDay = response['content']
        this.transformTimeZone(this.listTaksDay)
      }else{
        if (response['message'] == "La sesión es inválida") {
          swal.fire({
            title:'Atención', 
            text:'Su sesión no es valida por favor ingrese de nuevo.', 
            icon:'info',
            backdrop: true,
            allowOutsideClick: false // Aunque se muestre el backdrop, no permitir clics fuera
          }).then((response:any)=>{
            if(response.value){
              sessionStorage.removeItem('user');
              this.router.navigate(['/']);
            }
          })
        }
      }
    });

    //Llamar tarea activa
    this.httpClient.get(this.config.endpoint6 + 'api/tasks/getActiveTaskByUser/' + this.userId + '/' + this.keysession).subscribe((response:any) => {
      if (response['success']) {
        this.taskActiveName = response['content']['description'];
        this.taskActiveId = response['content']['id'];
        var date1 = response['content']['start_task'].replace(/-/g, '/');
        var date2 = this.currentTimeStamp.replace(/-/g, '/');
        this.intiTaskActive = this.transformTimeZone2(response['content']['start_task'].replace(/-/g, '/'))
        // var date1 = response['content']['start_task'].replace(/ /g,'T');
        // var date2 = this.currentTimeStamp.replace(/ /g,'T');
        var diff = Math.abs(+new Date(date1) - +new Date(date2));
        this.secondsFromBeginActiveTask = diff / 1000;
        this.durationHour = Math.floor((this.secondsFromBeginActiveTask / 3600));
        this.durationMin = Math.floor(((this.secondsFromBeginActiveTask / 3600) - Math.floor((this.secondsFromBeginActiveTask / 3600))) * 60);
        this.durationSec = Math.floor((((this.secondsFromBeginActiveTask / 3600) - Math.floor((this.secondsFromBeginActiveTask / 3600))) * 60 - this.durationMin) * 60);



        // var $div = $('div');
        // var a = 0;

        // this.interval = setInterval(function () {
        //   a++;
        //   // $div.stop(true, true).css("left", a);
        //   this.contador();
        // }, 30000 / 30);



        this.interval = setInterval(() =>
          this.contador()
          , 30000 / 30);
      }
    });

    //Llamar listado de tareas predeterminadas
    this.httpClient.get(this.config.endpoint6 + 'api/tasks/getTasks/' + this.keysession).subscribe((response:any) => {
      this.listTasksDefalut = response['content'];
    });
  }

  OnDestroy() {
    clearInterval(this.interval);
    clearInterval(this.interval2);
    clearInterval(this.interval3);
  }

  contador() {
    // this.secondsFromBeginActiveTask ++;
    var timerInterval;
    this.durationSec++;
    if (this.durationSec == 60) {
      this.durationSec = 0;
      this.durationMin++;
      // if (this.durationMin % 30 == 0 && this.durationMin > 0) {
      //   this.notificationDesktop();
      //   swal.fire({
      //     text: "Han pasado 30 minutos desde la ultima verificación, ¿Continuá haciendo esta tarea?",
      //     icon: 'question',
      //     showCancelButton: false,
      //     confirmButtonColor: '#e56e22',
      //     confirmButtonText: 'Si',
      //     showDenyButton: true,
      //     denyButtonColor: '#262626',
      //     denyButtonText: 'No',
      //     timer: 300000,
      //     timerProgressBar: true,
      //     onBeforeOpen: () => {
      //       swal.showLoading()
      //       timerInterval = setInterval(() => {
      //         swal.getHtmlContainer().querySelector('strong')
      //           .textContent = swal.getTimerLeft()
      //       }, 1000)
      //     },
      //     onClose: () => {
      //       clearInterval(timerInterval)
      //     }
      //   }).then((result) => {
      //     if (result.isDenied) {
      //       this.endTask();
      //     }
      //     if (result.dismiss === swal.DismissReason.timer) {
      //       this.endTask();
      //     }
      //   })
      // }
      if (this.durationMin == 60) {
        this.durationMin = 0;
        this.durationHour++;
      }
    }
  }

  goToUserActive() {
    this.router.navigate(['/home/usuariosActivos']);
  }


  goToSearchUser() {
    this.router.navigate(['/home/buscarTareasPorUsuario']);
  }

  createTask() {
    if (this.taskToCreate == '' || this.taskToCreate == null || this.taskToCreate == undefined) {
      swal.fire(
        '',
        'Debe diligenciar la tarea que va a realizar',
        'warning'
      )
    } else {
      //Si exite tarea activa cerrarla
      if (this.taskActiveId != '') {
        var formData = new FormData;
        var arrayDataTask2 = {
          "id": this.taskActiveId,
          "status_task": "0",
        }
        var dataTaskToSend = JSON.stringify(arrayDataTask2);
        formData.append("task", dataTaskToSend);
        this.httpClient.post(this.config.endpoint6 + 'api/tasks/storeTask/' + this.keysession, formData).subscribe((resp) => {
          this.getListTaskByDay();
        });
      }
      //Crear nueva tarea
      var no_time: string;
      if (this.limitTask) {
        no_time = "1";
      } else {
        no_time = "0";
      }
      var formData = new FormData;
      var arrayDataTask = {
        "id": "0",
        "description": this.taskToCreate,
        "user_id": this.userId,
        "no_time": no_time,
        "status_task": "1",
      }
      var dataTaskToSend = JSON.stringify(arrayDataTask)
      formData.append("task", dataTaskToSend)
      this.httpClient.post(this.config.endpoint6 + 'api/tasks/storeTask/' + this.keysession, formData).subscribe((resp:any) => {
        if (resp['success']) {
          this.secondsFromBeginActiveTask = 0;
          this.durationHour = 0;
          this.durationMin = 0;
          this.durationSec = 0;
          this.taskToCreate = '';
          clearInterval(this.interval);
          clearInterval(this.interval2);
          clearInterval(this.interval3);
          this.getActiveTask();
          this.getListTaskByDay();
          // this.initCounterTime(1800000, true);
          if (this.minutesToEndTask > 0 || this.hoursToEndTask > 0) {
            var totalseconds = (this.hoursToEndTask * 3600000) + (this.minutesToEndTask * 60000)
            this.initCounterTime(totalseconds, false);
            this.minutesToEndTask = 0;
            this.hoursToEndTask = 0;
          } else {
            this.minutesToEndTask = 0;
            this.hoursToEndTask = 0;
          }
        }
      });
    }
  }

  endTask() {
    if (this.taskActiveId != '') {
      var no_time = "0";
      if (this.limitTask) {
        no_time = "1";
      } else {
        no_time = "0";
      }
      var formData = new FormData;
      var arrayDataTask = {
        "id": this.taskActiveId,
        "description": this.taskActiveName,
        "status_task": "0",
      }
      var dataTaskToSend = JSON.stringify(arrayDataTask)
      formData.append("task", dataTaskToSend)
      this.httpClient.post(this.config.endpoint6 + 'api/tasks/storeTask/' + this.keysession, formData).subscribe((resp:any) => {
        if (resp['success']) {
          clearInterval(this.interval);
          clearInterval(this.interval2);
          clearInterval(this.interval3);
          this.getActiveTask();
          this.getListTaskByDay();
          this.secondsFromBeginActiveTask = 0;
          this.durationHour = 0;
          this.durationMin = 0;
          this.durationSec = 0;
          this.taskToCreate = '';
          this.taskActiveId = '';
          this.taskActiveName = '';
          this.minutesToEndTask = 0;
          this.hoursToEndTask = 0;
        }
      });
    }
  }

  getListTaskByDay() {
    this.listTaksDay = [];
    var queryToSearch = this.config.endpoint6 + 'api/tasks/getTaskByUser/' + this.keysession + '/' + this.dateFrom + '/' + this.userId;
    if (this.dateFrom == this.dateTo || this.dateTo == '') {
      queryToSearch = this.config.endpoint6 + 'api/tasks/getTaskByUser/' + this.keysession + '/' + this.dateFrom + '/' + this.userId;
    } else {
      queryToSearch = this.config.endpoint6 + 'api/tasks/getTaskByUser/' + this.keysession + '/' + this.dateFrom + '/' + this.userId + '/' + this.dateTo
    }
    this.httpClient.get(queryToSearch).subscribe((response:any) => {
      if (response['success']) {
        this.listTaksDay = response['content']
        this.transformTimeZone(this.listTaksDay)

        
      }
    });
  }

  getActiveTask() {
    this.httpClient.get(this.config.endpoint6 + 'api/tasks/getActiveTaskByUser/' + this.userId + '/' + this.keysession).subscribe((response:any) => {
      if (response['success']) {
        this.taskActiveName = response['content']['description'];
        this.taskActiveId = response['content']['id'];
        var date1 = response['content']['start_task'].replace(/-/g, '/');
        var date2 = this.currentTimeStamp.replace(/-/g, '/');
        this.intiTaskActive = this.transformTimeZone2(response['content']['start_task'].replace(/-/g, '/'))
        var diff = Math.abs(+new Date(date1) - +new Date(date2));
        this.secondsFromBeginActiveTask = diff / 1000;
        // this.interval = setInterval(() => this.contador(), 1000);
      }
    });
  }

  initCounterTime(intervalTime:any, repeatInterval:any) {
    var timerInterval:any;
    // if (repeatInterval) {
    //   this.interval2 = setInterval(() => {
    //     this.notificationDesktop();
    //     swal.fire({
    //       text: "Han pasado 30 minutos desde la ultima verificación, ¿Continuá haciendo esta tarea?",
    //       icon: 'question',
    //       showCancelButton: false,
    //       confirmButtonColor: '#e56e22',
    //       confirmButtonText: 'Si',
    //       showDenyButton: true,
    //       denyButtonColor: '#262626',
    //       denyButtonText: 'No',
    //       timer: 300000,
    //       timerProgressBar: true,
    //       onBeforeOpen: () => {
    //         swal.showLoading()
    //         timerInterval = setInterval(() => {
    //           swal.getHtmlContainer().querySelector('strong')
    //             .textContent = swal.getTimerLeft()
    //         }, 1000)
    //       },
    //       onClose: () => {
    //         clearInterval(timerInterval)
    //       }
    //     }).then((result) => {
    //       if (result.isDenied) {
    //         this.endTask();
    //       }
    //       if (result.dismiss === swal.DismissReason.timer) {
    //         this.endTask();
    //       }
    //     })
    //   }
    //     , intervalTime);
    // } else {
    this.interval3 = setTimeout(() => {
      this.notificationDesktop();
      swal.fire({
        text: "Se ha completado el tiempo estimado para realizar esta tarea, ¿Continuá haciendo esta tarea?",
        icon: 'question',
        showCancelButton: false,
        confirmButtonColor: '#e56e22',
        confirmButtonText: 'Si',
        showDenyButton: true,
        denyButtonColor: '#262626',
        denyButtonText: 'No',
        timer: 300000,
        timerProgressBar: true,
        onBeforeOpen: () => {
          swal.showLoading()
          timerInterval = setInterval(() => {
            swal.getHtmlContainer().querySelector('strong')
              .textContent = swal.getTimerLeft()
          }, 1000)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result:any) => {
        if (result.isDenied) {
          this.endTask();
        }
        if (result.dismiss === swal.DismissReason.timer) {
          this.endTask();
        }
      })
    }, intervalTime);
    // }
  }

  notificationDesktop() {
    if (Notification.permission !== 'granted')
      Notification.requestPermission();
    else {
      var notification = new Notification('GRUPO EMPRESARIAL NEXOS', {
        icon: 'https://votacioneselectronicas.com.co/images/logo_nexos.png',
        body: 'Debes verificar el trabajo ve a tu sistema de tareas',
      });
      // notification.onclick = function () {
      //   window.open('http://stackoverflow.com/a/13328397/1269037');
      // };
    }
  }

  transformTimeZone(dateToTransform:any) {
    let rest_hour = 1000*60*60*5
    dateToTransform.forEach((element:any) => {
      if(element.start_task != null){
        let dateToBack = Date.parse(element.start_task)
        let actualDate = dateToBack - rest_hour
        let datetransformed = moment(actualDate)
        let dateFormate = datetransformed.format('LLL:s')
        element.start_task = dateFormate
      }
      if(element.end_task != null){
        let dateToBack2 = Date.parse(element.end_task)
        let actualDate2 = dateToBack2 - rest_hour
        let datetransformed2 = moment(actualDate2)
        let dateFormate2 = datetransformed2.format('LLL:s')
        element.end_task = dateFormate2
      }      
    });
  }

  transformTimeZone2(dateToTransform:any){
    let rest_hour = 1000*60*60*5
    let dateToBack = Date.parse(dateToTransform)
    let actualDate = dateToBack - rest_hour
    let datetransformed = moment(actualDate)
    let dateFormate = datetransformed.format('LLLL:s')
    return dateFormate;
  }

}