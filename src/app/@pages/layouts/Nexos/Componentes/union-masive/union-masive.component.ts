import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { listadoUnidadEnvio } from '../../interface/listadounidadenvio';
import { listadoUnidadToUnion } from '../../interface/listadounidadtounion';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { SocketService } from '../../service/socket.service';
declare var require: any
declare var swal: any;

@Component({
  selector: 'app-union-masive',
  templateUrl: './union-masive.component.html',
  styleUrls: ['./union-masive.component.scss']
})
export class UnionMasiveComponent implements OnInit {

  residential_id: string;
  residential_name: string;
  keysession: string;
  meeting_id: string;
  unitslist: listadoUnidadToUnion[] = [];
  unitsListToSend: listadoUnidadEnvio[] = [];
  ListadoConjuntosSelect: any[] = [];
  ListadoConjuntosSelect2: any[] = [];
  sector: string;
  name_unidad: string;
  int2 = 'value';
  id_unit_search = 'value';
  ListadoUnidades: any[] = [];
  name = '';
  customer_id: string;
  showTable = false;
  cantUnitsToUnion = 0;
  eyeToShowUnion = true;
  selectAllStatus = false;

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(SESSION_STORAGE)
    private storage: WebStorageService) {
    const userStorage = this.storage.get('user');
    if (userStorage['content']['profile'] === 'Super Usuario' || userStorage['content']['profile'] === 'Supervisor' || userStorage['content']['profile'] === 'Moderador' || userStorage['content']['profile'] === 'Soporte telefonico') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home/pointControl']);
      return;
    }
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['content']['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.residential_id = this.route.snapshot.paramMap.get('idResidential');
    this.residential_name = this.route.snapshot.paramMap.get('nameResidential');
    this.keysession = userStorage['content']['token'];
  }

  ngOnInit() {
    this.httpClient.get(this.config.endpoint3 + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this.config.key + '&residential_id=' + this.residential_id).subscribe((response) => {
      this.meeting_id = response['content']['id'];
      this.httpClient.get(this.config.endpoint6 + 'api/units/getBuildingsUnitByUserByMeeting/' + this.keysession + '/' + this.meeting_id)
        .subscribe(response => {
          this.ListadoConjuntosSelect = response['content'];
          this.ListadoConjuntosSelect2 = response['content']
          this.sector = response['content'][0]['name'];
          this.name_unidad = response['content'][0]['units'][0]['name'];
          if (response['success']) {
            for (let index = 0; index < response['content'].length; index++) {
              for (let index2 = 0; index2 < response['content'][index]['units'].length; index2++) {
                var unit = new listadoUnidadToUnion(response['content'][index]['name'], response['content'][index]['number'], response['content'][index]['units'][index2]['name'], response['content'][index]['units'][index2]['number'], response['content'][index]['units'][index2]['id'], false);
                this.unitslist.push(unit);
              }
            }
          }
        });
    });
  }

  getUnitByFilter(n: any, id: any) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(id) as HTMLInputElement;
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable") as HTMLTableElement;
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

  selectAll(n: any, id: any) {
    var input, filter, table, tr, td, i, txtValue, td2, checkItem, checkItemId;
    input = document.getElementById(id) as HTMLInputElement;
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable") as HTMLTableElement;
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[n];
      td2 = tr[i].getElementsByTagName("td")[1];
      if (td && td2) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          checkItem = td2.getElementsByTagName("input") as HTMLInputElement;
          checkItemId = (td2.getElementsByTagName("input")[0].id).replace("union", "") * 1;
          this.unitslist[checkItemId]['status_union'] = this.selectAllStatus;
        }
      }
    }
    setTimeout(() => {
      this.countUnits()
    }, 1000);
  }

  unionUnits() {
    var unidadesList = "";
    this.unitslist.forEach(unit => {
      if (unit.status_union) {
        unidadesList =  unidadesList + unit.name_sector + " " + unit.number_sector + " " + unit.name_unidad + " " + unit.number_unidad + "<br>";
      }
    });
    swal.fire({
      title: "Esta seguro de guardar estas unidades",
      showCancelButton: true,
      html: unidadesList,
      confirmButtonColor: '#FF7300',
      cancelButtonColor: '#262626',
      confirmButtonText: "Sí",
      cancelButtonText:'No',
    }).then((result) => {
      if (result['value'] == true) {
        let unidades = '';
        this.unitslist.forEach(unit => {
          if (unit.status_union) {
            let new_unit = new listadoUnidadEnvio(unit.unit_id)
            this.unitsListToSend.push(new_unit);
          }
        });
        unidades = JSON.stringify(this.unitsListToSend)
        const formData2 = new FormData();
        formData2.append('units', unidades);
        this.httpClient.post(this.config.endpoint6 + 'api/customers/updateCustomerProperties/' + this.keysession + '/' + this.customer_id + '/' + this.meeting_id, formData2)
          .subscribe(response => {
            if (response['success']) {
              swal.fire('Mensaje', response['message'], 'success');
              this.unitsListToSend = [];
              this.int2 = 'value';
              this.id_unit_search = 'value';
              this.name = '';
              this.customer_id = '';
              this.showTable = false;
            } else {
              swal.fire('Mensaje', response['message'], 'error');
            }
          });
      }
    })
  }

  cambio() {
    if (this.int2 == 'value') {
      this.id_unit_search = 'value';
    }
    else {
      this.ListadoUnidades = this.ListadoConjuntosSelect[this.int2]['units'];
      this.id_unit_search = 'value';
    }
  }

  selectedUnit() {
    this.cantUnitsToUnion = 0;
    for (let index = 0; index < this.unitslist.length; index++) {
      this.unitslist[index].status_union = false;
    }
    this.showTable = true;
    this.name = '';
    this.httpClient.get(this.config.endpoint3 + 'ResidentServices/getResidentByUnitNumber?key=' + this.config.key + '&unit_id=' + this.id_unit_search)
      .subscribe(resp => {
        this.customer_id = resp['content']['id'];
        this.name = resp['content']['name'];
        this.httpClient.get(this.config.endpoint6 + 'api/customers/getCustomerDetails/' + this.keysession + '/' + resp['content']['document_number'] + '/' + this.meeting_id)
          .subscribe(response => {
            response['content']['units'].forEach(unitByCustomer => {
              var unitSearching = this.unitslist.find(unitFind => unitFind['unit_id'] === unitByCustomer['unit_id']);
              unitSearching.status_union = true;
              this.cantUnitsToUnion++;
            });
          });
      });
  }

  countUnits() {
    this.cantUnitsToUnion = 0;
    this.unitslist.forEach(unit => {
      if (unit.status_union) {
        this.cantUnitsToUnion++;
      }
    });
  }

  showUnits(n: any, id: any) {
    this.eyeToShowUnion = false;
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(id) as HTMLInputElement;
    filter = 'true'.toUpperCase();
    table = document.getElementById("myTable") as HTMLTableElement;
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

  hideUnits() {
    this.eyeToShowUnion = true;
    var table, tr, td, i;
    table = document.getElementById("myTable") as HTMLTableElement;
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        tr[i].style.display = "";
      }
    }
  }

}
