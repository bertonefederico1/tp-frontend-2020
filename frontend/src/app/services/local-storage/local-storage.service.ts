import { Injectable } from '@angular/core';
import { ErrorService } from '../error-service/error.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private errorService: ErrorService
  ) { }

  getForm(){
    const form = JSON.parse(localStorage.getItem('articleForm'));
    return form;
  }

  setForm(form: any){
    try{
      localStorage.setItem('articleForm', JSON.stringify(form));
    }
    catch (err){
      this.errorService.openSnackBar(err.name)
    }
  }

  removeForm(){
    localStorage.removeItem('articleForm');
  }
}
