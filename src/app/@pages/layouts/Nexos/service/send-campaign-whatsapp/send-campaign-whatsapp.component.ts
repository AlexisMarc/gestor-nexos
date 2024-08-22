import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WhatsappService } from '../whatsaap_services';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-send-campaign-whatsapp',
  templateUrl: './send-campaign-whatsapp.component.html',
  styleUrls: ['./send-campaign-whatsapp.component.scss']
})
export class SendCampaignWhatsappComponent implements OnInit {

  id_residential:''
  campaigns:  any []
  numbers:  any []
  campaign=''
  text_campaign = ""
  number=""

  constructor(
    private router: Router,
    private _whatsappService : WhatsappService
  ) { 
    this.getNumbersWhatsappNexos()
    this.cargaObjeto()
    this.getCamapañas()
    
  }

  ngOnInit() {
    if(this.id_residential=='' || this.id_residential ==null){
      this.router.navigate(['/home/listsendcampaignwhastapp'])
    }
  }
  getCamapañas(){
    this._whatsappService.getListCampaignWhatsapp().subscribe(resp=>{
      this.campaigns = resp.content
    })
  }

  getNumbersWhatsappNexos(){
    this._whatsappService.getListNumberWhatsapp().subscribe(resp=>{
      this.numbers = resp.content
    })
  }
  cargaObjeto() {
    let navigation = this.router.getCurrentNavigation();
    if (navigation === null || navigation.extras.skipLocationChange === false) {
    } else {
      let object = navigation.extras.state.example
      this.id_residential = object
    }
  }

  show(){
  }

  onChange(event:any){
    this.campaigns.forEach(element=>{
      if(element.id == event){
       this.text_campaign = element.content
      }
    })
  }

  onChangeNumber(event:any){
    this.numbers.forEach(element=>{
      if(element.id == event){
       this.number = element.facebook_phone_id
      }
    })
  }

  pushPayload(){
    let dataToSend = {
      'campaign_id': this.campaign,
      'facebook_number_id': this.number,
      'residential_id':this.id_residential,
    }
    if(dataToSend.campaign_id=='' || dataToSend.facebook_number_id==''||this.id_residential==''){
    }else{
       this._whatsappService.postSendCampaignWhatsapp(dataToSend).subscribe(resp=>{
        if(resp.success){
          Swal.fire({
            title: "Envio Exitoso",
            text: "Los mensajes se enviaron correctamente",
            type: "success"
          });
        }else{
          Swal.fire({
            title: "ups",
            text: "El envio fallo",
            type: "error"
          });
        }
       })
    }
  } 
}
