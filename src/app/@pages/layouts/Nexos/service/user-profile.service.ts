import { Injectable } from '@angular/core';
import swal, { SweetAlertIcon } from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  data: any;

  constructor(private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router) { }

  CreateProfile(createProfile:any) {
    this.httpClient.post(this.config.endpoint + 'UserServices/addEditUserProfile', createProfile)
      .subscribe((data:any) => {
        this.data = data;
        var iconStatus: SweetAlertIcon  = 'success'
        var iconStatus2: SweetAlertIcon  = 'warning'
        if (data['success'] == true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/profilelist'])
          }
          swal.fire('Correcto', data['message'], iconStatus);
        }
        else {
          if (data['success']) {
            iconStatus2 = 'warning'
          }
          swal.fire('Incorrecto', data['message'], iconStatus2);
        }
      })
  }

  editUser(updateProfile:any) {
    this.httpClient.post(this.config.endpoint + 'UserServices/addEditUserProfile', updateProfile)
      .subscribe((data:any) => {
        this.data = data;
        var iconStatus: SweetAlertIcon = 'success'
        var iconStatus2: SweetAlertIcon = 'warning'
        if (data['success'] == true) {
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['/home/profilelist'])
          }
          swal.fire('Correcto', data['message'], iconStatus);
        } else {
          if (data['success']) {
            iconStatus2 = 'warning';
          }
          swal.fire('Incorrecto', data['message'], iconStatus2);
        }
      });
      }


      createProfileVotation(createProfileVotation:any) {
        this.httpClient.post(this.config.endpoint + 'ApiVoting/createEditVoterProfile', createProfileVotation)
        .subscribe((data:any) => {
          this.data = data;
          let iconStatus: SweetAlertIcon = 'success';
          let iconStatus2: SweetAlertIcon = 'warning';
          if (data['success'] === true) {
            if (data['success']) {
              iconStatus = 'success', this.router.navigate(['/home/listProfileVotation']);
            }
            swal.fire('Correcto', data['message'], iconStatus);
          } else {
            if (data['success']) {
              iconStatus2 = 'warning';
            }
            swal.fire('Incorrecto', data['message'], iconStatus2);
          }
        });
      }
      editProfileVotation(editProfileVotation:any) {
        this.httpClient.post(this.config.endpoint + 'ApiVoting/createEditVoterProfile', editProfileVotation)
        .subscribe((data:any) => {
          this.data = data;
          let iconStatus: SweetAlertIcon = 'success';
          let iconStatus2: SweetAlertIcon = 'warning';
          if (data['success'] === true) {
            if (data['success']) {
              iconStatus = 'success', this.router.navigate(['/home/listProfileVotation']);
            }
            swal.fire('Correcto', data['message'], iconStatus);
          } else {
            if (data['success']) {
              iconStatus2 = 'warning';
            }
            swal.fire('Incorrecto', data['message'], iconStatus2);
          }
        })
      }
}