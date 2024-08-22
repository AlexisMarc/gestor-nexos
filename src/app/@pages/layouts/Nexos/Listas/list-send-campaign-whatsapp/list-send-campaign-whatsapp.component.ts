import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { NavigationExtras , Router } from '@angular/router';

@Component({
  selector: 'app-list-send-campaign-whatsapp',
  templateUrl: './list-send-campaign-whatsapp.component.html',
  styleUrls: ['./list-send-campaign-whatsapp.component.scss']
})
export class ListSendCampaignWhatsappComponent implements OnInit {
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
    this.httpClient.get(this.config.endpoint + 'ResidentialServices/getAllResidentialByParam?key=' + this.config.key + '&param=' + this.searchPost + '&quote_type_id=1')
      .subscribe(resp1 => {
        this.ListQuote = resp1['content'];
        
      });
  }

  doSendwhatsapp(id){
      const dato: NavigationExtras = {state: {example: id}};
      this.router.navigate(['/home/sendcampaignwhatsapp'],dato);
      }

}
