import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/User';
import { LoginService } from 'src/app/services/login/login.service';
import { TokenService } from 'src/app/services/token-service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private tokenService: TokenService
    ) { }

    @ViewChild('inputUsername') inputUsername: any;

  username: string;
  password: string;

  onLogin(){
    let user: User;
    user = new User(this.username, this.password);
    this.loginService.login(user)
      .subscribe(
        res => {
          this.tokenService.setToken(res['token']);
          this.router.navigate(['/clients']);
        },
        err => {
          alert(err.error);
          this.username = '';
          this.password = '';
          this.inputUsername.nativeElement.focus();
        }
      )
  }

}
