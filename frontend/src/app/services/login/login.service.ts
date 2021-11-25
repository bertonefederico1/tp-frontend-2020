import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/User';
import { TokenService } from '../token-service/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  readonly URL: string = 'http://localhost:3000';

  login(user: User) {
    return this.http.post(`${this.URL}/signin`, user);
  }

  isLogged() {
    return !!this.tokenService.getToken();
  }
}
