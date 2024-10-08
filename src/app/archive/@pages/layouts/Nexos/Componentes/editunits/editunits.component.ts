import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit, } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
 
// import { ExecOptionsWithStringEncoding } from 'child_process';
import { ConfigurationRestService } from '../../service/configuration.rest.service';
import { UnitEdit } from '../../interface/unitEdit.model';
import { FormArray, FormBuilder , FormControl, FormGroup, Validators } from '@angular/forms';
import { SocketService } from '../../service/socket.service';
import { isEmpty, toArray } from 'rxjs/operators';
import { EnvServiceService } from '@env';
declare var swal: any;
@Component({
  selector: 'app-edit-units',
  templateUrl: './editunits.component.html',
  styleUrls: ['./editunits.component.scss']
})
export class EditUnitsComponent implements OnInit {
  private _env = inject(EnvServiceService)
  arraySearching: any [] = []
  arrayToChangeCoef : any [] = []
  inputSearch: any;
  console = console;
  token!: string;
  meeting_id!: string;
  residential_id!: string;
  unitsListbyMeeting: any;
  unitslist: any [] = [];
  arrayCoefficientToSend: any = []
  status = 0;
  changeCoefficientUnits = [];
  arrayUnitEdit: UnitEdit[] = [];
  builds : any [] =[];
  dataUnitToSend2:any [] = []
  meeting_id_full!: string
  nombre_unidadFormGruop : FormGroup = new FormGroup({})
  coeffEdit!: string
  // Nueva 
  addUnidades: Array<AddUnit> = new Array<AddUnit>();
  newUnidad = new AddUnit('0','','','','', '','','',false,false,false,0,1);
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private config: ConfigurationRestService,
    private route: ActivatedRoute,
     
     
    private formBuilder: FormBuilder,
    private socket:SocketService
    
  )
   {

    
    this.addUnidades.push()
    
  }
   mainLoad(){
    this.residential_id = this.route.snapshot.paramMap.get('idResidential')!
    const userStorage:any = JSON.parse(sessionStorage.getItem('user')!)!;
    this.token = userStorage['token'];
    this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.APP_PREREGISTRO + 'PreRegisterMeetingServices/getMeetingDetails?key=' + this._env.SECRET_KEY + '&residential_id=' + this.residential_id)
      .subscribe((resp:any)=> {
        this.meeting_id = resp['content']['id'];
        this.meeting_id_full = this.meeting_id
        this.httpClient.get(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/units/getBuildingsUnitByUserByMeeting/' + this.token + '/' + this.meeting_id)
          .subscribe((resp:any)=> {
            this.unitsListbyMeeting = resp['content'];
            
            // this.ListadoConjuntosSelect = resp4['content'];
            // this.ListadoConjuntosSelect2 = resp4['content']
            // if (resp4['success'] === true) {
            //   this.sector = resp4['content'][0]['name'];
            //   this.name_unidad = resp4['content'][0]['units'][0]['name'];
            // } else {
            //   this.sector = 'Sector';
            //   this.name_unidad = 'Unidad';
            // }
            // Se hace un filtro para obtener los building de la peticion  getBuildingsUnitByUserByMeeting
            // Para cargarlos en el modal de adicionar unidades a buildings existentes
            this.unitsListbyMeeting.forEach((carga:any) => {
              this.builds.push({id_build: carga.id,name:carga.name,number:carga.number})
              this.unitslist.push(carga.units)
           });
          });
      });  
   }

  
    
  
  getUnitByFilter(n: any, id: any) {
    // Declare variables
    var filter, table, tr, td, i, txtValue;
    this.arraySearching = []
    this.inputSearch = document.getElementById(id) as HTMLInputElement;
    filter = this.inputSearch.value.toUpperCase();
    table = document.getElementById("UnitsTable") as HTMLTableElement;
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[n];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          this.arraySearching.push(txtValue)
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  ngOnInit() {
    this.mainLoad()
    // this.socket.listen('alert_chat_message_'+this.token).subscribe(resp=>{
    // })

    // this.socket.listen('alert_chat_message_read_'+this.token).subscribe(resp2=>{
    // })
  }
  goToSearchClient() {
    this.router.navigate(['home/searchClient'])
  }
  goHome() {
    this.router.navigate(['home/']);
  }
  showShow(){
    this.arrayToChangeCoef = []
    // this.console.log(this.inputSearch.value)
    // this.console.log(this.coeffEdit)
    let shoW: any []=[]
    this.arraySearching.forEach((element,index) => {
      shoW[index]= element.split(" ")
    });
    // this.console.log(this.unitsListbyMeeting)
    // this.console.log(shoW)
    shoW.forEach((ele,index)=>{
      this.arrayToChangeCoef[index] = ele[0]
    })
    // this.console.log(this.arrayToChangeCoef)
  }
  newCoefficientByUnits(){
    let elm = JSON.parse(JSON.stringify(this.unitslist))
    if(this.coeffEdit == undefined){
      // this.console.log('Coeficiente Vacio')
      return ;
    }
    this.showShow()
    if(this.inputSearch === undefined || this.inputSearch.value === ''){
      // this.console.log('esta vacio')
      // this.console.log('Aqui se enviaria los coeficientes para todas las unidades')
    }else{
      // this.console.log('Coeficiente: '+this.coeffEdit)
      // this.console.log(this.arrayToChangeCoef)
      this.arrayToChangeCoef.forEach((item)=>{
        elm.forEach((unitslist2:any)=>{
        unitslist2.forEach((element:any)=>{
          
          if(element.id == item){
            if(element.aporte<=0){
            }else{
            element.coefficient = this.coeffEdit
            this.arrayCoefficientToSend.push(element)
          }
          }
        });
      });
      });
    }
    
    let dataToSend = JSON.stringify(this.arrayCoefficientToSend)
    var formData = new FormData;
    formData.append("units",dataToSend)
    formData.append('meeting_id',this.meeting_id)
    this.serviceToSendMultipleUnits(formData)
  }
  newEditAllCoefficientUnits(){
    let arrayAllUnits: any []=[]
    let ele2 = JSON.parse(JSON.stringify(this.unitslist))
     ele2.forEach((unitslist2:any)=>{
        unitslist2.forEach((element:any)=>{
          if(element.aporte<=0){
          }else{
          arrayAllUnits.push(element)
        }
        });
      });
      let newCoefficient = 100/arrayAllUnits.length
      // this.console.log(newCoefficient)
      arrayAllUnits.forEach((element)=>{
        element.coefficient = newCoefficient
      })
      let dataToSend = JSON.stringify(arrayAllUnits)
      var formData = new FormData;
      formData.append("units",dataToSend)
      formData.append('meeting_id',this.meeting_id)
      this.serviceToSendMultipleUnits(formData)
      
  }
  serviceToSendMultipleUnits(form:any){
    this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2 + 'api/units/updateMultipleUnits/' +this.token, form).subscribe((response:any) => {
      if (response['success']) {
        swal.fire('mensaje', response['message'], 'success'
        ).then((response:any)=>{
          if(response.isConfirmed){
            //this.resetPAge()
            window.location.reload();
  
          }else{
            // this.console.log('nada')
          }
        })
        
      } else {
        swal.fire('mensaje', response['message'], 'info'
        )
      }
    });
  }
  //Editar una unidad cuando se clickea  en el boton que esta al frende de la unidad
  editUnit(unit_id:any,unit_name:any,unit_number:any,unit_coefficient:any,unit_aporte:any,unit_can_vote:any,voter_profile_id:any, building_id:any){
    var arrayDataUnit = {
      'id': unit_id ,
      'building_id': building_id,
      'name': unit_name,
      'number': unit_number,
      'coefficient': unit_coefficient,
      'aporte': unit_aporte,
      'can_vote': unit_can_vote,
      'voter_profile_id': voter_profile_id
  }
  
  //let dataUnitToSend = JSON.stringify(arrayDataUnit);
  this.dataUnitToSend2.push(arrayDataUnit)
  let dataUnitToSend = JSON.stringify(this.dataUnitToSend2)
  var formData = new FormData;
  formData.append("units",dataUnitToSend);
  formData.append('meeting_id',this.meeting_id)
  this.serviceToSendMultipleUnits(formData)
  }
  resetPAge(){
    // this.console.log('Aqui 2')
    this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate(['./'], {relativeTo: this.route})
  }
  
  //Nueva Implementacion para adicionar  buildings//
  get nombre_unidads2() {
    return this.registerForm2.get('nombre_unidads2') as FormArray
  }
  registerForm = new FormGroup({
    nombre_unidads: new FormArray([]),
  })
  registerForm2 = new FormGroup({
    nombre_unidads2: new FormArray([]),
  })
    
  addFileds2(){
    const nombre_unidadFormGruop2 =  this.formBuilder.group({
      id:0,
      residential_id:this.residential_id,
      name:'',
      number:'',
      meeting_id:this.meeting_id
    });
    this.nombre_unidads2.push(nombre_unidadFormGruop2)
  }
  
  //Formbuilder del formulario
  Data = new FormGroup({
    name:new FormControl('', Validators.required),
    surname:new FormControl('', Validators.required),
    credential:new FormControl('', Validators.required),
    password:new FormControl('', Validators.required)
  })
  
  removerField(indice:number){
    this.addUnidades.splice(indice, 1)
  }
  removerField2(indice:number){
    this.nombre_unidads2.removeAt(indice)
  }
  refresh(){
    this.addUnidades =[]
  }
  refresh2(){
    this.nombre_unidads2.clear()
  }
  showData2(){
    // this.console.log('Leo')
    // this.console.log(this.nombre_unidads2.value)
    
    
  }
  capitazateStringBuildings(){
    this.nombre_unidads2.value.forEach((element:any) => {
      let minusculas = element.name.toLowerCase()
      element.name = minusculas.replace(/\b\w/g, (x:any) => x.toUpperCase())
     
    });
  }
  capitazateStringUnits(){
    // this.console.log(this.newUnidad)
    // this.console.log(this.newUnidad.name)
    let minusculas = this.newUnidad.name.toLowerCase()
    this.newUnidad.name = minusculas.replace(/\b\w/g, x => x.toUpperCase())
    // this.console.log(this.newUnidad)
  }
  addCandidatos() {
    this.newUnidad.meeting_id = +this.meeting_id
    this.newUnidad.can_vote = (this.newUnidad.can_vote === true)?1:0
    this.newUnidad.speaker = (this.newUnidad.speaker ===true)?1:0
    this.newUnidad.is_observer = (this.newUnidad.is_observer=== true)?1:0
    this.capitazateStringUnits()
    this.addUnidades.push(this.newUnidad)
    this.newUnidad = new AddUnit('','','','','', '','','',false,false,false,0,1)
    // this.console.log(this.addUnidades)
  }
  setBuild(e:any){
    let ind = e.target["selectedIndex"]-1
    this.newUnidad.building_id =this.builds[ind].id_build
  }
  saveNewUnitsByBuildings(){
    this.addUnidades.forEach((element)=>{
      //@ts-ignore
    delete element.building_name
    })
    // let arrayToSend: any [] =[]
    // arrayToSend.push(this.addUnidades)
    let unitsToSave = JSON.stringify(this.addUnidades)
    let formData3 = new FormData;
    formData3.append('units',unitsToSave)
    formData3.append('meeting_id',this.meeting_id)
    this.serviceToSendMultipleUnits(formData3)
  }
  
  //Metodo para 
  saveBuildings(){
    this.capitazateStringBuildings()
    let buildsToSave = JSON.stringify(this.nombre_unidads2.value)
    let formData2 = new FormData;
    formData2.append('buildings',buildsToSave)
    formData2.append('meeting_id',this.meeting_id)

    this.httpClient.post(this._env.ENDPOINT_PRIMARY + this._env.GESTOR_V2+ 'api/units/updateMultipleBuildings/'+this.token,formData2).subscribe((response:any)=>{
      if (response['success']) {
        swal.fire('mensaje', response['message'], 'success'
        ).then((response:any)=>{
          if(response.isConfirmed){
            window.location.reload()
          }else{
            this.console.log('nada')
          }
        })
      } else {
        swal.fire('mensaje', response['message'], 'info'
        )
      }
    });
  }
  //FInal de la nueva implementacion para adicionar Building//
 
  saveChanges() {
    var units;
    // var button = document.getElementById('button-event');
    this.unitsListbyMeeting.forEach((building: any) => {
      building['units'].forEach((unit: any) => {
        var unitEdit = new UnitEdit(unit['id'], unit['name'], unit['number'], unit['coefficient'], unit['aporte'],unit['can_vote']);
        // var unitEdit = new UnitEdit(unit['id'], unit['sector'], unit['sector_number'], unit['name'], unit['number'], unit['coefficient'], unit['aporte'], unit['can_vote']);
        this.arrayUnitEdit.push(unitEdit);
      });
    });
    
    units = JSON.stringify(this.arrayUnitEdit);
    // this.console.log(units)
    var formData = new FormData;
    formData.append('units', units);
    formData.append('meeting_id',this.meeting_id)
    // this.console.log(formData.getAll('units'))
    this.serviceToSendMultipleUnits(formData)
  }
}
export class AddUnit {
  constructor(public id:string, public building_name:string, String:any,public building_id:string ,public name: string,public number:string,public coefficient: string,public aporte: string,public can_vote: any,public is_observer: any ,public speaker: any, public meeting_id:number, public voter_profile_id:number) {
    this.id='0'
    this.building_id=''
    this.name = name
    this.number = number
    this.coefficient = coefficient
    this.aporte = aporte
    this.can_vote = false
    this.is_observer = false
    this.speaker = false
    this.meeting_id = 0
    this.voter_profile_id = 1
  
  }
}
