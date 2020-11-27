import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'
import { SocketsService } from 'src/app/globals/services/sockets.service';
import { UserService } from 'src/app/globals/services/user.service';

@Component({
  selector: 'app-share-file-dialog',
  templateUrl: './share-file-dialog.component.html',
  styleUrls: ['./share-file-dialog.component.scss']
})
export class ShareFileDialogComponent implements OnInit {
  inProgress: boolean = false;
  sharedWith: any[] = [];
  permission: string = "read";
  currentUser: any;
  shareWithInp: string = '';
  users: any[] = [];
  subject: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<ShareFileDialogComponent>,
    private _snackBar: MatSnackBar,
    private _user: UserService,
    private _sockets: SocketsService
  ) { }

  ngOnInit(): void {
    this.sharedWith =  this.data.file.sharedWith.map(user=>({email:user.email, permission:user.permission, userId: user.userId}));

    this._sockets.on("OK", (data)=>{
      console.log("OK sharing was successfull")
    })
    this.subject.pipe(
      debounceTime(100)
    ).subscribe((searchInput) => {
      if (searchInput) {
        this._user.getUsers(searchInput)
          .subscribe((users: any) => {
            this.users = users.results.filter(user => !this.sharedWith.find(el => el.email == user.email));
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
    this.sharedWith.push({ email:this.currentUser.email, userId: this.currentUser.id, permission: this.permission});
    this.currentUser = null;
    this.permission = '';
    this.shareWithInp = '';
    this.users = [];
  }

  displayFn(user: any) {
    return user && user.email;
  }

  searchUsers(e) {
    this.subject.next(e.target.value)
  }

  remove(idx: number) {
    this.sharedWith.splice(idx, 1);
  }

  shareFile() {
    this._sockets.emit('notification', {file: this.data.file, sharedWith:this.sharedWith, type: "share"});
    const snack = this._snackBar.open("File successfully shared", "Close ");
    snack._dismissAfter(3000);
    this.onClose();
  }

  onClose() {
    this._dialogRef.close();
  }

}
