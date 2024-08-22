import { Component, OnInit } from '@angular/core';
import { WhatsappService } from '../../service/whatsaap_services'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-general-setting-whatsapp',
  templateUrl: './general-setting-whatsapp.component.html',
  styleUrls: ['./general-setting-whatsapp.component.scss']
})
export class GeneralSettingWhatsappComponent implements OnInit {
  tokenArea:any
  id:any
  
  constructor(
    private whatsappService_ : WhatsappService
  ) {
    
   }

  ngOnInit() {
     this.getToken()
  }

  getToken(){
    this.whatsappService_.getSettingFace().subscribe(resp=>{
      if(resp.success){
        this.tokenArea = resp.content.token
        this.id = resp.content.id
      }else{
        this.tokenArea=''
        this.id = 0
      }
      
     })
  }

  push(){
    let data = JSON.stringify({"id":this.id,"token":this.tokenArea})
    this.whatsappService_.postSettingFace(data).subscribe(resp=>{
      if(resp.success){
        Swal.fire({
        title: '<strong>Guardado Exitoso</strong>',
        type: 'success',
        html:'El proceso de guardado se llevo correctamente',
      })
      }else{
      }
    })
  }
}
