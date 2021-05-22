import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  readonly URL: string = 'http://localhost:3000';

  login(user: User) {
    return this.http.post(`${this.URL}/signin`, user);
  }
}
