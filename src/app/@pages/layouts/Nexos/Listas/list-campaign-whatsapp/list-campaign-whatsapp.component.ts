import { Component, OnInit } from '@angular/core';
import { WhatsappService } from '../../service/whatsaap_services';
import { NavigationExtras , Router } from '@angular/router';
@Component({
  selector: 'app-list-campaign-whatsapp',
  templateUrl: './list-campaign-whatsapp.component.html',
  styleUrls: ['./list-campaign-whatsapp.component.scss']
})
export class ListCampaignWhatsappComponent implements OnInit {
  list:any

  constructor(
    private _whatsappService : WhatsappService,
    private router : Router
  ) {
    
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

  ngOnInit() {
    this._whatsappService.getListCampaignWhatsapp().subscribe(resp=>{
      this.list = resp.content
    })
  }

  goEditCampaign(id:any){
    let ObjectToSend = ''
    this.list.forEach((element:any) => {
      if(element.id === id){
        ObjectToSend = element
      }
    });

    const dato: NavigationExtras = {state: {example: ObjectToSend}};
    this.router.navigate(['/home/createcampaign'],dato);
  }

  goCreateCampaignWhatsapp(){
    this.router.navigate(['home/createcampaign'])
  }

}
