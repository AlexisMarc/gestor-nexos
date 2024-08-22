import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WhatsappService } from '../../service/whatsaap_services';
import { Global_Services } from '../../service/global_services';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ConfigurationRestService } from '../../service/configuration.rest.service';

@Component({
  selector: 'app-register-assambly-meeting-whatsapp',
  templateUrl: './register-assambly-meeting-whatsapp.component.html',
  styleUrls: ['./register-assambly-meeting-whatsapp.component.scss']
})
export class RegisterAssamblyMeetingWhatsappComponent implements OnInit {
  residential_id:any
  searchPost = '';
  contrys = []
  contrySelect = '57'
  meeting_id: any
  buildings:any
  acccess_service:boolean = false
  buildByUser:any[]
  allBuilds:any[] =[]
  coincidences:any
  id_sector_search:any = '00'
  id_unit_search:any = '00'
  ListadoUnidades:any[]
  userCheck:any
  id_selected:any = '00'
  userSelected:any
  userIdOwner:any

  
  data = {
    building_id:'00',
    document:'',
    phone_code:'57',
    phone:'',
    name:''
  }
  constructor(
    private route:ActivatedRoute,
    private _whatsappService: WhatsappService,
    private _global: Global_Services,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private router: Router
    
  ) {
    this.residential_id = this.route.snapshot.paramMap.get('idResidential');
   }
  ngOnInit() {
    this._global.getMeetingDetails(this.residential_id).subscribe(resp => {
      if (resp.success == true) {
        this.meeting_id = resp.content.id
        this._whatsappService.getBuilding(this.meeting_id).subscribe(response => {
          this.buildings = response['content']
          // this.buildings.forEach(element => {
          //   element.units.forEach(ele => {
              
          //     this.allBuilds.push(ele)
          //   });
          // });
          // console.log(this.allBuilds)
        })
      } else {
      }
    })
    this._whatsappService.getCountry().subscribe(resp => {
      this.contrys = resp['content']
    })
  }
  show(){
  }

  goHome() {
    this.router.navigate(['home/']);
  }
  goMenuSettingVoting() {
    this.router.navigate(['home/menusettingVoting']);
  }
  goSearchPointContrpl() {
    this.router.navigate(['home/pointControl']);
  }

  actualizarValor(index) {
    this.buildByUser[index].value_check = this.buildByUser[index].value_check == 1 ? 0: 1
  }

  actualizarValor2(index) {
    this.buildByUser[index].is_owner = this.buildByUser[index].is_owner == 1 ? 0: 1
  }


  selectedSector() {
    if(this.buildings[this.id_sector_search]['units'] !== undefined){
    this.ListadoUnidades = this.buildings[this.id_sector_search]['units']
  }else{
  }
  }
  selectedUser(){
    if(this.buildings[this.id_sector_search]!== undefined){
      this.userSelected = this.ListadoUnidades[this.id_unit_search]
    this.userCheck = {
      building_name:this.buildings[this.id_sector_search]['name'],
      building_number:this.buildings[this.id_sector_search]['number'],
      unit_id:parseInt(this.userSelected.id, 10),
      unit_name:this.userSelected.name,
      unit_number:this.userSelected.number,
      value_check:1,
      is_owner:1
}
    }else{
    }
  }

  build_selected(){
    
    this.httpClient.get(this.config.endpoint3 + 'ResidentServices/getResidentByUnitNumber?key=' + this.config.key + '&unit_id=' + this.id_selected)
    .subscribe(resp=>{
      let document_aux = resp['content']['document_number']
      let phone_aux = resp['content']['phone1']
      this.userIdOwner = resp['content']['id']
      let data = {'document':document_aux,'phone':phone_aux,'meeting_id':this.meeting_id,'phone_code':this.data.phone_code}
      this._whatsappService.postDataByDocumentOrPhone(data).subscribe(resp=>{
        if(resp['success']== true){
          this.buildByUser = resp['content']['properties']
          this.buildByUser.forEach(element => {
              element['value_check'] = 1
          });
        }
      })
    })
  }

  pushData(){
    if(this.userCheck !== undefined){
      if( this.userCheck.building_id !='' && this.userCheck.building_number!='' && this.userCheck.unit_id!= null){
    const seEncuentraEnArreglo = this.buildByUser.some(elemento => elemento.unit_id === this.userCheck.unit_id);

if (seEncuentraEnArreglo) {
  Swal.fire({
    type: "error",
    title: "No se puede agregar",
    text: "Ya existe este usuario en la lista",
  });
} else {
  
  Swal.fire({
    title: '<strong>Esta Seguro</strong>',
    type: 'question',
    html: 'que desea agregar esta unidad Unidad: <b>' + this.userCheck.building_name + ' - ' + this.userCheck.building_number+' - ' + this.userCheck.unit_number+' - ' + this.userCheck.building_name+'</b>',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: true,
    confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Si',
    cancelButtonText:
      '<i class="fa fa-thumbs-down"></i> No',

  })
    .then((result) => {
      if (result.value) {

        
        this.buildByUser.push(this.userCheck)
        this.userCheck = {
          building_name: "",
          building_number: "",
          unit_id: null,
          unit_name: "",
          unit_number: "",
          value_check: 1
        };
        this.id_sector_search ='00'
        this.id_unit_search ='00'
        this.ListadoUnidades = []
        
        
      }
    });
}
      }else{
      }
  
}else{
}

}
  

  sendData(){
    let unitscheck =[]
    this.buildByUser.forEach(element => {
      if(element.value_check== 1){
        unitscheck.push({'id':element.unit_id,'is_owner':element.is_owner})
      }
    });
    
    let dataToSend = {
      "id":this.userIdOwner,
      "meeting_id":this.meeting_id,
      "name":this.data.name,
      "phone1":this.data.phone,
      "document_number":this.data.document,
      "country_code":this.data.phone_code,
      "units":unitscheck
    }
this._whatsappService.postRegisterUserWithWhatsapp(dataToSend).subscribe(resp=>{
  if(resp['status']){
    Swal.fire({
      type:'success',
      title:'Proceso Exitoso',
      text:resp['message']
    });
    this.recargarModulo()
  }else{
    Swal.fire({
      type:'error',
      title:'Error',
      text:resp['message']
    });
  }
})
  }
 
 
  searchUser(){
    let data = {'document':this.data.document,'phone':this.data.phone,'meeting_id':this.meeting_id,'phone_code':this.data.phone_code}
    if(data.document!='' || data.phone!=''){
      this._whatsappService.postDataByDocumentOrPhone(data).subscribe(resp=>{
        if(resp['success']== true){
          this.userIdOwner = resp['content']['id']
          this.data.document = resp['content']['document']
          this.data.phone_code = resp['content']['phone_code']
          this.data.phone = resp['content']['phone']
          this.data.name  = resp['content']['name']
          this.acccess_service = resp['success']
          this.buildByUser = resp['content']['properties']
          this.buildByUser.forEach(element => {
              element['value_check'] = 1  
          });
          // this.coincidences = this.buildByUser.filter(obj1 => {const idBuscado = obj1.unit_id.toString();
          //   return this.allBuilds.some(obj2 => obj2.id === idBuscado);
          // });
        }else{
          Swal.fire(resp['message']);
          this.data.name=''
          this.acccess_service = resp['success']
          
        }
        
        
      })
    }else{
      Swal.fire("No hay data que buscar por que los campos de telefono o identificacion estan vacios");
    }
    
}
 
recargarModulo() {
  const currentRoute = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentRoute]);
  });
}

cleanRegister(){
  this.data = {
    building_id:'00',
    document:'',
    phone_code:'57',
    phone:'',
    name:''
  }
  this.acccess_service = false;
}
}