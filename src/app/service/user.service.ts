import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserResponse} from '../model/user-response';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

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

  updateUserById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  save(user) {
    return this.http.post(this.baseUrl, user);
  }

  deleteById(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
