import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'
import { FilesService } from 'src/app/globals/services/files.service';
import { UserService } from 'src/app/globals/services/user.service';
import { HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-file-form',
  templateUrl: './upload-file-form.component.html',
  styleUrls: ['./upload-file-form.component.scss']
})
export class UploadFileFormComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<UploadFileFormComponent>,
    private _user: UserService,
    private _files: FilesService,
    private _snackBar: MatSnackBar) { }

  file: File;
  fileName: string = '';
  extension: string = '';
  needsVerification = false;
  users: any[];
  fileSharedWith: any[] = [];
  userSearchInput: string = '';
  shareWithInp: string = '';
  permission: string = '';
  currentUser: any;
  subject: BehaviorSubject<string> = new BehaviorSubject('');
  inProgress: boolean = false;
  progress: number = 0;

  ngOnInit(): void {
    this.subject.pipe(
      debounceTime(100)
    ).subscribe((searchInput) => {
      if (searchInput) {
        this._user.getUsers(searchInput)
          .subscribe((users: any) => {
            this.users = users.results.filter(user => !this.fileSharedWith.find(el => el.id == user.id));
          })
      }
    })
  }

  selectCurrentUser(user: any) {
    this.currentUser = user;
  }

  addUserToSharedList() {
    if (!this.permission || !this.currentUser) {
      return
    }
    this.fileSharedWith.push({ ...this.currentUser, permission: this.permission });
    this.currentUser = null;
    this.permission = '';
    this.shareWithInp = '';
    this.users = [];
  }

  displayFn(user: any) {
    return user && user.email;
  }



  onFileChange(event) {
    this.file = <File>event.target.files[0];
    if (this.file) {
      const fileExtIndex = this.file.name.lastIndexOf('.');
      this.fileName = this.file.name.slice(0, fileExtIndex);
      this.extension = this.file.name.slice(fileExtIndex);
    }
  }

  searchUsers(e) {
    this.subject.next(e.target.value)
  }

  remove(idx: number) {
    this.fileSharedWith.splice(idx, 1);
  }

  uploadFile() {
    let form = new FormData();

    form.append('extension', this.extension);
    form.append('needsVerification', this.needsVerification.toString());
    form.append('sharedWith', JSON.stringify(this.fileSharedWith));
    form.append('file', this.file, this.fileName);
    form.append('path', this.data.path);
    this.inProgress = true;

    this._files.upload(form).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = event.loaded / event.total;
      } else if (event.type === HttpEventType.Response) {
        console.log(event);
        this._dialogRef.close();
        this.progress = 0;
        this.inProgress = false;
        this._snackBar.open("File uploaded successfully", "Close", {
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      }
    }, error => {
      console.log(event);
      this.inProgress = false;
      this._snackBar.open(`Unable to Upload File - ${error.error.message}`, "Close", {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    })

  }

  onClose() {
    this._dialogRef.close();
  }

}
