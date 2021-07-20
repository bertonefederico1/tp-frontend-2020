import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getForm(){
    const form = JSON.parse(localStorage.getItem('articleForm'));
    return form;
  }

  setForm(form: any){
    try{
      localStorage.setItem('articleForm', JSON.stringify(form));
    }
    catch (err){
      console.log(err);
    }
  }

  removeForm(){
    localStorage.removeItem('articleForm');
  }
}
