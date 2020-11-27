import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'
import { FilesService } from 'src/app/globals/services/files.service';
import { UserService } from 'src/app/globals/services/user.service';
import { HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-photo-form',
  templateUrl: './change-photo-form.component.html',
  styleUrls: ['./change-photo-form.component.scss']
})
export class ChangePhotoFormComponent implements OnInit {
  file: File;
  fileName: string = '';
  extension: string = '';
  
  inProgress: boolean = false;
  progress: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<ChangePhotoFormComponent>,
    private _user: UserService,
    private _files: FilesService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onClose() {
    this._dialogRef.close();
  }


  onFileChange(event) {
    this.file = <File>event.target.files[0];
    console.log(this.file);
    if(!this.file.type.startsWith('image')){
      const snack = this._snackBar.open(`Invalid file type`, "Close", {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })

      snack._dismissAfter(3000);
      return;
    }
    if (this.file) {
      const fileExtIndex = this.file.name.lastIndexOf('.');
      this.fileName = this.file.name.slice(0, fileExtIndex);
      this.extension = this.file.name.slice(fileExtIndex);
    }
  }
  
  changePhoto() {
    let form = new FormData();

    form.append('extension', this.extension);
    form.append('file', this.file, this.fileName);
    
    this.inProgress = true;

    this._user.changePhoto(form).subscribe((response: any) => {
      this.inProgress = false;
      const snack = this._snackBar.open("Profile pic updated successfully", "Close", {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })

      snack._dismissAfter(3000);
      this.onClose()

    }, error => {
      console.log(error);
      this.inProgress = false;
      const snack = this._snackBar.open(`Unable to Update Profile pic - ${error.error.message}`, "Close", {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })

      snack._dismissAfter(3000);
    })

  }
}
