import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from './configuration.rest.service';
import swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreMeetingService {

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router
  ) {
  }

  storeMeetingService(createMeetingVoting:any, token:any, base_large:any) {
    if (base_large == 1) {
      // this.httpClient.post(this.config.endpoint3 + 'PreRegisterMeetingServices/storeMeeting64', createMeetingVoting)
      this.httpClient.post(this.config.endpoint6 + 'api/meetings/store/' + token, createMeetingVoting) 
        .subscribe((data:any) => {
          let iconStatus = 'error';
          if (data['success']) {
            swal.fire('Correcto', data['message'], 'success');
             this.router.navigate(['home/searchSets']);
          }else{
            swal.fire('Atencion', data['message'], 'error');
            // sessionStorage.clear()
            // this.router.navigate(['/'])
          }
        }, error => {
          swal.fire('Mensaje', 'Ha ocurrido un error verifique los datos cargados y la base de datos', 'warning');
        });
    } else {
      this.httpClient.post(this.config.endpoint6 + 'api/meetings/storeRegularMeeting/' + token, createMeetingVoting)
        .subscribe((data:any) => {
          let iconStatus:any = 'error';
          if (data['success']) {
            iconStatus = 'success', this.router.navigate(['home/searchSets']);
          }
          swal.fire('Correcto', data['message'], iconStatus);
        }, error => {
          swal.fire('Mensaje', 'Ha ocurrido un error verifique los datos cargados y la base de datos', 'warning');

        });
    }
  }

  editstoreMeetingService(editMeetingVoting:any) {
    this.httpClient.post(this.config.endpoint3 + 'PreRegisterMeetingServices/updateMeetingDetails', editMeetingVoting).subscribe((data:any) => {
      let iconStatus:any = 'error';
      if (data['success']) {
        iconStatus = 'success';
      }
      swal.fire('Correcto', data['message'], iconStatus);
    });

  }

  loadFiles(dataFiles:any, meeting_id:any, keySession:any) {
    // this.httpClient.post(this.config.endpoint3 + 'PreRegisterMeetingServices/uploadDocumentsForMeeting', dataFiles).subscribe((data:any) => {
    this.httpClient.post(this.config.endpoint6 + 'api/meetings/uploadDocumentsForMeeting/' + keySession + '/' + meeting_id, dataFiles).subscribe((data:any) => {
      let iconStatus:any = 'error';
      if (data['success']) {
        iconStatus = 'success';
        // this.router.navigate(['home/pointControlMeeting/' + residential_id]);
      }
      swal.fire('Correcto', data['message'], iconStatus);
    });
  }

  editMeeting(dataFiles:any) {
    this.httpClient.post(this.config.endpoint3 + 'PreRegisterMeetingServices/updateMeetingDetails', dataFiles).subscribe((data:any) => {
      let iconStatus:any = 'error';
      if (data['success']) {
        iconStatus = 'success';
        this.router.navigate(['home/menusettingVoting']);
      }
      swal.fire('Correcto', data['message'], iconStatus);
    });
  }

  deleteDocument(dataDocument:any) {
    this.httpClient.post(this.config.endpoint + 'ResidentialServices/deleteDocumentById', dataDocument).subscribe((resp:any) => {
      let iconStatus:any = 'error';
      if (resp['success']) {
        iconStatus = 'success';
      }
      swal.fire('Correcto', resp['message'], iconStatus);
    });
  }
}