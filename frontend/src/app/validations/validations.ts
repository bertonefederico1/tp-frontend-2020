import { AbstractControl } from '@angular/forms';

export function isNumber(control: AbstractControl){
    if(isNaN(parseInt(control.value))){
        console.log("no");
        return { validUrl: true };
    }
    else{
        console.log("si")
        return null;
    }
}