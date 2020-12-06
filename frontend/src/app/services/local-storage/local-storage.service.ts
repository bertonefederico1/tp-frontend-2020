import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getForm(){
    let form = JSON.parse(localStorage.getItem('articleForm'));
    return form;
  }

  setForm(form: any){
    try{
      localStorage.setItem('articleForm', JSON.stringify(form));
    }
    catch(err){
      console.log(err);
    }
  }
}
