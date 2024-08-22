import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Connect to the Socket.io server
    this.socket = io('wss://socket.tetranscribo.com:3000', { transports: ['websocket'] });
  }

  // Emit an event
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Listen to an event
  public listen(eventName: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }

}