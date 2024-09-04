import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SocketService } from '../../service/socket.service';
import format from 'date-fns/format'
// import { Global_Services } from '../services/global_services';
import { WhatsappService } from '../../service/whatsaap_services';
import { sub } from 'date-fns';

@Component({
  selector: 'app-side-whatsapp',
  templateUrl: './side-whatsapp.component.html',
  styleUrls: ['./side-whatsapp.component.scss']
})
export class SideWhatsappComponent implements OnInit {

  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  searchText!: string;
  token:any
  conversations:any [] =[]
  mensajes:any[] = []

  get filteredConversations() {
    return this.conversations.filter((conversation) => {
      return (
        conversation.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        conversation.latestMessage
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    });
  }

  constructor(
    
    private socket:SocketService,
    private _WhatsappService : WhatsappService
  ) {
    this.token = (JSON.parse(sessionStorage.getItem('user')!)! as any).content.token 
    this.conversations = []
    this.mensajes = []
    this.CargaDeMensajesInicial()
  }
  
  DateFormate(resp:any){
    const fecha = new Date(resp);
      const fechaRestada = sub(fecha, { hours: 5 });
      const horaFormateada = format(fechaRestada, 'HH:mm');
      return horaFormateada
  }

  DateFormate2(resp:any){
    const fecha = new Date(resp);
      const fechaRestada = sub(fecha, { hours: 5 });
      const horaFormateada = format(fechaRestada, 'yy-MM-dd HH:mm');
      return horaFormateada
  }

  formatearFecha(fechaCompleta: string): string {
    const fecha = new Date(fechaCompleta);
    return format(fecha, 'yy-MM-dd HH:mm');
  }

  VerificacionUserSidebarSocket(resp:any){
    const existingConversationIndex = this.conversations.findIndex(conversation => conversation.name === resp.sender);

    if (existingConversationIndex !== -1) {
      // Si ya existe una conversación con el mismo nombre, reemplázala
      this.conversations.splice(existingConversationIndex, 1);
      this.conversations.unshift({name: resp.sender,time: this.DateFormate2(resp.date_sent),latestMessage: resp.message,});
    } else {
      // Si no existe, agrégala a la lista
      this.conversations.unshift({'name': resp.sender, 'time': this.DateFormate2(resp.date_sent), 'latestMessage': resp.message});
    }
  }

  ngOnInit(): void {

    this.socket.listen('alert_chat_message_'+this.token).subscribe(resp=>{
      this.lastMessageToUser(resp)
      // this.conversations.push({'name':resp.sender,'time':this.DateFormate(resp),'latestMessage':resp.message})
    })

    this.socket.listen('alert_chat_message_read_'+this.token).subscribe(resp2=>{
      // console.log(resp2)
    })
  }

  lastMessageToUser(resp:any) {

    const existingConversationIndex = this.conversations.findIndex(conversation => conversation.recipient_id === resp.recipient_id);
    if (existingConversationIndex !== -1) {
      this.conversations[existingConversationIndex].latestMessage = resp.message
      this.conversations[existingConversationIndex].time = this.DateFormate2(resp.date_sent)
      let person = (resp.person = 'me')? true : false
      this.conversations[existingConversationIndex].message.messages.unshift({id:this.conversations.length+1,body:resp.message,time:this.DateFormate2(resp.date_sent),me:person})
      this.conversations.unshift(this.conversations[existingConversationIndex])
      this.conversations.splice(existingConversationIndex+1, 1);
    } else {
      this.VerificacionLastMessage(resp)
    }
  }

  VerificacionLastMessage(resp:any){
    const existingConversationIndex = this.conversations.findIndex(conversation => conversation.recipient_id === resp.recipient_id);
    if (existingConversationIndex !== -1) {
      // Si ya existe una conversación con el mismo nombre, reemplázala
      this.conversations.splice(existingConversationIndex, 1);
      this.conversations.push({'name': resp.name_customer,'recipient_id':resp.recipient_id,'time': this.formatearFecha(resp.message.message_date), 'latestMessage': resp.message.body});
    } else {
      // Si no existe, agrégala a la lista
      this.conversations.push({'name': resp.name_customer,'recipient_id':resp.recipient_id,'time': this.formatearFecha(resp.message.message_date), 'latestMessage': resp.message.body});
    }
  }

  BuildingMessages(date:any, name:any,index:any) {
    let messages:any = [];
    let i = -1;
    const existingConversationIndex = this.conversations.findIndex(conversation => conversation.name === name);
    if (existingConversationIndex !== -1) {
      date.forEach((element:any) => {
        i=i+1
        this.mensajes.push([{ 'created_at': element.created_at }])
        element.messages.forEach((elem:any, ind:any) => {
          // console.log({id:ind,body:elem.body,time:this.formatearFecha(elem.message_date),person:elem.person})
          messages.unshift({id:ind,body:elem.body,time:this.formatearFecha(elem.message_date),person:elem.person})
        
        });
        this.mensajes[index].push({messages})
        let transformedData = {
          created_at: this.mensajes[index][0].created_at,
          messages: Array.isArray(this.mensajes[index][1].messages)
            ? this.mensajes[index][1].messages.map((message:any) => ({
                id: message.id + 1,
                body: message.body,
                time: message.time,
                me: message.person === "me" ? true : false
              }))
            : []
        };
        this.conversations[existingConversationIndex].message = transformedData
      });
      //  console.log(this.conversations[existingConversationIndex])
    } else {
    }
    // console.log(this.conversations[existingConversationIndex])
  }

  CargaDeMensajesInicial(){
    this._WhatsappService.initialDataLoad().subscribe((resp:any)=>{
      if(resp.success == true){
        resp.content.forEach((element:any,index:any) => {
          // console.log(element.recipient_id)
          this.VerificacionLastMessage(element)
          this.BuildingMessages(element.dates,element.name_customer,index)
        });
      }else{
      }
    })
  }
}
