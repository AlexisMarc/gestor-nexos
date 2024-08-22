import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WhatsappService } from '../../service/whatsaap_services';
import format from 'date-fns/format';
import { sub } from 'date-fns';

@Component({
  selector: 'app-chat-whatsapp',
  templateUrl: './chat-whatsapp.component.html',
  styleUrls: ['./chat-whatsapp.component.scss']
})
export class ChatWhatsappComponent implements OnInit {
  @Input() conversation;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  emojiPickerVisible;
  message = '';
  constructor(
    private _whatsappService:WhatsappService
  ) {
    
  }

  ngOnInit(): void {
  }

  submitMessage(event) {
    let value = event.target.value.trim();
    this.message = '';
    if (value.length < 1) return false;
    this.conversation.latestMessage = value;
    let data ={"number_id": '136873486179650',"phone_receiver":this.conversation.recipient_id,"message":value }
    this._whatsappService.postSendMessageToClient(data).subscribe(resp=>{
    })
    // this.conversation.message.messages.unshift({
    //   id: 1,
    //   body: value,
    //   time: this.DateFormate(),
    //   me: true,
    // });
  }

  DateFormate(){
    const fecha = new Date();
      const fechaRestada = sub(fecha, { hours: 0 });
      const horaFormateada = format(fechaRestada, 'yy-MM-dd HH:mm');
      return horaFormateada
  }

  emojiClicked(event) {
    this.message += event.emoji.native;
  }
}
