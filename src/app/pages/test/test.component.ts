import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { UploadFileFormComponent } from 'src/app/dialogs/upload-file-form/upload-file-form.component';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private _dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openFormDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.minHeight = "400px"
    this._dialog.open(UploadFileFormComponent, dialogConfig)
  }
}
