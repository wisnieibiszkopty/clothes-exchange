import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";

// setup guard and better validation

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  signInForm: FormGroup;
  @Output() signIdEmitter = new EventEmitter<number>();
  showError: boolean = false;
  errorMessage: string = "";

  constructor(private authService: AuthService) {
  }

  ngOnInit(){
    this.signInForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required])
    });
  }

  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }

  onSubmit(): void{
    this.showError = false;
    const form = this.signInForm.value;
    this.authService.signIn(form).subscribe({
      next: (id: number): void => {
        console.log("Logged in correctly");
        this.signIdEmitter.emit(id);
      },
      error: (err) => {
        console.error(err);
        this.showError = true;
        this.errorMessage = "Wrong email or password!";
      }
    })
  }

}
