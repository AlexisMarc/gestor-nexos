import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AddunitserviceService {

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService
  ) { }

  addUnits(UnitsData:any, CustomerData:any, keysession:any, customer_id:any, meeting_id:any) {
    this.httpClient.post(this.config.endpoint6 + 'api/customers/updateCustomerProperties/' + keysession + '/' + customer_id + '/' + meeting_id, UnitsData)
      .subscribe((data:any) => {
        var iconStatus: SweetAlertIcon = 'error'
        iconStatus = 'success';
        if (data['success']) {
          this.httpClient.post(this.config.endpoint3 + 'CustomerRegistrationServices/updateCustomerData', CustomerData).subscribe((user:any) => {
            if (user['success'] === true) {
              swal.fire("Mensaje", 'Correcto, se ha guardado correctamente', iconStatus);
            }
          });
        }
      });
  }

  addUnits2(UnitsData:any, CustomerData:any, keysession:any, customer_id:any, meeting_id:any) {
    this.httpClient.post(this.config.endpoint6 + 'api/customers/updateCustomerProperties2/' + keysession + '/' + customer_id + '/' + meeting_id, UnitsData)
      .subscribe((data:any) => {
        var iconStatus: SweetAlertIcon = 'error'
        iconStatus = 'success';
        if (data['success']) {
          this.httpClient.post(this.config.endpoint3 + 'CustomerRegistrationServices/updateCustomerData', CustomerData).subscribe((user:any) => {
            if (user['success'] === true) {
              swal.fire("Mensaje", 'Correcto, se ha guardado correctamente', iconStatus);
            }
          });
        }
      });
  }

  editUserData(CustomerData:any) {
    var iconStatus: SweetAlertIcon = 'error'
    iconStatus = 'success';
    this.httpClient.post(this.config.endpoint3 + 'CustomerRegistrationServices/updateCustomerData', CustomerData).subscribe((user:any) => {
      if (user['success'] === true) {
        swal.fire("Mensaje", 'Se ha guardado correctamente', iconStatus);
      }
    });
  }

}
