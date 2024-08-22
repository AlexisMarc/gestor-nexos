import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-visado',
  templateUrl: './visado.component.html',
  styleUrls: ['./visado.component.scss']
})
export class VisadoComponent implements OnInit {

  residential_id: string;
  user_id: string;
  listado_visado = [];
  texto = '';

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute, @Inject(SESSION_STORAGE)
    private storage: WebStorageService
  ) {
    const userStorage = this.storage.get('user');
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }
    if (userStorage == null || userStorage === undefined || userStorage === '') {
      this.storage.remove('user');
      this.router.navigate(['/']);
    } else {
      this.user_id = userStorage['content']['id'];
    }
    this.residential_id = this.route.snapshot.paramMap.get('id');
    // this.residential_id = this.route.snapshot.paramMap.get('idResidential');
    // tslint:disable-next-line: max-line-length
    this.httpClient.get(this.config.endpoint3 + 'ResidentialServices/getPreregisterLogByResidential?key=' + this.config.key + '&user_id=' + this.user_id + '&residential_id=' + this.residential_id)
      .subscribe(resp => {
        // tslint:disable-next-line: max-line-length
        this.listado_visado = resp['content'];
        for (let index = 0; index < this.listado_visado.length; index++) {
          this.texto = this.texto + '<hr>'+'Visado no: ' + this.listado_visado[index]['id'] +
          '<br>' +
          'Nombre: ' + this.listado_visado[index]['customer_name'] +
          '<br>' +
          'Id accionista:' + this.listado_visado[index]['documentRegister'] +
          '<br>'+
          'correo electronico: ' + this.listado_visado[index]['email'] +
          '<br>' +
          'telefono: ' + this.listado_visado[index]['phone1'] +
          '<br>' +
          'Descripcion:' + this.listado_visado[index]['description'] + '<hr>'
          
        }
      });
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['home/']);
  }
  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }
  goPointContrpl(residential_id) {
    this.router.navigate(['home/pointControlMeeting/' + residential_id])
  }
  goSearchPointContrpl() {
    this.router.navigate(['home/pointControl']);
  }
  goBack() {
    this.router.navigate(['home/pointControlMeeting/' + this.residential_id]);
  }

}
