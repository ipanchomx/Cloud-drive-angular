import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  socketClient;
  constructor() { }

  connect(token, userId) {
    this.socketClient = socketIo.io(environment.socketUrl, {
      transportOptions: {
        polling: {
          extraHeaders: {
            'Authorization': token,
            'UserId': userId
          }
        }
      }
    });
  }

  on(eventName, callback) {
    this.socketClient.on(eventName, callback);
  }

  emit(eventName, data) {
    this.socketClient.emit(eventName, data);
  }

  disconnect() {
    if(this.socketClient && this.socketClient.connected) {
      this.socketClient.disconnect();
    }
  }
}
