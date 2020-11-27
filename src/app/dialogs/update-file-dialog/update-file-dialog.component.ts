import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { File as FileInt } from 'src/app/globals/models/file.model';
import { FilesService } from 'src/app/globals/services/files.service';
import { SocketsService } from 'src/app/globals/services/sockets.service';

@Component({
  selector: 'app-update-file-dialog',
  templateUrl: './update-file-dialog.component.html',
  styleUrls: ['./update-file-dialog.component.scss']
})
export class UpdateFileDialogComponent implements OnInit {

  fileInfo: FileInt;
  file: File;
  fileName: string = '';
  extension: string = '';
  inProgress: boolean = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<UpdateFileDialogComponent>,
    private _files: FilesService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _sockets: SocketsService
  ) { }



  ngOnInit(): void {
    this.fileInfo = this.data.file;
  }
  onFileChange(event) {
    this.file = <File>event.target.files[0];
    if (this.file) {
      const fileExtIndex = this.file.name.lastIndexOf('.');
      this.fileName = this.file.name.slice(0, fileExtIndex);
      this.extension = this.file.name.slice(fileExtIndex);
    }
  }


  updateFile(event) {
    event.preventDefault();
    let form = new FormData();

    const originalExtensionIdx = this.fileInfo.fileName.lastIndexOf('.');
    const originalExtension = this.fileInfo.fileName.substring(originalExtensionIdx);

    if(this.extension != originalExtension) {
      const snack = this._snackBar.open(`Unable to Update File - File extension has to be the same as current version`, "Close", {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      snack._dismissAfter(3000);
      return;
    }

    if(!this.file) {
      const snack = this._snackBar.open(`Unable to Update File - No file added`, "Close", {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })

      snack._dismissAfter(3000);
    }
 
    form.append('fileInfo', JSON.stringify(this.fileInfo));
    form.append('extension', this.extension);
    form.append('file', this.file, this.fileInfo.fileName);

    this.inProgress = true;

    this._files.updateFile(form).subscribe((response: any) => {
      this.inProgress = false;
      this.router.navigate(['/file-info', response._id]);
      const snack = this._snackBar.open("File updated successfully", "Close", {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
      this._sockets.emit('newVersion', {file: this.data.file});
      this._snackBar.open("File updated!", "Close ")
      snack._dismissAfter(3000);
      this.onClose()

    }, error => {
      console.log(error);
      this.inProgress = false;
      const snack = this._snackBar.open(`Unable to Update File - ${error.error.message}`, "Close", {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })

      snack._dismissAfter(3000);
    })
  }

  onClose() {
    this._dialogRef.close();
  }
}
