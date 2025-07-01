import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function isEqual(controlName1: string, controlName2: string){ // validator function that can be used as form group validator
  return (control: AbstractControl) => {
    const controlValue1 = control.get(controlName1)?.value;
    const controlValue2 = control.get(controlName2)?.value;
    if(controlValue1 === controlValue2){
      return null;
    };
    return {valuesMatch: false};
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.minLength(6), Validators.required]
      }),
      confirmPassword: new FormControl('',{validators: [Validators.minLength(6), Validators.required]}),
    }, {validators: [isEqual('password', 'confirmPassword')]}),

    firstName: new FormControl('',{validators: [Validators.required]}),
    lastName: new FormControl('',{validators: [Validators.required]}),
 
    adress: new FormGroup({
      street: new FormControl('',{validators: [Validators.required]}),
      number: new FormControl('',{validators: [Validators.required]}),
      postalCode: new FormControl('',{validators: [Validators.required]}),
      city: new FormControl('',{validators: [Validators.required]}),
    }),

    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student',{validators: [Validators.required]}),
    source: new FormArray([
      new FormControl(false, {validators: [Validators.required]}),
      new FormControl(false, {validators: [Validators.required]}),
      new FormControl(false, {validators: [Validators.required]}),
    ]),
    agree: new FormControl(false,{validators: [Validators.required]}),
  
  });

  get isFormInvalid(){
    return this.form.invalid && this.form.touched;
  }

  onSubmit( ){
    if(this.form.valid){
      console.log(this.form)
    }else{
      console.log('INVALID FORM');
    }
  }

  onReset(){
    this.form.reset();
  }
}
