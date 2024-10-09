import { inject, Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { ConfigurationRestService } from './configuration.rest.service';
import { Observable } from 'rxjs';
import { EnvServiceService } from '@env';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private _env = inject(EnvServiceService)
  socket: any;

  constructor(
    private config: ConfigurationRestService
  ) {
    this.socket = io(this._env.ENDPOINT_SOCKET, { transports: ['websocket'] });
  }

  public listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data:any) => {
        subscriber.next(data);
      })
    });
  }

  public removeListen(eventName: string) {
    this.socket.removeAllListeners(eventName);
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

}