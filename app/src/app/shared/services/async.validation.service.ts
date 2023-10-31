import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AbstractControl, ValidationErrors } from "@angular/forms";

import {AuthService} from "../services/auth.service";


@Injectable({providedIn: "root"})
export class AsyncValidationService{
    constructor(private authService: AuthService) {}

    validate(control: AbstractControl): Observable<ValidationErrors | null>{
        return null;
    }
}