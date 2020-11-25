import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilesService } from 'src/app/globals/services/files.service';

@Component({
  selector: 'app-create-folder-form',
  templateUrl: './create-folder-form.component.html',
  styleUrls: ['./create-folder-form.component.scss']
})
export class CreateFolderFormComponent implements OnInit {
  dirName: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<CreateFolderFormComponent>,
    private _files: FilesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onClose() {
    this._dialogRef.close();
  }
  
  createFolder() {
    this._files.createFolder({ path: this.data.path, dirName: this.dirName })
      .then(res => {
        this._dialogRef.close();
      })
      .catch(error => {
        const snackbarRef = this._snackBar.open(`Unable to Create Folder- ${error.error.message}`, "Close", {
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
        snackbarRef._dismissAfter(3000);
      })



  }

}
