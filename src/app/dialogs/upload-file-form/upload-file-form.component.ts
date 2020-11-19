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
  userSearchInput: string = '';
  subject: BehaviorSubject<string> = new BehaviorSubject('');

  ngOnInit(): void {
    this.subject.pipe(
      debounceTime(100)
    ).subscribe((searchInput) => {
      if(searchInput){
        this._user.getUsers(searchInput)
          .subscribe((users: any)=> { 
            console.log(users);
            this.users = users.results;
           })
      }
    })
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
    this.users.splice(idx, 1);
  }

  onClose() {
    this._dialogRef.close();
  }

}
