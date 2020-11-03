import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  passwordForm: FormGroup;
  editableName: boolean = false;
  nameError: boolean = false;
  name: string = "Mauricio Duran";

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      current: ['', Validators.required], 
      new: ['', Validators.required],
      confirm: ['', Validators.required]
    })
  }

  changePassword(e): void {
    e.preventDefault();
    if(this.passwordForm.valid) {
      console.log("changing pwd");
    } else {
      console.log("Invalid form")
    }
  }

  toggleEditableName(): void {
    if(this.editableName) {
      if(!this.name) {
        this.nameError = true
        return
      } else {
        this.nameError = false;
        console.log("Saving new name");
      }
    }
    this.editableName = !this.editableName;
  }
}
