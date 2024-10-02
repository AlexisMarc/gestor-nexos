import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import swal from 'sweetalert2';

@Component({
  selector: 'app-menu-config-email',
  templateUrl: './menu-config-email.component.html',
  styleUrls: ['./menu-config-email.component.scss']
})
export class MenuConfigEmailComponent implements OnInit {

  constructor( private router: Router,  
   ) {
  const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
  // tslint:disable-next-line: max-line-length
  if (userStorage['profile'] === 'Super Usuario' || userStorage['profile'] === 'Supervisor') {
  } else {
    swal.fire('Atención', 'Usted no esta autorizado para ingresar <br> pongase en contacto con la Gerencia', 'error');
    this.router.navigate(['/home']);
    return;

  }

  // tslint:disable-next-line: max-line-length
  if (userStorage === null || userStorage === 'null' || userStorage === undefined || userStorage === 'undefined' ||  userStorage === '' || userStorage['status_id'] === 0 ) {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}

  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['home/']);
  }

  goConfigIcloud() {
    this.router.navigate(['home/menusettingVoting']);
  }
  goSendEmail() {
    this.router.navigate(['home/listResidentialBySenMail']);
  }
  goCreateEmails() {
    this.router.navigate(['home/emailIcloud']);
  }

  goListCampaignWhatsapp(){
    this.router.navigate(['home/campaignlist'])
  }

  goListSendWhatsapp(){
    this.router.navigate(['home/listsendcampaignwhastapp'])
  }
 // Enturamientos mientras nos acomodamos paralod e whatsapp 20-10-2023
  goGeneralSettingWhatsapp(){
    this.router.navigate(['home/generalsettingwhastapp'])
  }

  goNumberListWhatsapp(){
    this.router.navigate(['home/numberlistWhatsapp'])
  }

  goFormToConfigurePhones(){
    this.router.navigate(['home/formphonewhatsapp'])
  }

  goCreateCampaignWhastapp(){
    this.router.navigate(['home/createcampaign'])
  }

  goListReportEmail(){
    this.router.navigate(['home/searchtoreport'])
  }

  goChatWhasapp(){
    this.router.navigate(['home/chat-whatsapp'])
  }

  
  //listreportemails


}
