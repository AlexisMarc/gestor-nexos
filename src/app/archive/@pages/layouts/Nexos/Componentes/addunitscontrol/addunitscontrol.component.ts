import { Component, inject, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { listadoUnidad } from '../../interface/listadounidad';
import Swal from 'sweetalert2';
import { listadoUnidadEnvio } from '../../interface/listadounidadenvio';
import { AddunitserviceService } from '../../service/addunitservice.service';
 
import swal from 'sweetalert2';
import { SendmailService } from '../../service/sendmail.service';
import { Globals } from '../../interface/globals.model';
import { WhatsappService } from '../../service/whatsaap_services';
import { EnvServiceService } from '@env';


@Component({
  selector: 'app-addunitscontrol',
  templateUrl: './addunitscontrol.component.html',
  styleUrls: ['./addunitscontrol.component.scss']
})
export class AddunitscontrolComponent implements OnInit {
  private _env = inject(EnvServiceService)
  textToSearch: any
  residential_id!: string;
  document_number: any;
  customer_id!: string;
  customer_id_send!: string;
  listadoUnidad: any = [];
  listadoUnidad2:any []  = []
  listadoUnidadData: any = [];
  ListadoConjuntosSelect: [] = [];
  ListadoConjuntosSelect2: [] = [];
  ListadoUnidades: [] = [];
  sector!: string;
  ListadoUnidades2: [] = [];
  name_unidad!: string;
  int:any = 'value';
  int2:any = 'value';
  id_sector_search:any = 'value';
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
  profile!: string;
  is_observer!: string;
  speaker!: string;
  quorum_real_time!: string;
  customer_email = '';
  customer_email_2 = '';
  customer_email_3 = '';
  customer_email_4 = '';
  keysession!: string;
  typeSelectedUser = true;
  userLocation = '';
  whatsapp_phone!:string
  contrys = []
  phone_code='57'
  

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
    private addUnitservice: AddunitserviceService,
     
     
    private sendmailService: SendmailService,
    private global: Globals,
    private _WhatsappService : WhatsappService
  ) {
    
    this._WhatsappService.getCountry().subscribe((resp:any)=> {
      this.contrys = resp['content']
    })

    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor' || userStorage['profile'] === 'Moderador') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home/pointControl']);
      return;
    }

    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.residential_id = this.route.snapshot.paramMap.get('idResidential')!;
    this.user_id = userStorage['id'];
    this.meeting_id = this.route.snapshot.paramMap.get('idMeeting')!;
    this.profile = userStorage['profile'];
    this.token = userStorage['token'];
    this.quorum_real_time = this.global.quorum_real_time;
    this.keysession = userStorage['token'];
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/units/getBuildingsUnitByUserByMeeting/' + this.token + '/' + this.meeting_id)

      .subscribe((resp4:any) => {
        if (resp4['message'] == "La sesión es inválida") {
          swal.fire({
            title:'Atención', 
            text:'Su sesión no es valida por favor ingrese de nuevo.', 
            icon:'info',
            backdrop: true,
            allowOutsideClick: false // Aunque se muestre el backdrop, no permitir clics fuera
          }).then(response=>{
            if(response.value){
              sessionStorage.removeItem('user');
              this.router.navigate(['/']);
            }
          })
        }else{
        this.ListadoConjuntosSelect = resp4['content'];
        this.ListadoConjuntosSelect2 = resp4['content']
        if (resp4['success'] === true) {
          this.sector = resp4['content'][0]['name'];
          this.name_unidad = resp4['content'][0]['units'][0]['name'];
        } else {
          this.sector = 'Sector';
          this.name_unidad = 'Unidad';
        }
      }
      });
  }

  ngOnInit() {
    
    // this._WhatsappService.getCountry().subscribe((resp:any)=> {
    //   this.contrys = resp['content']
    // })
    
  }

  ejem(i:any) {
    this.listadoUnidad2.forEach((element:any) => {
      if (element.id_unidad == i) {
        element.is_owner = element.is_owner === '1' ? '0' : '1'
      }
    })
  }

  getCustomerDetails() {
    this.listadoUnidad = [];
    this.listadoUnidad2 = []
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/customers/getCustomerDetails/' + this.keysession + '/' + this.document_number + '/' + this.meeting_id)
      .subscribe((resp:any)=> {
        
        if (resp['success'] === true) {
          this.show_components = 1;
          if (resp['content']['nameRegister'] == null) {
            this.nameRegister = '';
          } else {
            this.nameRegister = resp['content']['nameRegister'];
          }
          this.name = resp['content']['name'];
          if (resp['content']['email'] == null) {
            this.customer_email = '';
          } else {
            this.customer_email = resp['content']['email'];
          }
          if (resp['content']['email2'] == null) {
            this.customer_email_2 = '';
          } else {
            this.customer_email_2 = resp['content']['email2'];
          }
          if (resp['content']['email3'] == null) {
            this.customer_email_3 = '';
          } else {
            this.customer_email_3 = resp['content']['email3'];
          }
          if (resp['content']['email4'] == null) {
            this.customer_email_4 = '';
          } else {
            this.customer_email_4 = resp['content']['email4'];
          }
          this.is_observer = resp['content']['is_observer'].toString();;
          this.speaker = resp['content']['speaker'].toString();;
          this.moroso = resp['content']['moroso'].toString();;
          this.whatsapp_phone = resp['content']['phone1'] === null ? '': resp['content']['phone1'].toString();
         
        } 
        if(parseInt(resp['content']['document_number']) < 9999) {
          this.userLocation = 'Presencial';
        } else {
          this.userLocation = 'Virtual';
        }
        this.customer_id = resp['content']['id'];
        this.customer_id_send = resp['content']['id'];
        this.listadoUnidadData = resp['content']['units'];
        let listadoUnidad2_owner =  resp['content']['units'];
        
        listadoUnidad2_owner.forEach((element:any)=>{
          let unidad = {'name_sector':element.building_name,'number_sector':element.building_number,'name_unidad':element.unit_name,'number_unidad':element.unit_number,'id_unidad':element.unit_id,'is_owner':element.is_owner,'total_users':element.total_users}
        this.listadoUnidad2.push(unidad)
        })
        
        for (let index = 0; index < this.listadoUnidadData.length; index++) {
          let unidad = new listadoUnidad (this.listadoUnidadData[index]['building_name'], this.listadoUnidadData[index]['building_number'],
            this.listadoUnidadData[index]['unit_name'], this.listadoUnidadData[index]['unit_number'], this.listadoUnidadData[index]['unit_id'],
            this.listadoUnidadData[index]['total_users'])
          this.listadoUnidad.push(unidad);
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

  cambio2() {
    if (this.id_sector_search == 'value') {
      this.id_unit_search = 'value';
      this.unidadesOk = true;
    }
    else {
      this.ListadoUnidades2 = this.ListadoConjuntosSelect2[this.id_sector_search]['units'];
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
      Swal.fire({
        title: '<strong>Esta Seguro</strong>',
        icon: 'question',
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
            // let unidad = new listadoUnidad(this.sector, this.int, this.name_unidad, var2[1], var2[0], 0);
            let unidad2 = {'id_unidad':var2[0],'is_owner':'1','name_sector':this.sector,'name_unidad':this.name_unidad,'number_sector':this.int,'number_unidad':var2[1],'total_users':0}
            this.listadoUnidad2.push(unidad2);
            this.int2 = 'value';
            this.int = null;
            this.id_unit_add = 'value';
          }
        });
    }
  }

  saveChanges() {
    const validateEmail = (email:any) => {
      return String(email)
        .toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };
    if (validateEmail(this.customer_email) == null && this.customer_email != '') {
      Swal.fire(
        'Alerta',
        'El correo 1 debe tener un formato correo válido.',
        'warning'
      )
    } else {
      if (validateEmail(this.customer_email_2) == null && this.customer_email_2 != '') {
        Swal.fire(
          'Alerta',
          'El correo 2 debe tener un formato correo válido.',
          'warning'
        )
      } else {
        if (validateEmail(this.customer_email_3) == null && this.customer_email_3 != '') {
          Swal.fire(
            'Alerta',
            'El correo 3 debe tener un formato correo válido.',
            'warning'
          )
        } else {
          if (validateEmail(this.customer_email_4) == null && this.customer_email_4 != '') {
            Swal.fire(
              'Alerta',
              'El correo 4 debe tener un formato correo válido.',
              'warning'
            )
          } else {
            let unidades = '';
            for (let index = 0; index < this.listadoUnidad.length; index++) {
              let new_unit = new listadoUnidadEnvio(this.listadoUnidad[index]['id_unidad'])
              this.id_unidad_envio.push(new_unit);
            }
            let unidades2 = '';
            let id_unidad_envio2:any =[]
            this.listadoUnidad2.forEach((element:any)=>{
              let new_unit2 = {'unit':element.id_unidad,'is_owner':element.is_owner}
              id_unidad_envio2.push(new_unit2)
            })
            //  unidades = JSON.stringify(this.id_unidad_envio)
            unidades2 = JSON.stringify(id_unidad_envio2)
            const formData = new FormData();
            formData.append('key', this._env.SECRET_KEY);
            formData.append('id', this.customer_id)
            formData.append('nameRegister', this.nameRegister);
            formData.append('email', this.customer_email);
            formData.append('email2', this.customer_email_2);
            formData.append('email3', this.customer_email_3);
            formData.append('email4', this.customer_email_4);
            formData.append('moroso', this.moroso);
            formData.append('is_observer', this.is_observer);
            formData.append('speaker', this.speaker);
            formData.append('phone1', this.whatsapp_phone);
            formData.append('country_code', this.phone_code);

            const formData2 = new FormData();
            //  formData2.append('units', unidades);
             formData2.append('units', unidades2);
            this.addUnitservice.addUnits2(formData2, formData, this.keysession, this.customer_id, this.meeting_id);
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
            this.customer_email = "";
            this.customer_email_2 = "";
            this.customer_email_3 = "";
            this.customer_email_4 = "";
            this.phone_code ='57';
          }
        }
      }
    }
  }

  deleteUnit(i:any) {
    this.listadoUnidad2.splice(i, 1);
  }

  goHome() {
    this.router.navigate(['home/']);
  }
  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }
  goPointContrpl(residential_id:any) {
    this.router.navigate(['home/pointControlMeeting/' + residential_id]);
  }
  goSearchPointControl() {
    this.router.navigate(['home/pointControl']);
  }
  goBack() {
    this.router.navigate(['home/pointControlMeeting/' + this.residential_id]);
  }

  enableUserAndChagePass() {
    Swal.fire({
      title: '<strong>Esta Seguro de expulsar este usuario</strong>',
      icon: 'question',
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
          const formData3 = new FormData();
          formData3.append('key', this._env.SECRET_KEY);
          formData3.append('customer_id', this.customer_id_send);
          formData3.append('meeting_id', this.meeting_id);
          formData3.append('user_id', this.user_id);
          this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ApiQrPresence/deleteCustomerFromAttendance', formData3).subscribe((resp2) => {

            const formData2 = new FormData();
            formData2.append('key', this._env.SECRET_KEY);
            formData2.append('id', this.customer_id)
            formData2.append('status_id', "0");

            this.addUnitservice.editUserData(formData2);
          });
        }
      });
  }

  selectedUser() {
    this.listadoUnidad = [];
    this.id_unit_add = 'value';
    this.int2 = 'value';
    this.nameRegister = '';
    this.name = '';
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'ResidentServices/getResidentByUnitNumber?key=' + this._env.SECRET_KEY + '&unit_id=' + this.id_unit_search)
      .subscribe((resp:any)=> {
        if (resp['success'] == true) {
          this.document_number = resp['content']['document_number'];
          this.phone_code =resp['content']['country_code']
          this.getCustomerDetails();
        } else {
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
          this.customer_email = "";
          this.customer_email_2 = "";
          this.customer_email_3 = "";
          this.customer_email_4 = "";
          this.ListadoUnidades = [];
          
        }
      });
  }

  sendCustomerEmail() {
    if (this.customer_email != '' || this.customer_email_2 != '' || this.customer_email_3 != '' || this.customer_email_4 != '') {
      this.sendmailService.SendMailServiceByUnit(this.keysession, this.customer_id_send, this.meeting_id);
    } else {
      Swal.fire(
        'Alerta',
        'El usuario no tiene un correo registrado',
        'warning'
      )
    }
  }

  getCustomerDetails2() {
    this.id_unit_search = 'value';
    this.id_sector_search = 'value';
    this.ListadoUnidades2 = [];
    this.id_unit_add = 'value';
    this.int2 = 'value';
    this.nameRegister = '';
    this.name = '';
    this.customer_id = '';
    this.listadoUnidad = [];
    this.id_unidad_envio = [];
    this.show_components = 0;
    this.id_unit_add = 'value';
    this.int2 = 'value';
    this.customer_email = "";
    this.customer_email_2 = "";
    this.customer_email_3 = "";
    this.customer_email_4 = "";
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/customers/getCustomerDetails/' + this.keysession + '/' + this.document_number + '/' + this.meeting_id)
      .subscribe((resp:any)=> {
        if (resp['success'] === true) {
          this.show_components = 1;
          if (resp['content']['nameRegister'] == null) {
            this.nameRegister = '';
          } else {
            this.nameRegister = resp['content']['nameRegister'];
          }
          if(parseInt(resp['content']['document_number']) < 9999) {
            this.userLocation = 'Presencial';
          } else {
            this.userLocation = 'Virtual';
          }
          this.name = resp['content']['name'];
          this.customer_id = resp['content']['id'];
          this.customer_id_send = resp['content']['id'];
          this.customer_email = resp['content']['email'];
          this.customer_email_2 = resp['content']['email2'];
          this.customer_email_3 = resp['content']['email3'];
          this.customer_email_4 = resp['content']['email4'];
          this.is_observer = resp['content']['is_observer'].toString();
          this.speaker = resp['content']['speaker'].toString();
          this.moroso = resp['content']['moroso'].toString();
          this.listadoUnidadData = resp['content']['units'];

          for (let index = 0; index < this.listadoUnidadData.length; index++) {
            let unidad = new listadoUnidad(this.listadoUnidadData[index]['building_name'], this.listadoUnidadData[index]['building_number'],
              this.listadoUnidadData[index]['unit_name'], this.listadoUnidadData[index]['unit_number'], this.listadoUnidadData[index]['unit_id'],
              this.listadoUnidadData[index]['total_users'])
            this.listadoUnidad.push(unidad);
          }
        }
      });
  }

  saveChangesAndSendEmail() {
    const validateEmail = (email:any) => {
      return String(email)
        .toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };
    if (validateEmail(this.customer_email) == null && this.customer_email != '') {
      Swal.fire(
        'Alerta',
        'El correo 1 debe tener un formato correo válido.',
        'warning'
      )
    } else {
      if (validateEmail(this.customer_email_2) == null && this.customer_email_2 != '') {
        Swal.fire(
          'Alerta',
          'El correo 2 debe tener un formato correo válido.',
          'warning'
        )
      } else {
        if (validateEmail(this.customer_email_3) == null && this.customer_email_3 != '') {
          Swal.fire(
            'Alerta',
            'El correo 3 debe tener un formato correo válido.',
            'warning'
          )
        } else {
          if (validateEmail(this.customer_email_4) == null && this.customer_email_4 != '') {
            Swal.fire(
              'Alerta',
              'El correo 4 debe tener un formato correo válido.',
              'warning'
            )
          } else {
            // let unidades = '';
            // for (let index = 0; index < this.listadoUnidad.length; index++) {
            //   let new_unit = new listadoUnidadEnvio(this.listadoUnidad[index]['id_unidad'])
            //   this.id_unidad_envio.push(new_unit);
            // }

            let unidades2 = '';
            let id_unidad_envio_and_send_email:any =[]
            this.listadoUnidad2.forEach((element:any)=>{
              let new_unit2 = {'unit':element.id_unidad,'is_owner':element.is_owner}
              id_unidad_envio_and_send_email.push(new_unit2)
            })
            unidades2 = JSON.stringify(id_unidad_envio_and_send_email)
            // unidades = JSON.stringify(this.id_unidad_envio)
            const formData = new FormData();
            formData.append('key', this._env.SECRET_KEY);
            formData.append('id', this.customer_id)
            formData.append('nameRegister', this.nameRegister);
            formData.append('email', this.customer_email);
            formData.append('email2', this.customer_email_2);
            formData.append('email3', this.customer_email_3);
            formData.append('email4', this.customer_email_4);
            formData.append('moroso', this.moroso);
            formData.append('is_observer', this.is_observer);
            formData.append('speaker', this.speaker);
            const formData2 = new FormData();
            formData2.append('units', unidades2);
            // formData2.append('meeting_id',this.meeting_id)

            if(this.customer_email  != '' || this.customer_email_2!='' || this.customer_email_3!='' || this.customer_email_4!=''){
              this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/customers/updateCustomerProperties/' + this.keysession + '/' + this.customer_id + '/' + this.meeting_id, formData2)
              .subscribe((data:any) => {
                
                if (data['success']) {
                  this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'CustomerRegistrationServices/updateCustomerData', formData).subscribe((user:any) => {
                    if (user['success']) {
                      if (this.customer_email != '' || this.customer_email_2 != '' || this.customer_email_3 != '' || this.customer_email_4 != '') {
                        this.sendmailService.SendMailServiceByUnit(this.keysession, this.customer_id, this.meeting_id);
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
                        this.customer_email = "";
                        this.customer_email_2 = "";
                        this.customer_email_3 = "";
                        this.customer_email_4 = "";
                      } else {
                        swal.fire("Mensaje", 'No se pudo guardar la información', 'warning');
                      }
                    } else {
                      swal.fire("Mensaje", 'No se pudo guardar la información', 'warning');
                    }
                  });
                }
              });
            }else{
              Swal.fire({
                icon: 'info',
                title: ' Atención',
                html:' Los campos de email a enviar estan vacios'
              })
            }
            
            
          }
        }
      }
    }
  }

  closeSessionUser() {
    Swal.fire({
      title: '<strong>¿Esta seguro de cerrarle sesión al usuario?</strong>',
      icon: 'question',
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
          this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/customers/removeUserSessionFromMeeting/' + this.keysession + '/' + this.customer_id + '/' + this.meeting_id)
            .subscribe((response :any)=> {
              if (response['success']) {
                swal.fire("Mensaje", response['message'], 'success');
              } else {
                swal.fire("Mensaje", response['message'], 'warning');
              }
            });
        }
      });
  }

  getUnitByFilterTable(n: any, id: any) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(id) as HTMLInputElement;
    filter = input.value.toUpperCase();
    table = document.getElementById("table_units") as HTMLTableElement;
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[n];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  selectedUser2(unit_id_of_customer:any, sector_name:any, sector_number:any, unit_name:any, unit_number:any) {
    // this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'ResidentServices/getResidentByUnitNumber?key=' + this._env.SECRET_KEY + '&unit_id=' + unit_id_of_customer)
    //   .subscribe((resp:any)=> {
    //     this.form_unit = sector_name + " " + sector_number + ' ' + unit_name + ' ' + unit_number;
    //     this.getCustomerDetails(resp['content']['document_number']);
    //   });
    this.id_unit_search = unit_id_of_customer;
    this.selectedUser();
  }

}