import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../service/notification.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<AddUserComponent>) {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }


  ngOnInit() {

  }

  submitRegistration() {
    if (this.userForm.valid) {
      this.userService.save(this.userForm.value).subscribe(() => {
        this.notificationService.success('Submitted successfully');
        this.dialogRef.close();
      });
    }
  }

  onClear() {
    this.userForm.reset();
  }

  onClose() {
    this.dialogRef.close();
  }
}
