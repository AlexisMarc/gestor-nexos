import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { Globals } from '../../interface/globals.model';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { GetAllActiveAppServicesTypeService } from '../../service/get-all-active-app-services-type.service';
import { Global_Services } from '../../service/global_services';

declare var swal: any;

@Component({
  selector: 'app-search-client',
  templateUrl: './searchclient.component.html',
  styleUrls: ['./searchclient.component.scss']
})
export class SearchClientComponent implements OnInit {
  param3 = '2';
  ListQuote: [] = [];
  ListServiceActive: any;
  Meeting_id!:''


  constructor(
    private router: Router, private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private globals: Globals,
    private getAllActiveAppServices: GetAllActiveAppServicesTypeService,
    private global : Global_Services,

     
     ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    // tslint:disable-next-line: max-line-length
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor' || userStorage['profile'] === 'Moderador') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;

    }

    // tslint:disable-next-line: max-line-length
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' || userStorage === '' || userStorage['status_id'] === 0) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.ListServiceActive = this.getAllActiveAppServices.ListServiceActive;
  }
  searchPost = '';
  ngOnInit() {
  }
  public transform(value: any) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  goHome() {
    this.router.navigate(['home/']);
  }
  goEditUnits(idResidential:any) {
    this.router.navigate(['home/editUnits/' + idResidential]);
  }

  Search3() {
    this.httpClient.get(this.config.endpoint + 'ResidentialServices/getAllResidentialByParam?key=' + this.config.key + '&param=' + this.searchPost + '&quote_type_id=1')
      .subscribe((resp1 :any)=> {
        this.ListQuote = resp1['content'];
      });
  }

  getClientDataBase(id:any){
    this.global.getMeetingDetails(id).subscribe((resp:any)=>{
      if(resp.success == false){
      }else{
        this.Meeting_id = resp.content.id
        if(this.Meeting_id){
          this.global.getReportDBUploaded(this.Meeting_id).subscribe((resp:any)=>{
            
            window.open(resp['url'])
          })
        }else{
        }
      }
    })
  }
}