import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

// import { ConfigurationRestService } from './services/configuration_rest_service';
// import { Global_Services } from './services/global_services';

@Component({
  selector: 'app-total-chat-whatsapp',
  templateUrl: './total-chat-whatsapp.component.html',
  styleUrls: ['./total-chat-whatsapp.component.scss']
})
export class TotalChatWhatsappComponent  {
constructor(
    // private _login : ConfigurationRestService,
    // private _servicios : Global_Services
    private location: Location,
    private router:Router
  ){
    // this._servicios.getMeetingDetails().subscribe(resp=>{
    //   // console.log(resp)
    // })
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

  conversation;
  onConversationSelected(conversation){
    this.conversation = conversation;
  } 
  goBack(): void {
    this.location.back();
  }

}
