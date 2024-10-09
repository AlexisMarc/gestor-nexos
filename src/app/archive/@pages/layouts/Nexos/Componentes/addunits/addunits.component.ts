import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { listadoUnidad } from '../../interface/listadounidad';
import Swal from 'sweetalert2';
import { listadoUnidadEnvio } from '../../interface/listadounidadenvio';
import { AddunitserviceService } from '../../service/addunitservice.service';
import swal from 'sweetalert2';
import { SendmailService } from '../../service/sendmail.service';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-addunits',
  templateUrl: './addunits.component.html',
  styleUrls: ['./addunits.component.scss'],
})
export class AddunitsComponent implements OnInit {
  private _env = inject(EnvServiceService)
  residential_id!: string;
  document_number: any;
  customer_id!: string;
  customer_id_send!: string;
  listadoUnidad: any = [];
  listadoUnidadData: any = [];
  ListadoConjuntosSelect: [] = [];
  ListadoConjuntosSelect2: [] = [];
  ListadoUnidades: [] = [];
  sector!: string;
  name_unidad!: string;
  int: any = 'value';
  int2: any = 'value';
  id_sector_search: any = 'value';
  unidadesOk = false;
  id_unit_add = 'value';
  id_unit_search = 'value';
  add_unit_text!: string;
  show_components = 0;
  id_unidad_envio: listadoUnidadEnvio[] = [];
  nameRegister!: string;
  name!: string;
  residential_name!: string;
  moroso!: string;
  meeting_id!: string;
  token = '';
  user_id!: string;
  customer_email!: string;
  keysession!: string;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
    private addUnitservice: AddunitserviceService,
    private sendmailService: SendmailService
  ) {
    const userStorage: any = JSON.parse(sessionStorage.getItem('user')!)!;

    // tslint:disable-next-line: max-line-length
    if (
      userStorage['profile'] === 'Super Usuario' ||
      userStorage['profile'] === 'Supervisor'
    ) {
    } else {
      swal.fire(
        'Atención',
        'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia',
        'error'
      );
      this.router.navigate(['/home/pointControl']);
      return;
    }
    if (
      userStorage === null ||
      userStorage === 'null' ||
      userStorage === undefined ||
      userStorage === 'undefined' ||
      userStorage === '' ||
      userStorage['status_id'] === 0
    ) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.residential_id = this.route.snapshot.paramMap.get('idResidential')!;
    this.user_id = userStorage['id'];
    this.keysession = userStorage['token'];
    this.httpClient
      .get(
        this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO +
          'PreRegisterMeetingServices/getMeetingDetails?key=' +
          this._env.SECRET_KEY +
          '&residential_id=' +
          this.residential_id
      )
      .subscribe((resp: any) => {
        this.residential_name = resp['content']['name'];
        this.meeting_id = resp['content']['id'];
      });
    this.httpClient
      .get(
        this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO +
          'AppServices/getBuildingsUnitByResidential?key=' +
          this._env.SECRET_KEY +
          '&user_id=' +
          this.customer_id +
          '&residential_id=' +
          this.residential_id
      )
      .subscribe((resp4: any) => {
        this.ListadoConjuntosSelect = resp4['content'];
        this.ListadoConjuntosSelect2 = resp4['content'];
        if (resp4['success'] === true) {
          this.sector = resp4['content'][0]['name'];
        } else {
          this.sector = 'Sector';
        }
        if (resp4['success'] === true) {
          this.name_unidad = resp4['content'][0]['units'][0]['name'];
        } else {
          this.name_unidad = 'Unidad';
        }
      });
  }

  ngOnInit() {}

  getCustomerDetails() {
    this.listadoUnidad = [];
    this.httpClient
      .get(
        this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO +
          'ResidentServices/getResidentByDocumentNumber?key=' +
          this._env.SECRET_KEY +
          '&document_number=' +
          this.document_number
      )
      .subscribe((resp: any) => {
        if (resp['success'] === true) {
          this.show_components = 1;
          this.nameRegister = resp['content']['nameRegister'];
          this.name = resp['content']['name'];
          this.customer_email = resp['content']['email'];
        }
        this.customer_id = resp['content']['id'];
        this.customer_id_send = resp['content']['id'];
        this.httpClient
          .get(
            this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO +
              'ResidentialServices/getCustomerProperties?key=' +
              this._env.SECRET_KEY +
              '&user_id=' +
              this.customer_id +
              '&residential_id=' +
              this.residential_id
          )
          .subscribe((resp2: any) => {
            this.listadoUnidadData = resp2['content']['properties'];
            this.moroso = resp2['content']['moroso'];
            for (
              let index = 0;
              index < this.listadoUnidadData.length;
              index++
            ) {
              let unidad = new listadoUnidad(
                this.listadoUnidadData[index]['building_name'],
                this.listadoUnidadData[index]['building_number'],
                this.listadoUnidadData[index]['unit_name'],
                this.listadoUnidadData[index]['unit_number'],
                this.listadoUnidadData[index]['unit_id'],
                this.listadoUnidadData[index]['total_users']
              );
              this.listadoUnidad.push(unidad);
            }
            this.httpClient
              .get(
                this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO +
                  'CustomerRegistrationServices/getEntryTokenByCustomerByMeeting?key=' +
                  this._env.SECRET_KEY +
                  '&customer_id=' +
                  this.customer_id +
                  '&meeting_id=' +
                  this.meeting_id
              )
              .subscribe((resp3: any) => {
                this.token = resp3['content'];
              });
          });
      });
  }

  cambio() {
    if (this.int2 == 'value') {
      this.id_unit_add = 'value';
      this.unidadesOk = true;
    } else {
      this.ListadoUnidades = this.ListadoConjuntosSelect[this.int2]['units'];
      this.int = this.ListadoConjuntosSelect[this.int2]['number'];
      this.unidadesOk = true;
      this.id_unit_add = 'value';
    }
  }

  cambio2() {
    if (this.id_sector_search == 'value') {
      this.id_unit_add = 'value';
      this.unidadesOk = true;
    } else {
      this.ListadoUnidades =
        this.ListadoConjuntosSelect2[this.id_sector_search]['units'];
      this.int = this.ListadoConjuntosSelect2[this.id_sector_search]['number'];
      this.unidadesOk = true;
      this.id_unit_search = 'value';
    }
  }

  addUnit() {
    if (this.int == 'value' || this.id_unit_add == 'value') {
      Swal.fire({
        title: '<strong>Advertencia</strong>',
        icon: 'warning',
        html: 'Seleccione la torre y la unidad',
        showCloseButton: true,
        showCancelButton: false,
        cancelButtonText: '<i class="fa fa-thumbs-down"></i> OK',
      });
    } else {
      let var2 = this.id_unit_add.split(' ', 3);
      if (var2[2] == '0') {
        this.add_unit_text =
          'que desea agregar esta unidad<br>Unidad: ' +
          this.int +
          ' - ' +
          var2[1];
      } else {
        this.add_unit_text =
          'que desea agregar esta unidad<br>Unidad: ' +
          this.int +
          ' - ' +
          var2[1] +
          '<br> La cual ya tiene asignado un propietario ';
      }
      Swal.fire({
        title: '<strong>Esta Seguro</strong>',
        icon: 'question',
        html: this.add_unit_text,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Si',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i> No',
      }).then((result) => {
        if (result.value) {
          let unidad = new listadoUnidad(
            this.sector,
            this.int,
            this.name_unidad,
            var2[1],
            var2[0],
            0
          );
          this.listadoUnidad.push(unidad);
          this.int2 = 'value';
          this.int = null;
          this.id_unit_add = 'value';
        }
      });
    }
  }

  saveChanges() {
    let unidades = '';
    for (let index = 0; index < this.listadoUnidad.length; index++) {
      let new_unit = new listadoUnidadEnvio(
        this.listadoUnidad[index]['id_unidad']
      );
      this.id_unidad_envio.push(new_unit);
    }
    unidades = JSON.stringify(this.id_unidad_envio);

    const formData = new FormData();
    formData.append('key', this._env.SECRET_KEY);
    formData.append('id', this.customer_id);
    formData.append('nameRegister', this.nameRegister);
    formData.append('email', this.customer_email);
    formData.append('moroso', this.moroso);

    const formData2 = new FormData();
    formData2.append('units', unidades);
    this.addUnitservice.addUnits(
      formData2,
      formData,
      this.keysession,
      this.customer_id,
      this.meeting_id
    );
    this.document_number = '';
    this.customer_id = '';
    this.listadoUnidad = [];
    this.id_unidad_envio = [];
    this.show_components = 0;
    this.name = '';
    this.nameRegister = '';
    this.id_unit_add = 'value';
    this.id_unit_search = 'value';
    this.int2 = 'value';
    this.id_sector_search = 'value';
    this.customer_email = '';
  }

  deleteUnit(i: any) {
    this.listadoUnidad.splice(i, 1);
  }

  goHome() {
    this.router.navigate(['home/']);
  }
  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }
  goPointContrpl(residential_id: any) {
    this.router.navigate(['home/pointControlMeeting/' + residential_id]);
  }
  goSearchPointControl() {
    this.router.navigate(['home/pointControl']);
  }
  goBack() {
    this.router.navigate(['home/pointControlMeeting/' + this.residential_id]);
  }

  enableLogin() {
    const formData2 = new FormData();
    formData2.append('key', this._env.SECRET_KEY);
    formData2.append('is_online', '0');
    formData2.append('document_number', this.document_number);
    formData2.append('token', this.token);
    this.httpClient
      .post(
        this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO +
          'CustomerRegistrationServices/updateUserSignInStatus',
        formData2
      )
      .subscribe((user) => {});
  }

  enableUserAndChagePass() {
    Swal.fire({
      title: '<strong>Esta Seguro de expulsar este usuario</strong>',
      icon: 'question',
      html: this.add_unit_text,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Si',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i> No',
    }).then((result) => {
      if (result.value) {
        const formData3 = new FormData();
        formData3.append('key', this._env.SECRET_KEY);
        formData3.append('customer_id', this.customer_id_send);
        formData3.append('meeting_id', this.meeting_id);
        formData3.append('user_id', this.user_id);
        this.httpClient
          .post(
            this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ApiQrPresence/deleteCustomerFromAttendance',
            formData3
          )
          .subscribe((resp2) => {
            const formData2 = new FormData();
            formData2.append('key', this._env.SECRET_KEY);
            formData2.append('id', this.customer_id);
            formData2.append('status_id', '0');

            this.addUnitservice.editUserData(formData2);
          });
      }
    });
  }

  selectedUser() {
    this.httpClient
      .get(
        this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO +
          'ResidentServices/getResidentByUnitNumber?key=' +
          this._env.SECRET_KEY +
          '&unit_id=' +
          this.id_unit_search
      )
      .subscribe((resp: any) => {
        this.document_number = resp['content']['document_number'];
        this.getCustomerDetails();
      });
  }

  sendCustomerEmail() {
    this.sendmailService.SendMailServiceByUnit(
      this.keysession,
      this.customer_id_send,
      this.meeting_id
    );
  }

  getCustomerDetails2() {
    this.listadoUnidad = [];
    this.httpClient
      .get(
        this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO +
          'ResidentServices/getResidentByDocumentNumber?key=' +
          this._env.SECRET_KEY +
          '&document_number=' +
          this.document_number
      )
      .subscribe((resp: any) => {
        if (resp['success'] === true) {
          this.show_components = 1;
          this.nameRegister = resp['content']['nameRegister'];
          this.name = resp['content']['name'];
        }
        this.customer_id = resp['content']['id'];
        this.customer_id_send = resp['content']['id'];
        this.httpClient
          .get(
            this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO +
              'ResidentialServices/getCustomerProperties?key=' +
              this._env.SECRET_KEY +
              '&user_id=' +
              this.customer_id +
              '&residential_id=' +
              this.residential_id
          )
          .subscribe((resp2: any) => {
            this.listadoUnidadData = resp2['content']['properties'];
            this.moroso = resp2['content']['moroso'];
            for (
              let index = 0;
              index < this.listadoUnidadData.length;
              index++
            ) {
              let unidad = new listadoUnidad(
                this.listadoUnidadData[index]['building_name'],
                this.listadoUnidadData[index]['building_number'],
                this.listadoUnidadData[index]['unit_name'],
                this.listadoUnidadData[index]['unit_number'],
                this.listadoUnidadData[index]['unit_id'],
                this.listadoUnidadData[index]['total_users']
              );
              this.listadoUnidad.push(unidad);
            }
            this.httpClient
              .get(
                this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO +
                  'CustomerRegistrationServices/getEntryTokenByCustomerByMeeting?key=' +
                  this._env.SECRET_KEY +
                  '&customer_id=' +
                  this.customer_id +
                  '&meeting_id=' +
                  this.meeting_id
              )
              .subscribe((resp3: any) => {
                this.token = resp3['content'];
              });
          });
      });
  }
}
