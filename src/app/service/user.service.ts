import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserResponse} from '../model/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/v1/users';
  }

  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.baseUrl);
  }
}
