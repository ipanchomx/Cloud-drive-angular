import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/globals/services/user.service';

export interface notification {
  _id: string;
  date: Date;
  emitterEmail: string;
  emitterUserId: string;
  fileId: string;
  fileName: string;
  message: string;
}


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  
  notifications: notification[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialogRef: MatDialogRef<NotificationsComponent>,
    private userService: UserService,
    private router: Router
    ) { }


  ngOnInit(): void {  
    console.log(this.data)
    this.userService.getNotifications().subscribe( (notifications: notification[])=> {
      this.notifications = notifications;
    })

  }

  onClose(): void {
    this.dialogRef.close();
  }

  deleteThisNotification(notification){
    console.log("Borrando...");
    this.userService.deleteNotification(notification._id).subscribe( (res)=>{
      this.router.navigate(['/file-info',notification.fileId])
      this.onClose();
    },(err)=>{
      console.log("Error deleting file");
    })
  }

}
