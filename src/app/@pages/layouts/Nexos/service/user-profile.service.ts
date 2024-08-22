import { Injectable } from '@angular/core';
import swal, { SweetAlertType } from 'sweetalert2';
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

  CreateProfile(createProfile) {
    this.httpClient.post(this.config.endpoint + 'UserServices/addEditUserProfile', createProfile)
      .subscribe(data => {
        this.data = data;
        var iconStatus: SweetAlertType = 'success'
        var iconStatus2: SweetAlertType = 'warning'
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

  editUser(updateProfile) {
    this.httpClient.post(this.config.endpoint + 'UserServices/addEditUserProfile', updateProfile)
      .subscribe(data => {
        this.data = data;
        var iconStatus: SweetAlertType = 'success'
        var iconStatus2: SweetAlertType = 'warning'
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


      createProfileVotation(createProfileVotation) {
        this.httpClient.post(this.config.endpoint + 'ApiVoting/createEditVoterProfile', createProfileVotation)
        .subscribe(data => {
          this.data = data;
          let iconStatus: SweetAlertType = 'success';
          let iconStatus2: SweetAlertType = 'warning';
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
      editProfileVotation(editProfileVotation) {
        this.httpClient.post(this.config.endpoint + 'ApiVoting/createEditVoterProfile', editProfileVotation)
        .subscribe(data => {
          this.data = data;
          let iconStatus: SweetAlertType = 'success';
          let iconStatus2: SweetAlertType = 'warning';
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