import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { listadoUnidad } from '../../interface/listadounidad';
import { AddSupportCalledService } from '../../service/AddSupportCalled.service';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { SendmailService } from '../../service/sendmail.service';
declare var Swal: any;

@Component({
  selector: 'app-customer-control',
  templateUrl: './customer-control.component.html',
  styleUrls: ['./customer-control.component.scss']
})
export class CustomerControlComponent implements OnInit {

  residential_id: any;
  document_number: any;
  customer_id!: string;
  listadoUnidad: any = [];
  listadoUnidadData:any = [];
  ListadoConjuntosSelect: [] = [];
  ListadoUnidades: [] = [];
  sector!: string;
  name_unidad!: string;
  int = 'value';
  int2:any = 'value';
  unidadesOk = false;
  id_unit_add = 'value';
  add_unit_text!: string;
  form_name!: string;
  form_email = '';
  form_phone!: string;
  form_description = "";
  form_resolve = "1"
  form_unit!: string;
  userStorage: any;
  user_id: string;
  customer_email = '';
  customer_email_2 = '';
  customer_email_3 = '';
  customer_email_4 = '';
  customer_email_compare = '';
  customer_email_2_compare = '';
  customer_email_3_compare = '';
  customer_email_4_compare = '';
  moroso!: string;
  token!: string;
  customer_id_send!: string;
  show_components = 0;
  nameRegister!: string;
  name!: string;
  meeting_id: string;
  keysession: string;
  textToSearch = '';

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
     
     
    private addSupportCalledService: AddSupportCalledService,
    private sendmailService: SendmailService
  ) {
    this.residential_id = this.route.snapshot.paramMap.get('idResidential');
    this.meeting_id = this.route.snapshot.paramMap.get('idMeeting')!;
    this.userStorage = JSON.parse(sessionStorage.getItem('user')!)!;
    this.user_id = this.userStorage['id'];
    this.keysession = this.userStorage['token'];
  }

  ngOnInit() {
    this.httpClient.get(this.config.endpoint6 + 'api/units/getBuildingsUnitByUserByMeeting/' + this.keysession + '/' + this.meeting_id)
      .subscribe((resp4:any) => {
        if (resp4['message'] == "La sesión es inválida") {
          Swal.fire({
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
        }else{
        this.ListadoConjuntosSelect = resp4['content'];
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

  getCustomerDetails(document_number:any) {
    this.listadoUnidad = [];
    this.httpClient.get(this.config.endpoint6 + 'api/customers/getCustomerDetails/' + this.keysession + '/' + document_number + '/' + this.meeting_id)
      .subscribe((resp:any)=> {
        if (resp['success'] === true) {
          this.show_components = 1;
          this.nameRegister = resp['content']['nameRegister'];
          this.name = resp['content']['name'];
          this.form_email = resp['content']['email'];
          if (resp['content']['email'] == null) {
            this.customer_email = '';
            this.customer_email_compare = '';
          } else {
            this.customer_email = resp['content']['email'];
            this.customer_email_compare = resp['content']['email'];
          }
          if (resp['content']['email2'] == null) {
            this.customer_email_2 = '';
            this.customer_email_2_compare = ''
          } else {
            this.customer_email_2 = resp['content']['email2'];
            this.customer_email_2_compare = resp['content']['email2'];
          }
          if (resp['content']['email3'] == null) {
            this.customer_email_3 = '';
            this.customer_email_3_compare = '';
          } else {
            this.customer_email_3 = resp['content']['email3'];
            this.customer_email_3_compare = resp['content']['email3'];
          }
          if (resp['content']['email4'] == null) {
            this.customer_email_4 = '';
            this.customer_email_4_compare = '';
          } else {
            this.customer_email_4 = resp['content']['email4'];
            this.customer_email_4_compare = resp['content']['email4'];
          }
          this.moroso = resp['content']['moroso'].toString();;
        }
        this.customer_id = resp['content']['id'];
        this.customer_id_send = resp['content']['id'];
        this.listadoUnidadData = resp['content']['units'];
        for (let index = 0; index < this.listadoUnidadData.length; index++) {
          let unidad = new listadoUnidad(this.listadoUnidadData[index]['building_name'], this.listadoUnidadData[index]['building_number'],
            this.listadoUnidadData[index]['unit_name'], this.listadoUnidadData[index]['unit_number'], this.listadoUnidadData[index]['unit_id'],
            this.listadoUnidadData[index]['total_users'])
          this.listadoUnidad.push(unidad);
        }
      });
  }
 
  selectedUser(unit_id_of_customer:any, sector_name:any, sector_number:any, unit_name:any, unit_number:any) {
    this.httpClient.get(this.config.endpoint3 + 'ResidentServices/getResidentByUnitNumber?key=' + this.config.key + '&unit_id=' + unit_id_of_customer)
      .subscribe((resp:any)=> {
        this.form_unit = sector_name + " " + sector_number + ' ' + unit_name + ' ' + unit_number;
        this.getCustomerDetails(resp['content']['document_number']);
      });
  }

  sendMail() {
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
            if (this.customer_email != this.customer_email_compare || this.customer_email_2 != this.customer_email_2_compare || this.customer_email_3 != this.customer_email_3_compare || this.customer_email_4 != this.customer_email_4_compare) {
              const formData2 = new FormData();
              formData2.append('key', this.config.key);
              formData2.append('id', this.customer_id);
              formData2.append('email', this.customer_email);
              formData2.append('email2', this.customer_email_2);
              formData2.append('email3', this.customer_email_3);
              formData2.append('email4', this.customer_email_4);
              this.httpClient.post(this.config.endpoint3 + 'CustomerRegistrationServices/updateCustomerData', formData2).subscribe((user:any) => {
                if (user['success'] === true) {
                  if (this.customer_email != '' || this.customer_email_2 != '' || this.customer_email_3 != '' || this.customer_email_4 != '') {
                    this.sendmailService.SendMailServiceByUnit(this.keysession, this.customer_id_send, this.meeting_id);
                  } else {
                    Swal.fire(
                      'Alerta',
                      'El usuario no tiene correo(s) registrado(s)',
                      'warning'
                    )
                  }
                }
              });
            } else {
              if (this.customer_email != '' || this.customer_email_2 != '' || this.customer_email_3 != '' || this.customer_email_4 != '') {
                this.sendmailService.SendMailServiceByUnit(this.keysession, this.customer_id_send, this.meeting_id);
              } else {
                Swal.fire(
                  'Alerta',
                  'El usuario no tiene correo(s) registrado(s)',
                  'warning'
                )
              }
            }
          }
        }
      }
    }
  }

  saveFormCall() {
    const formData = new FormData();
    formData.append('key', this.config.key)
    formData.append('id', '0')
    formData.append('name_client', this.form_name)
    formData.append('phone', this.form_phone)
    formData.append('email', this.form_email)
    formData.append('description', this.form_description)
    formData.append('result', this.form_resolve)
    formData.append('unit', this.form_unit)
    formData.append('user_id', this.user_id)
    this.addSupportCalledService.addSupportCallReport(formData);
    this.form_name = '';
    this.form_email = '';
    this.form_phone = "";
    this.form_description = "";
    this.form_resolve = "1";
    this.form_unit = "";
  }

  reset() {
    this.textToSearch = "";
    this.listadoUnidad = [];
    this.show_components = 0;
    this.nameRegister = '';
    this.name = '';
    this.customer_email = '';
    this.form_email = '';
    this.int2 = 'value';
    this.id_unit_add = 'value';
    this.moroso = '';
    this.form_unit = '';
    this.form_name = '';
    this.form_email = '';
    this.form_phone = "";
    this.form_description = "";
    this.form_resolve = "1";
    this.form_unit = "";
    setTimeout(() => {
      this.getUnitByFilterTable(0, 'myInput');
    }, 100);
  }

}