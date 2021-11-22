import { Injectable } from '@angular/core';
import { alertService } from '../alert-service/alert.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private alertService: alertService
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
      this.alertService.openSnackBar(err.name)
    }
  }

  removeForm(){
    localStorage.removeItem('articleForm');
  }
}
