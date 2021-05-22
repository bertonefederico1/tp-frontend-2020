import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/User';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService
    ) { }

  username: string;
  password: string;

  ngOnInit(): void {
  }

  onLogin(){
    let user: User;
    user = new User(this.username, this.password);
    this.loginService.login(user)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    //this.router.navigate(['/']);
  }

}
