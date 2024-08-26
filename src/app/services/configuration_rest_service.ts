import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationRestService {
    arrayToSend={"email": 'dloliverosc@gmail.com',"password":'Lo1026278913',"source":'gestor'}
    token:any
    header:any
constructor(
    private httpClient:HttpClient,
    private router:Router
){
    
        // let arrayToSend2 = JSON.stringify(this.arrayToSend)
        // this.httpClient.post('https://apiasambleas.grupogift.com/gestor-test/api/users/login',arrayToSend2).subscribe((response :any)=> {
        //   if (response['success'] == true) {
        //     sessionStorage.setItem('token',response['content']['token'])
        //     sessionStorage.setItem('id',response['content']['id'])
        //   } else {
        //     Swal.fire('Error', response['message'], 'error');
        //   }
        // });
      
}





  }
