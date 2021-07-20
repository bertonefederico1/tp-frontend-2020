import { FormGroup } from "@angular/forms";

export interface Strategy{
    
    sendItem(form: FormGroup, id: number): void;
}