import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";

// Add custom password validation, also check if name and email exists in database

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  signUpForm: FormGroup;
  @Output() signIdEmitter = new EventEmitter<number>();

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  get name() { return this.signUpForm.get('name'); }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get repeatPassword() { return this.signUpForm.get('repeatPassword'); }

  onSubmit(): void{
    console.log(this.signUpForm.value);
    const form = this.signUpForm.value;
    const user = {"name": form.name, "email": form.email, "password": form.password};
    this.authService.signUp(user).subscribe({
      next: ((id: number) => {
        console.log("Succesfully registered");
        this.signIdEmitter.emit(id);

      }),
      error: ((err) => {
        console.error("Something goes wrong");
      })
    });
  }
}
