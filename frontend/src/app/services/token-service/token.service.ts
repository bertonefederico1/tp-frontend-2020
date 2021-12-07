import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  tokenKey = 'token'
  readonly URL: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getToken(){
    return this.localStorageService.get(this.tokenKey);
  }

  setToken(token: any){
    this.localStorageService.set(this.tokenKey, token);
  }

  removeToken(){
    this.localStorageService.remove(this.tokenKey);
  }

  verifyToken() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.URL}/checkExpirationToken`).subscribe(
        res => resolve(res),
        err => reject(err)
      );
    });
  }


}
