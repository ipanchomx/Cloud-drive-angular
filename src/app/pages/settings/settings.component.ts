import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/globals/services/auth.service';
import { SessionService } from 'src/app/globals/services/session.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


import { ChangePhotoFormComponent } from 'src/app/dialogs/change-photo-form/change-photo-form.component'
import { SocketsService } from 'src/app/globals/services/sockets.service';
import { SocialAuthService } from 'angularx-social-login';
import { UserService } from 'src/app/globals/services/user.service';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  passwordForm: FormGroup;
  editableName: boolean = false;
  nameError: boolean = false;
  name: string;
  darkMode: boolean = false;
  email: string;
  joined: string;
  image: string;
  usrId: string;
  showForm = true;

  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(
    private formBuilder: FormBuilder, 
    private sessionService: SessionService, 
    private authService: AuthService, 
    private _snackBar: MatSnackBar, 
    private router: Router, 
    private socketsService: SocketsService,
    private _matDialog: MatDialog,
    private googleAuthService: SocialAuthService,
    private _user: UserService
    ) { }


  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      current: ['', Validators.required],
      new: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: this.compararPasswords.bind(this)
    })
    this.usrId = this.authService.getUserId();

    this.getUserInfo();

  }

  changePassword(): void {

    if (this.passwordForm.valid) {
      const values = this.passwordForm.getRawValue();
      let obj = {
        oldPassword: values.current,
        newPassword: values.new
      };

      this._user.changePassword(obj)
      .then(msg => {
        //console.log(msg)
        const snack = this._snackBar.open(msg.message, "Close", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        snack._dismissAfter(3000);
        this.passwordForm.reset();
        this.showForm = false;
        setTimeout(() => this.showForm = true, 250);
      })
      .catch(err => {
        const snack = this._snackBar.open(err.error.message, "Close", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        snack._dismissAfter(3000);
      })

    } else {
      const snack = this._snackBar.open("Invalid form", "Close", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
      snack._dismissAfter(3000);
    }
  }

  toggleEditableName(): void {
    if (this.editableName) {
      if (!this.name) {
        this.nameError = true
        return
      } else {
        this.nameError = false;
        this.sessionService.changeName(this.name)
          .then(msg => {
            const snack = this._snackBar.open(msg.message, "Close", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            })
            snack._dismissAfter(3000);
          })
          .catch(err => {
            const snack = this._snackBar.open(err, "Close", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            })
            snack._dismissAfter(3000);
          })
      }
    }
    this.editableName = !this.editableName;
  }


  compararPasswords() {
    if (!this.passwordForm) { return null; }
    const values = this.passwordForm.getRawValue();
    if (values.new === values.confirm) {
      return null;
    } else {
      return { mismatch: true }
    }
  }

  changePhoto() {
    // alert('Change photo');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "300";
    dialogConfig.width = "40%"
    dialogConfig.minWidth = "360px";
    dialogConfig.minHeight = "300px"
    dialogConfig.data = {
    }

    const dialogRef = this._matDialog.open(ChangePhotoFormComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(result => {
        this.getUserInfo();
      });
  }

  getUserInfo() {
    this._user.getUserInfo(this.usrId).then(data => {
      this.name = data.user.name;
      this.email = data.user.email;
      this.joined = new Date(data.user.joined).toLocaleDateString();
      this.image = data.user.img;
    })
  }
  
  openDeleteDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "250px";
    dialogConfig.width = "500px"
    dialogConfig.data = {
      name: this.email,
      deleteFunction: ()=>{this.deleteUser()}
    }

     this._matDialog.open(DeleteDialogComponent, dialogConfig);
  }

  deleteUser() {
    this._user.deleteUser().subscribe(res => {
      this.socketsService.disconnect();
      this.authService.clear();
      this.router.navigate(['/home']);
      this.googleAuthService.signOut(true)
      .then(()=>{})
      .catch(()=>{})
    }, err => {
      const snack = this._snackBar.open("Could not delete user at this moment.", "Close", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
      snack._dismissAfter(3000);
    })
  }


}
