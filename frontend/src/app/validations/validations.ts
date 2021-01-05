import { AbstractControl } from '@angular/forms';

export function isNumber(control: AbstractControl){
    if (isNaN(parseInt(control.value,  10))){
        return { validUrl: true };
    }
    else{
        return null;
    }
}
