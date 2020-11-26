import { Component } from '@angular/core';
import { AuthService } from './globals/services/auth.service';
import { SocketsService } from './globals/services/sockets.service';
import { UserService } from './globals/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cloud-Drive';

  constructor(private authService: AuthService, private _socket: SocketsService){
    if(this.authService.isLoggedIn()){
      this._socket.connect(this.authService.get(), this.authService.getUserId());
    }
  }
}
