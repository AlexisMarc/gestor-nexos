import { Component, OnInit } from '@angular/core';
import { SendmailService } from '../../service/sendmail.service';
import { Router } from '@angular/router';
import { Global_Services } from '../../service/global_services';
import swal from 'sweetalert2';
declare var moment: any;


@Component({
  selector: 'app-list-report-email-meeting',
  templateUrl: './list-report-email-meeting.component.html',
  styleUrls: ['./list-report-email-meeting.component.scss']
})
export class ListReportEmailMeetingComponent implements OnInit {
  id_residential:any
  meeting_id:any
  dateTo=''
  dateFrom=''
  data:any[]=[]
  data2=[]
  report=''
  constructor(
    private _emailReportService : SendmailService,
    private router:Router,
    private _global : Global_Services
  ) {
    this.cargaObjeto()
   }

  ngOnInit() {
    if(this.id_residential=='' || this.id_residential ==null){
      this.router.navigate(['/home/searchtoreport'])
    }
    this._global.getMeetingDetails(this.id_residential).subscribe(response=>{
      this.meeting_id  = response['content']['id']
      this.DataAndReport()
    })
  }

  cargaObjeto() {
    let navigation = this.router.getCurrentNavigation();
    if (navigation === null || navigation.extras.skipLocationChange === false) {
    } else {
      let object = navigation!.extras!.state!['example']
      this.id_residential = object
    }
  }

  dataSearch(){
    this.data=[]
    if(this.dateTo!=''&& this.dateFrom!=''){
      this._emailReportService.getReportEmailMailgun(this.id_residential).subscribe(resp=>{
        this.data2=resp.content
        if(resp.content == 0){
          swal.fire({
            title: "Sin Coincidencias!",
            text: "No se encontraron registros entre las fechas propuestas",
            icon: "info"
          });
        }else{
          this.data2.forEach((element:any)=>{
          const date = moment(element.created_at);
          const formattedDate = date.format('YYYY-MM-DD-hh:mm:ss');
          element.created_at = formattedDate
          this.data.push(element)
          this
          })
        }  
      })
    }else{ 
      swal.fire({
            title: '<strong></strong>',
            icon: 'error',
            text:'Falta alguna fecha para el reporte',
            showCloseButton: true,
            
          })
    } 
  }
  DataAndReport(){
    this._emailReportService.getReportEmailMailgun(this.meeting_id).subscribe(response=>{
       this.data = response.content
       this.report =response.url
    })
  }

  downloadReport(){
    window.open(this.report);
  }
} 



