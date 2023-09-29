import {Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";

// setup guard and better validation

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signInForm: FormGroup;
  @Output() signIdEmitter = new EventEmitter<number>();

  constructor(private authService: AuthService) {
    this.signInForm = new FormGroup({
      "email": new FormControl('', [Validators.required, Validators.email]),
      "password": new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void{
    const form = this.signInForm.value;
    this.authService.signIn(form).subscribe({
      next: (id: number): void => {
        console.log("Logged in correctly");
        this.signIdEmitter.emit(id);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
