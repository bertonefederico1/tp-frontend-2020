import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  tokenKey = 'token'

  constructor(
    private localStorageService: LocalStorageService
  ) {
  }

  getToken(){
    return this.localStorageService.get(this.tokenKey);
  }

  setToken(token: any){
    this.localStorageService.set(this.tokenKey, token);
  }

  removeToken(){
    this.localStorageService.remove(this.tokenKey);
  }
}
