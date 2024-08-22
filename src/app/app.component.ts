import { Component} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { SocketService } from './@pages/layouts/Nexos/service/socket.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  constructor(private httpClient:HttpClient, private socketService: SocketService){
    
  }


}
