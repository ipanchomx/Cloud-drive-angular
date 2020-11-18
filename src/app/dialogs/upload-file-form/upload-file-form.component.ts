import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-upload-file-form',
  templateUrl: './upload-file-form.component.html',
  styleUrls: ['./upload-file-form.component.scss']
})
export class UploadFileFormComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<UploadFileFormComponent>) { }

  fileName: string = '';
  extension: string = '';
  file: File;
  needsVerification = false;

  ngOnInit(): void {
  }

  onFileChange(event) {
    this.file = <File>event.target.files[0];
    if (this.file) {
      const fileExtIndex = this.file.name.lastIndexOf('.');
      this.fileName = this.file.name.slice(0, fileExtIndex);
      this.extension = this.file.name.slice(fileExtIndex);
    }
  }

  onClose() {
    this._dialogRef.close();
  }

}
