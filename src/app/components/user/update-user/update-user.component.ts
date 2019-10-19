import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<UpdateUserComponent>) { }

  ngOnInit() {
    console.log(this.data)
    this.userForm = new FormGroup({
      id: new FormControl(this.data.id),
      firstName: new FormControl(this.data.firstName, Validators.required),
      lastName: new FormControl(this.data.lastName, Validators.required),
      dateOfBirth: new FormControl(this.data.dateOfBirth, Validators.required),
      email: new FormControl(this.data.email, Validators.required)
    });
  }

  updateUser() {
    this.userService.updateUser(this.data.id, this.userForm.value)
      .subscribe( () => {
          this.dialogRef.close();
        }
      );
  }

  onClear() {
    this.userForm.reset();
  }

  onClose() {
    this.dialogRef.close();
  }

}
