import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { WhatsappService } from '../../service/whatsaap_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-campaign-whatsapp',
  templateUrl: './create-campaign-whatsapp.component.html',
  styleUrls: ['./create-campaign-whatsapp.component.scss']
})
export class CreateCampaignWhatsappComponent implements OnInit {
  new64:any=[]
  form_params:any = {
    id:'0',
    name:'',
    content:'',
    status:'',
    template_name:'',
    photo:[],
    delete:[]
  }
   

  constructor(
    private _whatsappService : WhatsappService,
    private router: Router
  ) { 
    //this.cargaObjeto()
  }

  ngOnInit() {
  }

  fileConverter(event:any) {
    // console.log(event.addedFiles)
    event.addedFiles.forEach((element:any) => {
    const file = element
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.new64.push(reader.result)
     
    };
    });
}

quitarEspaciosYEnter(value: string) {
  // Remover espacios y saltos de línea
  this.form_params.content = value.replace(/(\r\n|\n|\r)/gm, '\\n');
}


  show(){
    // console.log(this.form_params)
    // this.form_params={id:1;}
  }
  push(){

    let counter = 0
    if (this.form_params.name === '' || this.form_params.content === '' || this.form_params.status === '' || this.form_params.content.length >= 1024) {
      Swal.fire(
        'No se envio la peticion!',
        'Falta algun campo por diligenciar',
        'error'
      )
    }else{
      // this.fileConverter(this.form_params.files)
      const formData = new FormData();
      // var archivoBlob = new Blob([this,this.new64], { type: "text/xml"});
       formData.append('id',this.form_params.id)
       formData.append('name',this.form_params.name)
       formData.append('content',this.form_params.content)
       formData.append('status',this.form_params.status)
      //  formData.append('files',this.form_params.photo)
       formData.append('delete',this.form_params.delete.toString())
       if(this.form_params.photo != null){
        
        for(let i=0; i<this.form_params.photo.length; i++) {
          if(this.new64[i]===undefined){
             counter = counter+1
          }else{
          formData.append('fileName'+[i], this.form_params.photo[i]['name']);
          formData.append('file'+[i], this.new64[i]);
          }
          
     } 
     let total_files= this.form_params.photo.length - counter
     formData.append('totalFiles',total_files.toString())
    }else{
        formData.append('totalFiles','0')
       }
       formData.append('template_name',this.form_params.template_name)

      this._whatsappService.postSaveCampaignWhatsapp(formData).subscribe((resp:any)=> {
        // console.log("resp", resp)
        if (resp.success) {
          
          Swal.fire({
            title: '<strong>Guardado Exitoso</strong>',
            icon: 'success',
            html: resp.message,
          })
          this.router.navigate(['home/campaignlist'])
        } else {
          Swal.fire({
            title: '<strong>Ups! algo salio mal</strong>',
            icon: 'error',
            html: resp.message,
          })
        }
      })
    }
  }


  onSelect(event:any) {
   this.fileConverter(event)
   const value = event.addedFiles
		this.form_params.photo.push(...value);
  }
	onRemove(event:any,index:any,idl:any) {
    this.form_params.delete.push(idl)
		this.form_params.photo.splice(this.form_params.photo.indexOf(event), 1);
    this.new64.splice(index,1)
    
	}

  cargaObjeto() {
    let navigation = this.router.getCurrentNavigation();
    if (navigation === null || navigation.extras.skipLocationChange === false) {
    } else {
      let object = navigation.extras.state!['example']
      // console.log(object)
      this.form_params.id = object.id
      this.form_params.name = object.name
      this.form_params.content = object.content
      this.form_params.status = object.status_id.toString()
      if(object.files == null){
        this.form_params.photo = []
      }else{
        this.form_params.photo = object.files
      }
      
      this.form_params.template_name = object.template_name
      // console.log(this.form_params)
    }
  }

}
