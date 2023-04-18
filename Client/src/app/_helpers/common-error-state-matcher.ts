import { ErrorStateMatcher } from "@angular/material/core";
import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";

export class CommonErrorStateMatcher implements ErrorStateMatcher
{
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return form && control && control.invalid && (control.dirty || control.touched || form.submitted);
        // return control.invalid && control.dirty;
    }
}