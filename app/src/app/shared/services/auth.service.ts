import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import {tap, map, Observable, BehaviorSubject} from "rxjs";

import { environment} from "../../../environments/environment.development";

// maybe would be better if it just returns id - done
interface data{
  token: string;
  user: {
    name: string;
    email: string;
  }
}

@Injectable({providedIn: "root"})
export class AuthService{
  // I'm not sure yet how to store that
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();
  private idSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  userId$: Observable<number> = this.idSubject.asObservable();

  constructor(private http: HttpClient) {}

  /*public get userId(){
    return this._userId;
  }*/

  public logout(){
    this.loggedInSubject.next(false);
  }

  signUp(user: {name: string, email: string, password: string}): Observable<{name: string, email: string}>{
    const url = environment.apiUrl + 'auth';
    return this.http.post(url, user).pipe(
      tap((data: any) => {
        // add expiration date
        const token = data.token;
        sessionStorage.setItem("token", token);
      }),
      map((data: data) => data.user)
    );
  }

  signIn(user: {email: string, password: string}): Observable<number>{
    const url = environment.apiUrl + 'auth';
    const params = new HttpParams()
      .set("email", user.email)
      .set("password", user.password);
    return this.http.get(url, {params}).pipe(
      tap((data: any) => {
        const token = data.token;
        sessionStorage.setItem("token", token);
        this.idSubject.next(data.id);
        this.loggedInSubject.next(true);
      }),
      map((data) => data.id)
    );
  }

}
