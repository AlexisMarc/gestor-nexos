import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../@pages/layouts/Nexos/service/configuration.rest.service';
import { NavigationExtras , Router } from '@angular/router';
import { EnvServiceService } from '@env';

@Component({
  selector: 'app-search-meeting-to-report',
  templateUrl: './search-meeting-to-report.component.html',
  styleUrls: ['./search-meeting-to-report.component.scss']
})
export class SearchMeetingToReportComponent implements OnInit {
  private _env = inject(EnvServiceService)
  searchPost = '';
  ListQuote: any [] = [];

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router:Router
    
  ) {
    
   }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['home/']);
  }
  goConfigIcloud() {
    this.router.navigate(['home/menusettingVoting']);
  }
  goConfigEmail() {
    this.router.navigate(['home/menusettingEmail']);
  }


  Search2() {
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_MANAGEMENT+ 'ResidentialServices/getAllResidentialByParam?key=' + this._env.SECRET_KEY + '&param=' + this.searchPost + '&quote_type_id=1')
      .subscribe((resp1:any) => {
        this.ListQuote = resp1['content'];
        
      });
  }

  doSendwhatsapp(id:any){
      const dato: NavigationExtras = {state: {example: id}};
      this.router.navigate(['/home/listreportemails'],dato);
      }

}
