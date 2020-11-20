import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'
import { UserService } from 'src/app/globals/services/user.service';


@Component({
  selector: 'app-upload-file-form',
  templateUrl: './upload-file-form.component.html',
  styleUrls: ['./upload-file-form.component.scss']
})
export class UploadFileFormComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<UploadFileFormComponent>, private _user: UserService) { }

  fileName: string = '';
  extension: string = '';
  file: File;
  needsVerification = false;
  users: any[];
  fileSharedWith: any[] = [];
  userSearchInput: string = '';
  shareWithInp: string = '';
  permission: string = '';
  currentUser: any;
  subject: BehaviorSubject<string> = new BehaviorSubject('');

  ngOnInit(): void {
    this.subject.pipe(
      debounceTime(100)
    ).subscribe((searchInput) => {
      if (searchInput) {
        this._user.getUsers(searchInput)
          .subscribe((users: any) => {
            this.users = users.results.filter(user => !this.fileSharedWith.find(el => el.id ==user.id));
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
    this.fileSharedWith.push({...this.currentUser, permission: this.permission});
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
    form.append('test', '123');
    form.append('file', this.file, this.fileName);
    form.append('extension', this.extension);
    form.append('needsVerification', this.needsVerification.toString());
    if(this.fileSharedWith) form.append('sharedWith', JSON.stringify(this.fileSharedWith));
    console.log("subbmiting");
    console.log(form);
  }

  onClose() {
    this._dialogRef.close();
  }

}
