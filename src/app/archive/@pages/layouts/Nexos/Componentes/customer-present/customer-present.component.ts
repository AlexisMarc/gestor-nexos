import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import swal, { SweetAlertIcon } from 'sweetalert2';
 

@Component({
  selector: 'app-customer-present',
  templateUrl: './customer-present.component.html',
  styleUrls: ['./customer-present.component.scss']
})
export class CustomerPresentComponent implements OnInit {

  meeting_id!: string;
  ListCustomer = [];
  residential_id!: string;
  interval: any;
  keysession: string;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
     
     
  ) {
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    this.keysession = userStorage['token'];
    if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor' || userStorage['profile'] === 'Moderador') {
    } else {
      swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
      this.router.navigate(['/home']);
      return;
    }
    if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' ||  userStorage === '' || userStorage['status_id'] === 0 ) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
    this.meeting_id = this.route.snapshot.paramMap.get('idMeeting')!;
    this.residential_id = this.route.snapshot.paramMap.get('idResidential')!;
    this.httpClient.get(this.config.endpoint6 + 'api/customers/getOfflineCustomers/' + this.keysession + '/' + this.meeting_id)
      .subscribe((resp:any)=> {
        this.ListCustomer = resp['content']
      });
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.ChargeAusents();
    }, 15000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  goHome() {
    this.router.navigate(['home/']);
  }
  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }
  goSearchActiveSets() {
    this.router.navigate(['home/searchSets']);
  }
  goSearchPointContrpl() {
    this.router.navigate(['home/pointControl']);
  }
  goPointContrpl(residential_id:any) {
    this.router.navigate(['home/pointControlMeeting/' + residential_id])
  }

  ChargeAusents() {
    // this.httpClient.get(this.config.endpoint3 + 'VotingServices/getResidentsInMeetingByPresent?key=' + this.config.key + '&meeting_id=' + this.meeting_id + '&present=1')
    this.httpClient.get(this.config.endpoint6 + 'api/customers/getOfflineCustomers/' + this.keysession + '/' + this.meeting_id)
      .subscribe((resp:any)=> {
        this.ListCustomer = resp['content'];
      });
  }

}