import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationsComponent } from 'src/app/dialogs/notifications/notifications.component';

export interface notification {
  message: string;
  date: Date;
  emiterEmail: string;
  fileName: string;
}
import { SessionService } from '../../services/session.service';
import { SocialAuthService } from 'angularx-social-login';
import { SocketsService } from '../../services/sockets.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;

  name: string= "";
  // notifications: notification[] = [
  //   {
  //     message: 'shared a file with you',
  //     date: new Date(),
  //     emiterEmail: 'ejemplo@gmail.com',
  //     fileName: 'presupuesto.xxl'
  //   },
  //   {
  //     message: 'shared a file with you',
  //     date: new Date(),
  //     emiterEmail: 'ej2@gmail.com',
  //     fileName: 'img.png'
  //   },
  //   {
  //     message: 'updated a file',
  //     date: new Date(),
  //     emiterEmail: 'amoLosGatos@gmail.com',
  //     fileName: 'ensayoGatos.docx'
  //   },
  //   {
  //     message: 'shared a file with you',
  //     date: new Date(),
  //     emiterEmail: 'amoLosGatos@gmail.com',
  //     fileName: 'ensayoGatos.docx'
  //   },
  //   {
  //     message: 'commented on a file',
  //     date: new Date('11/23/20'),
  //     emiterEmail: 'panchito@gmail.com',
  //     fileName: 'precios.xxl'
  //   }
  // ];
  noSize = 0;



  constructor(private authService: AuthService,
    private router: Router,
    private _matDialog: MatDialog,
    private sessionService: SessionService,
    private googleAuthService: SocialAuthService,
    private socketsService: SocketsService
  ) {

  

    this.sessionService.getUserInfo(this.authService.getUserId())
    .then(user =>{
      this.name = user.user.name;
    })

    this.authService.loginStatus.subscribe(status => {
      this.isLoggedIn = status;
    });

  }

  ngOnInit(): void {
    // this.noSize = this.notifications.length;
    if (this.authService.isLoggedIn()) {
      console.log("Logged")

      this.socketsService.on('notification', (data) => {
        this.noSize += 1;
      })
    }

  }

  logout() {
    this.sessionService.logout()
      .then((res) => {
        this.socketsService.disconnect();
        this.authService.clear();
        return this.googleAuthService.signOut(true);
      })
      .then((res) => {
        this.router.navigate(['/home']);
      })
      .catch(err => {
        this.router.navigate(['/home']);
      })
  }

  openNotifications() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = "40px";
    dialogConfig.minHeight = "10px";
    dialogConfig.position = { top: '50px', right: '50px' };
    dialogConfig.data = { name: this.name };

    const dialogRef = this._matDialog.open(NotificationsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.noSize = 0;
      //delete notifications
    });

  }

}
