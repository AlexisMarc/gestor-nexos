import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { StoreMeetingService } from '../../service/store-meeting.service';
import swal from 'sweetalert2';
import { Customer } from '../../interface/customer.model';
import { SendmailService } from '../../service/sendmail.service';
import { listadoUnidad } from '../../interface/listadounidad';
import { listadoUnidadEnvio } from '../../interface/listadounidadenvio';
import { AddunitserviceService } from '../../service/addunitservice.service';

@Component({
  selector: 'app-update-data-base',
  templateUrl: './update-data-base.component.html',
  styleUrls: ['./update-data-base.component.scss']
})
export class UpdateDataBaseComponent implements OnInit {

  residential_id: string;
  EmailSearch = '';
  user_id: string;
  users: Customer[] = [];
  ListadoConjuntosSelect: [] = [];
  ListadoConjuntosSelect2: [] = [];
  sector: string;
  ListadoUnidades2: [] = [];
  name_unidad: string;
  int = 'value';
  int2 = 'value';
  unidadesOk = false;
  id_unit_add = 'value';
  ListadoUnidades: [] = [];
  add_unit_text: string;
  listadoUnidad: listadoUnidad[] = [];
  listadoUnidad_nuevo_usuario: listadoUnidad[] = [];
  id_unidad_envio: listadoUnidadEnvio[] = [];
  ningun_usuario_del_residential = 0;
  show_components = 1;
  profile: string;
  keysession: string;
  meeting_id: any;
  token: string;
  messageIfNotResultsOfSearch = '';

  constructor(private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
    private storeMeeting: StoreMeetingService, @Inject(SESSION_STORAGE)
    private storage: WebStorageService,
    private sendmailService: SendmailService,
    private addUnitservice: AddunitserviceService) {
    const userStorage = this.storage.get('user');
    this.user_id = userStorage['content']['id'];
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor' || userStorage['content']['profile'] === 'Moderador') {
      this.profile = userStorage['content']['profile'];
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;
    }
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['content']['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.token = userStorage['content']['token'];
    this.residential_id = this.route.snapshot.paramMap.get('idResidential');
    this.keysession = userStorage['content']['token'];
    this.httpClient.get(this.config.endpoint3 + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this.config.key + '&residential_id=' + this.residential_id)
      .subscribe(resp => {
        this.meeting_id = resp['content']['id'];
      });
  }

  ngOnInit() {
  }

  searchByEmail() {
    this.listadoUnidad_nuevo_usuario = [];
    this.id_unidad_envio = [];
    this.users = [];
    this.messageIfNotResultsOfSearch = '';
    this.httpClient.get(this.config.endpoint6 + 'api/customers/getCustomerRecordsByEmail/' + this.keysession + '/' + this.EmailSearch + '/' + this.meeting_id)
      .subscribe(resp1 => {
        if (resp1['success'] == true) {
          for (let index = 0; index < resp1['content'].length; index++) {
            this.getSectors(resp1['content'][index]['id']);
            const item = new Customer(
              resp1['content'][index]['id'],
              resp1['content'][index]['name'],
              resp1['content'][index]['nameRegister'],
              resp1['content'][index]['document_number'],
              resp1['content'][index]['email'],
              resp1['content'][index]['email'],
              resp1['content'][index]['email2'],
              resp1['content'][index]['email3'],
              resp1['content'][index]['email4'],
              resp1['content'][index]['moroso'].toString(),
              resp1['content'][index]['is_observer'].toString(),
              resp1['content'][index]['speaker'].toString(),
            );
            this.users.push(item);
            //Trae las unidades
            this.listadoUnidad = [];
            this.httpClient.get(this.config.endpoint6 + 'api/customers/getCustomerDetails/' + this.keysession + '/' + resp1['content'][index]['document_number'] + '/' + this.meeting_id)
              .subscribe(resp2 => {
                for (let index2 = 0; index2 < resp2['content']['units'].length; index2++) {
                  let unidad = new listadoUnidad(resp2['content']['units'][index2]['building_name'], resp2['content']['units'][index2]['building_number'],
                    resp2['content']['units'][index2]['unit_name'], resp2['content']['units'][index2]['unit_number'], resp2['content']['units'][index2]['unit_id'],
                    resp2['content']['units'][index2]['total_users'])
                  this.users[index].units.push(unidad)
                }
              });
            //Fin traer unidades
          }
        } else {
          this.messageIfNotResultsOfSearch = 'No se encontraron resultados para: ' + this.EmailSearch;
        }
      });
  }

  getSectors(customer_id) {
    //Obtener los sectores
    this.httpClient.get(this.config.endpoint6 + 'api/units/getBuildingsUnitByUserByMeeting/' + this.token + '/' + this.meeting_id)
      .subscribe(resp4 => {
        this.ListadoConjuntosSelect = resp4['content'];
        this.ListadoConjuntosSelect2 = resp4['content']
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

  cambio() {
    if (this.int2 == 'value') {
      this.id_unit_add = 'value';
      this.unidadesOk = true;
    }
    else {
      this.ListadoUnidades = this.ListadoConjuntosSelect[this.int2]['units'];
      this.int = this.ListadoConjuntosSelect[this.int2]['number'];
      this.unidadesOk = true;
      this.id_unit_add = 'value';
    }
  }

  addUnit(index) {
    if (this.int == 'value' || this.id_unit_add == 'value') {
      swal.fire({
        title: '<strong>Advertencia</strong>',
        type: 'warning',
        html:
          'Seleccione la torre y la unidad',
        showCloseButton: true,
        showCancelButton: false,
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> OK',
      })
    }
    else {
      let var2 = this.id_unit_add.split(' ', 3);
      if (var2[2] == '0') {
        this.add_unit_text = 'que desea agregar esta unidad<br>Unidad: ' + this.int + ' - ' + var2[1]
      }
      else {
        this.add_unit_text = 'que desea agregar esta unidad<br>Unidad: ' + this.int + ' - ' + var2[1] + '<br> La cual ya tiene asignado un propietario '
      }
      swal.fire({
        title: '<strong>Esta Seguro</strong>',
        type: 'question',
        html:
          this.add_unit_text,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Si',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> No',

      })
        .then((result) => {
          if (result.value) {
            let unidad = new listadoUnidad(this.sector, this.int, this.name_unidad, var2[1], var2[0], 0);
            this.users[index].units.push(unidad);
            this.int2 = 'value';
            this.int = null;
            this.id_unit_add = 'value';
          }
        });
    }
  }

  sendCustomerEmail(customer_id_send) {
    this.sendmailService.SendMailServiceByUnit(this.keysession, customer_id_send, this.meeting_id);
  }


  saveChanges(index_user, customer_id, email_1, nameRegister, moroso, unitsActualUser, is_speaker, is_observer, email_2, email_3, email_4, name) {
    this.ningun_usuario_del_residential = 0;
    this.listadoUnidad_nuevo_usuario = [];
    this.id_unidad_envio = [];
    let unidades = '';
    if (email_1 == this.users[index_user].email_1_copy) {
      // swal.fire('no cambio');
      for (let index = 0; index < this.users[index_user].units.length; index++) {
        let new_unit = new listadoUnidadEnvio(this.users[index_user].units[index]['id_unidad'])
        this.id_unidad_envio.push(new_unit);
      }
      unidades = JSON.stringify(this.id_unidad_envio)
      const formData = new FormData();
      formData.append('key', this.config.key);
      formData.append('id', customer_id)
      formData.append('nameRegister', nameRegister);
      formData.append('email', email_1);
      formData.append('name', name);
      formData.append('email2', email_2);
      formData.append('email3', email_3);
      formData.append('email4', email_4);
      formData.append('moroso', moroso);
      const formData2 = new FormData();
      // formData2.append('key', this.config.key);
      // formData2.append('user_id', customer_id);
      // formData2.append('residential_id', this.residential_id);
      // formData2.append('agents', '[]');
      formData2.append('units', unidades);
      this.addUnitservice.addUnits(formData2, formData, this.keysession, customer_id, this.meeting_id);
    }
    else {
      //Buscar si existe el usuario del nuevo correo
      this.httpClient.get(this.config.endpoint + 'ResidentialServices/getCustomerRecordsByEmail?key=' + this.config.key + '&user_id=' + this.user_id + '&email=' + email_1)
        .subscribe(resp1 => {
          //1. Si existe el usuario
          if (resp1['success'] == true) {
            for (let index = 0; index < resp1['content'].length; index++) {
              //Buscar si el usuario del nuevo correo pertenece al reisdential
              this.httpClient.get(this.config.endpoint3 + 'ResidentialServices/getCustomerProperties?key=' + this.config.key + '&user_id=' + resp1['content'][index]['id'] + '&residential_id=' + this.residential_id)
                .subscribe(resp2 => {
                  //2. Si el usuario del nuevo correo pertence a ese residential
                  if (resp2['content']['properties'].length > 0) {
                    this.ningun_usuario_del_residential = 1;
                    for (let index2 = 0; index2 < resp2['content']['properties'].length; index2++) {
                      let unidad = new listadoUnidad(resp2['content']['properties'][index2]['building_name'], resp2['content']['properties'][index2]['building_number'],
                        resp2['content']['properties'][index2]['unit_name'], resp2['content']['properties'][index2]['unit_number'], resp2['content']['properties'][index2]['unit_id'],
                        resp2['content']['properties'][index2]['total_users'])
                      this.listadoUnidad_nuevo_usuario.push(unidad);
                    }
                    for (let index3 = 0; index3 < unitsActualUser.length; index3++) {
                      let unidad = new listadoUnidad(unitsActualUser[index3]['name_sector'], unitsActualUser[index3]['number_sector'],
                        unitsActualUser[index3]['name_unidad'], unitsActualUser[index3]['number_unidad'], unitsActualUser[index3]['id_unidad'],
                        unitsActualUser[index3]['total_users'])
                      this.listadoUnidad_nuevo_usuario.push(unidad);
                    }
                    //Guardar datos al nuevo usuario
                    if (resp2['content']['email2'] == "" && resp2['content']['email3'] == "" && resp2['content']['email4'] == "") {
                      setTimeout(() => {
                        for (let index = 0; index < this.listadoUnidad_nuevo_usuario.length; index++) {
                          let new_unit = new listadoUnidadEnvio(this.listadoUnidad_nuevo_usuario[index]['id_unidad'])
                          this.id_unidad_envio.push(new_unit);
                        }
                        unidades = JSON.stringify(this.id_unidad_envio)
                        const formData = new FormData();
                        formData.append('key', this.config.key);
                        formData.append('id', resp2['content']['id'])
                        formData.append('nameRegister', resp2['content']['nameRegister']);
                        formData.append('email', resp2['content']['email']);
                        formData.append('moroso', resp2['content']['moroso']);
                        const formData2 = new FormData();
                        // formData2.append('key', this.config.key);
                        // formData2.append('user_id', resp2['content']['id']);
                        // formData2.append('residential_id', this.residential_id);
                        // formData2.append('agents', '[]');
                        formData2.append('units', unidades);
                        this.addUnitservice.addUnits(formData2, formData, this.keysession, customer_id, this.meeting_id);
                      }, 1000);

                    }
                    //Caso especial usuario nuevo tiene mas de un correo 
                    else {
                      this.ningun_usuario_del_residential = 1;
                      swal.fire({
                        title: '<strong>Alerta</strong>',
                        type: 'question',
                        html: 'el usuario del nuevo correo existe pero tiene mas correos asociados los cuales son: ' + resp2['content']['email2'] + ' &nbsp; ' + resp2['content']['email3'] + ' &nbsp; ' + resp2['content']['email4'] + ' &nbsp; ' + ' desea unirlos de todas maneras?',
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm: true,
                        confirmButtonText:
                          '<i class="fa fa-thumbs-up"></i> Si',
                        cancelButtonText:
                          '<i class="fa fa-thumbs-down"></i> No',

                      })
                        .then((result) => {
                          if (result.value) {
                            this.ningun_usuario_del_residential = 1;
                            for (let index2 = 0; index2 < resp2['content']['properties'].length; index2++) {
                              let unidad = new listadoUnidad(resp2['content']['properties'][index2]['building_name'], resp2['content']['properties'][index2]['building_number'],
                                resp2['content']['properties'][index2]['unit_name'], resp2['content']['properties'][index2]['unit_number'], resp2['content']['properties'][index2]['unit_id'],
                                resp2['content']['properties'][index2]['total_users'])
                              this.listadoUnidad_nuevo_usuario.push(unidad);
                            }
                            for (let index3 = 0; index3 < unitsActualUser.length; index3++) {
                              let unidad = new listadoUnidad(unitsActualUser[index3]['name_sector'], unitsActualUser[index3]['number_sector'],
                                unitsActualUser[index3]['name_unidad'], unitsActualUser[index3]['number_unidad'], unitsActualUser[index3]['id_unidad'],
                                unitsActualUser[index3]['total_users'])
                              this.listadoUnidad_nuevo_usuario.push(unidad);
                            }
                            setTimeout(() => {
                              for (let index = 0; index < this.listadoUnidad_nuevo_usuario.length; index++) {
                                let new_unit = new listadoUnidadEnvio(this.listadoUnidad_nuevo_usuario[index]['id_unidad'])
                                this.id_unidad_envio.push(new_unit);
                              }
                              unidades = JSON.stringify(this.id_unidad_envio)
                              const formData = new FormData();
                              formData.append('key', this.config.key);
                              formData.append('id', resp2['content']['id'])
                              formData.append('nameRegister', resp2['content']['nameRegister']);
                              formData.append('email', resp2['content']['email']);
                              formData.append('moroso', resp2['content']['moroso']);

                              const formData2 = new FormData();
                              // formData2.append('key', this.config.key);
                              // formData2.append('user_id', resp2['content']['id']);
                              // formData2.append('residential_id', this.residential_id);
                              // formData2.append('agents', '[]');
                              formData2.append('units', unidades);
                              this.addUnitservice.addUnits(formData2, formData, this.keysession, customer_id, this.meeting_id);
                            }, 1000);

                          }
                        });
                    }
                  }
                });
            }
            //Usuario existe pero no pertenece a la reunion
            setTimeout(() => {
              if (this.ningun_usuario_del_residential == 0) {
                swal.fire('cambio de contraseña');
                for (let index = 0; index < this.users[index_user].units.length; index++) {
                  let new_unit = new listadoUnidadEnvio(this.users[index_user].units[index]['id_unidad'])
                  this.id_unidad_envio.push(new_unit);
                }
                unidades = JSON.stringify(this.id_unidad_envio)
                var pass_new = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
                const formData = new FormData();
                formData.append('key', this.config.key);
                formData.append('id', customer_id)
                formData.append('nameRegister', nameRegister);
                formData.append('email', email_1);
                formData.append('name', name);
                formData.append('moroso', moroso);
                formData.append('password', '' + pass_new);
                const formData2 = new FormData();
                // formData2.append('key', this.config.key);
                // formData2.append('user_id', customer_id);
                // formData2.append('residential_id', this.residential_id);
                // formData2.append('agents', '[]');
                formData2.append('units', unidades);
                this.addUnitservice.addUnits(formData2, formData, this.keysession, customer_id, this.meeting_id);
              }
            }, 3000);
          }
          else {
            swal.fire('cambio de contraseña');
            for (let index = 0; index < this.users[index_user].units.length; index++) {
              let new_unit = new listadoUnidadEnvio(this.users[index_user].units[index]['id_unidad'])
              this.id_unidad_envio.push(new_unit);
            }
            unidades = JSON.stringify(this.id_unidad_envio)
            var pass_new = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
            const formData = new FormData();
            formData.append('key', this.config.key);
            formData.append('id', customer_id)
            formData.append('nameRegister', nameRegister);
            formData.append('name', name);
            formData.append('email', email_1);
            formData.append('email2', email_2);
            formData.append('email3', email_3);
            formData.append('email4', email_4);
            formData.append('moroso', moroso);
            formData.append('password', '' + pass_new);
            const formData2 = new FormData();
            // formData2.append('key', this.config.key);
            // formData2.append('user_id', customer_id);
            // formData2.append('residential_id', this.residential_id);
            // formData2.append('agents', '[]');
            formData2.append('units', unidades);
            this.addUnitservice.addUnits(formData2, formData, this.keysession, customer_id, this.meeting_id);
          }
        });
    }
    this.int2 = 'value';
  }

  deleteUnit(index_unit, index_customer) {
    this.users[index_customer].units.splice(index_unit, 1)
  }

  deleteSearch() {
    this.EmailSearch = '';
    this.messageIfNotResultsOfSearch = '';
  }

}
