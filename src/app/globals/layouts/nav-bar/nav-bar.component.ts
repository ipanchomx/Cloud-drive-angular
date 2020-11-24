import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import{NotificationsComponent} from 'src/app/dialogs/notifications/notifications.component';

export interface notification {
  message: string;
  date: Date;
  emiterEmail: string;
  fileName: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn:boolean = false;
  
  name = "anai";
  notifications: notification[] = [
    {
      message: 'shared a file with you',
      date: new Date(),
      emiterEmail: 'ejemplo@gmail.com',
      fileName: 'presupuesto.xxl'
    },
    {
      message: 'shared a file with you',
      date: new Date(),
      emiterEmail: 'ej2@gmail.com',
      fileName: 'img.png'
    },
    {
      message: 'updated a file',
      date: new Date(),
      emiterEmail: 'amoLosGatos@gmail.com',
      fileName: 'ensayoGatos.docx'
    },
    {
      message: 'shared a file with you',
      date: new Date(),
      emiterEmail: 'amoLosGatos@gmail.com',
      fileName: 'ensayoGatos.docx'
    },
    {
      message: 'commented on a file',
      date: new Date('11/23/20'),
      emiterEmail: 'panchito@gmail.com',
      fileName: 'precios.xxl'
    }
  ];
  noSize = this.notifications.length; 
  
  constructor(private authService: AuthService, private router: Router,private _matDialog: MatDialog) { 

    this.authService.loginStatus.subscribe(status=>{
      this.isLoggedIn = status;
    });

  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.clear();
    this.router.navigate(['/home']);
  }

  openNotifications() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = "20px";
    dialogConfig.minHeight = "10px";
    dialogConfig.position = { top: '50px', right: '50px' };
    dialogConfig.data =  {notifications: this.notifications, name: this.name};

    const dialogRef = this._matDialog.open(NotificationsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.noSize = 0;
    });

  }

}
