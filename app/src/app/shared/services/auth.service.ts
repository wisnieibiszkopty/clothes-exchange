import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Router } from "@angular/router";
import {tap, map, Observable, BehaviorSubject} from "rxjs";

import { environment} from "../../../environments/environment.development";

interface data{
  token: string;
  user: {
    name: string;
    email: string;
  }
}

// rememeber to add experied data!!!

@Injectable({providedIn: "root"})
export class AuthService{
  // I'm not sure yet how to store that
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();
  private idSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  userId$: Observable<number> = this.idSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  public logout(){
    this.loggedInSubject.next(false);
  }

  public restoreUserAuthData(id: number){
      this.loggedInSubject.next(true);
      this.idSubject.next(id);
  }

  // repair types
  signUp(user: {name: string, email: string, password: string}): Observable<number>{
    const url = environment.apiUrl + 'auth/signup';
    return this.http.post(url, user).pipe(
      tap((data: any) => {
        // add expiration date
        const token = data.token;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("id", data.id);
        this.idSubject.next(data.id);
        this.loggedInSubject.next(true);
        this.router.navigate(['profile/' + data.id]);
      }),
      map((data: any) => data.id)
    );
  }

  signIn(user: {email: string, password: string}): Observable<number>{
    const url = environment.apiUrl + 'auth/login';
    return this.http.post(url, user).pipe(
      tap((data: any) => {
        const token = data.token;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("id", data.id);
        this.idSubject.next(data.id);
        this.loggedInSubject.next(true);
        this.router.navigate(['profile/' + data.id]);
      }),
      map((data) => data.id)
    );
  }

}
