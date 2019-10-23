import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { UserResponse } from '../model/user-response';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;
  users: User[];
  usersSubject: Subject<User[]>;

  constructor(private http: HttpClient) {

    this.baseUrl = 'http://localhost:8080/api/v1/users';
    this.usersSubject = new Subject<User[]>();

    this.getUsers().subscribe((userResponse: UserResponse) => {
      this.users = userResponse.users;
      this.usersSubject.next(this.users);
    });
  }

  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.baseUrl);
  }

  updateUser(id, user: User) {
    return this.http.put(`${this.baseUrl}/${id}`, user).subscribe((userResponse: User) => {
      const updatedUserIndex = this.users.findIndex((currentUser: User) => currentUser.id === id);
      this.users[updatedUserIndex] = user;
      this.usersSubject.next(this.users);
    });
  }

  save(user) {
    return this.http.post(this.baseUrl, user).subscribe((userResponse: User) => {
      this.users.push(userResponse);
      this.usersSubject.next(this.users);
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
