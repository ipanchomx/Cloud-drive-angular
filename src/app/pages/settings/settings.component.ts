import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AuthService } from 'src/app/globals/services/auth.service';
import { SessionService } from 'src/app/globals/services/session.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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
  joined: Date;
  image: string;
  usrId: string;
  showForm = true;

  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(private formBuilder: FormBuilder, private sessionService: SessionService, private authService: AuthService, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      current: ['', Validators.required],
      new: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: this.compararPasswords.bind(this)
    })
    this.usrId = localStorage.getItem('userId')
    //console.log(this.usrId)

    this.sessionService.getUserInfo(this.usrId).then(data => {
      this.name = data.user.name;
      this.email = data.user.email;
      this.joined = data.user.joined;
      this.image = data.user.img + ".jpg";
    })

  }

  changePassword(): void {

    console.log('changePassword:', this.passwordForm.getRawValue())
    if (this.passwordForm.valid) {
      const values = this.passwordForm.getRawValue();
      let obj = {
        email: this.email,
        oldPassword: values.current,
        newPassword: values.new
      };

      this.sessionService.changePassword(obj).then(msg => {   
        //console.log(msg)
        this._snackBar.open(msg.message, "Close", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        this.passwordForm.reset();
        this.showForm = false;
        setTimeout(() => this.showForm = true, 250);
      })
    } else {
      this._snackBar.open("Invalid form", "Close", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    }
  }

  toggleEditableName(): void {
    if (this.editableName) {
      if (!this.name) {
        this.nameError = true
        return
      } else {
        this.nameError = false;
        console.log("Saving new name");
        this.sessionService.changeName(this.name)
        .then(msg =>{
          console.log("Cambiar nombre is okay");
          console.log(msg);
          this._snackBar.open(msg.message, "Close", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          }) 
        })
        .catch(err =>{
          this._snackBar.open(err, "Close", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
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
}
