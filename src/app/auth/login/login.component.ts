import { Component, DestroyRef, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

// custom validator function
export function isContainQuestionMark(control: AbstractControl){
  return control.value.includes("?") ? null : { doesNotContainQuestionMark: true}
}
// custom async validator function
export function isEmailUnique(control: AbstractControl){
  if(!['test@gmail.com'].includes(control.value)){
    return of(null);
  }
  return of({notUnique: true})
}

// load email from local storage if there is a catched one there
let initialEmailValue = '';
const catchedEmail = window.localStorage.getItem('enteredEmail');
if(catchedEmail){
  const emailData = JSON.parse(catchedEmail);
  initialEmailValue = emailData.email;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl(initialEmailValue, {validators: [Validators.required, Validators.email], asyncValidators: [isEmailUnique]}),
    password: new FormControl('', [Validators.required, Validators.minLength(6), isContainQuestionMark]),
  });;

  get isEmailInvalid(){
    return this.form.controls.email.invalid && this.form.controls.email.touched && this.form.controls.email.dirty;
  }

  get isPasswordInvalid(){
    return this.form.controls.password.invalid && this.form.controls.password.touched && this.form.controls.password.dirty;
  }

  ngOnInit(){

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (enteredData)=>{
        window.localStorage.setItem('enteredEmail', JSON.stringify({'email': enteredData.email}))
      }
    });

    this.destroyRef.onDestroy(()=> subscription.unsubscribe());
  }
  
  onSubmit(){
   console.log(this.form);
   const enteredEmail = this.form.value.email;
   const enteredPassword = this.form.value.password;

  };
}
