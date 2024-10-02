import { Component, OnInit } from '@angular/core';
import { WhatsappService } from '../../service/whatsaap_services';
import { NavigationExtras , Router } from '@angular/router';

@Component({
  selector: 'app-number-list-whatsapp',
  templateUrl: './number-list-whatsapp.component.html',
  styleUrls: ['./number-list-whatsapp.component.scss']
})
export class NumberListWhatsappComponent implements OnInit {
  list:any

  constructor(
    private _whatsappServices: WhatsappService,
    private router:Router
  ) { }

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
  this._whatsappServices.getListNumberWhatsapp().subscribe(resp=>{
    this.list = resp.content
  })
  }

  goToEditNumber(id:any){
    let ObjectToSend = ''
    this.list.forEach((element:any) => {
      if(element.id === id){
        ObjectToSend = element
      }
    });

    const dato: NavigationExtras = {state: {example: ObjectToSend}};
    this.router.navigate(['/home/formphonewhatsapp'],dato);

  }

  goformphonewhatsapp(){
    this.router.navigate(['home/formphonewhatsapp'])
  }

}
