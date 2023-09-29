import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";

// Add custom password validation, also check if name and email exists in database

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(private authService: AuthService) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit(): void{
    console.log(this.signUpForm.value);
    const form = this.signUpForm.value;
    const user = {"name": form.name, "email": form.email, "password": form.password};
    this.authService.signUp(user).subscribe({
      next: ((data) => {
        console.log("Succesfully registered");
      }),
      error: ((err) => {
        console.error("Something goes wrong");
      })
    });
  }
}
