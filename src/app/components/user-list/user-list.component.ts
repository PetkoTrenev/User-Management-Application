import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {UserResponse} from '../../model/user-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userResponse: UserResponse;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.refreshUsers();
  }

  refreshUsers() {

    this.userService.getUsers().subscribe(data => {
      this.userResponse = data;
    });
  }

  deleteUser(id) {
    this.userService.deleteById(id).subscribe(() => {
      this.refreshUsers();
    });

  }

  showDetails(id) {
    this.router.navigate(['details', id]);
  }

}
