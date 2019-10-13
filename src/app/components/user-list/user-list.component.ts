import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {UserResponse} from '../../model/user-response';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userResponse: UserResponse;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      // @ts-ignore
      this.userResponse = data;
    });
  }

}
