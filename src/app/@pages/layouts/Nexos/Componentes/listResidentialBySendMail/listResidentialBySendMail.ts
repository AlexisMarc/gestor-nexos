import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { Globals } from '../../interface/globals.model';
import { GetAllActiveAppServicesTypeService } from '../../service/get-all-active-app-services-type.service';

@Component({
  selector: 'listResidentialBySendMail',
  templateUrl: './listResidentialBySendMail.component.html',
  styleUrls: ['./listResidentialBySendMail.component.scss']
})
export class listResidentialBySendMail implements OnInit {
  param2 = '0';
  ListQuote: [] = [];
  ListServiceActive: any;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private globals: Globals,
    private getAllActiveAppServices: GetAllActiveAppServicesTypeService) {

    this.ListServiceActive = this.getAllActiveAppServices.ListServiceActive;
  }


  searchPost = '';
  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['home/']);
  }
  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }
  doSendEmail(idResidential:any) {
    this.router.navigate(['home/sendEmail/' + idResidential]);
  }


  Search2() {
    // tslint:disable-next-line: max-line-length
    this.httpClient.get(this.config.endpoint + 'ResidentialServices/getAllResidentialByParam?key=' + this.config.key + '&param=' + this.searchPost + '&quote_type_id=1')
      .subscribe((resp1 :any)=> {
        this.ListQuote = resp1['content'];
      });
  }

  goConfigIcloud() {
    this.router.navigate(['home/menusettingVoting']);
  }

  goConfigEmail() {
    this.router.navigate(['home/menusettingEmail']);
  }

}

