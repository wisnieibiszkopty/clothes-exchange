import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment.development";
import {User} from "../user.model";

@Injectable({providedIn: "root"})
export class UserService{

  constructor(private http: HttpClient) {}

  getUserProfile(id: number): Observable<Object>{
    const url = environment.apiUrl + 'users/' + id;
    return this.http.get(url);
  }

}
