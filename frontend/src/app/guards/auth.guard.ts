import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';
import { TokenService } from '../services/token-service/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.loginService.isLogged()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }

  async canActivateChild(
    childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ) {
      if (!await this.checkToken()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }

  async checkToken() {
    if (await this.tokenService.verifyToken() === 'Token is valid') {
      return true;
    }
    return false;    
  }
  
}
