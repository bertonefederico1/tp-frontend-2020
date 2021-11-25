import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { TokenService } from 'src/app/services/token-service/token.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(
    private router: Router,
    private alertService: AlertService,
    private tokenService: TokenService
  ) { }

  async logout(){
    if(await this.alertService.confirm('Are you sure you want to log out?')) {
      this.tokenService.removeToken();
      this.router.navigate(['/login']);
    };
  }

}
