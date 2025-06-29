import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });;

  get isEmailInvalid(){
    return this.form.controls.email.invalid && this.form.controls.email.touched && this.form.controls.email.dirty;
  }

  get isPasswordInvalid(){
    return this.form.controls.password.invalid && this.form.controls.password.touched && this.form.controls.password.dirty;
  }
  
  onSubmit(){
   console.log(this.form);
   const enteredEmail = this.form.value.email;
   const enteredPassword = this.form.value.password;

  };
}
