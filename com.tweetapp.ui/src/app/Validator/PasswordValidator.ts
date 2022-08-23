import { FormControl, FormGroup, NgForm, FormGroupDirective, ValidatorFn, AbstractControl } from '@angular/forms';

export function PasswordValidator(form:FormGroup): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if(form.controls['password'].value==form.controls['retypePassword'].value){
      // console.log('match');
      return null;
    }
    else{
      // console.log('no match');
      return {noMatch:true}
    }
    // if (control.value== '') return null;
    // let re = new RegExp('^[a-zA-Z ]*$');
    // if (re.test(control.value)) {
    //   return null;
    // } else {
    //   return { onlyChar: true };
    // }
  };
}