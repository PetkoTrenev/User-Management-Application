import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {BsDatepickerConfig, DatepickerConfig} from 'ngx-bootstrap';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  validMessage: string;
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.datePickerConfig = Object.assign({}, {
      dateInputFormat: 'YYYY-DD-MM'
    });
  }


  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  submitRegistration() {
    if (this.userForm.valid) {
      this.userService.save(this.userForm.value).subscribe(result => this.gotoUserList());

    } else {
      this.validMessage = 'Please fill out the form, before submitting.';
    }
  }

  private gotoUserList() {
    this.router.navigate(['/users']);
  }
}
