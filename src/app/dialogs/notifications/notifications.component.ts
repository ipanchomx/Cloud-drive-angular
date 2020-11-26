import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/globals/services/user.service';

export interface notification {
  message: string;
  date: Date;
  emiterEmail: string;
  fileName: string;
}


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialogRef: MatDialogRef<NotificationsComponent>,
    private userService: UserService
    ) { }


  ngOnInit(): void {
    console.log(this.data)
    this.userService.getNotifications().subscribe(notifications=> {
      console.log(notifications);
    })

  }

  onClose(): void {
    this.dialogRef.close();
  }

}
