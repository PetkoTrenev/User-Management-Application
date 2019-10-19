import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../model/user-response';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;

  formData: User;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/v1/users';
  }

  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.baseUrl);
  }

  updateUser(id, user: User) {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  save(user) {
    return this.http.post(this.baseUrl, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
