import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<NotificationsComponent>) { }


  ngOnInit(): void {
    console.log(this.data)
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
