import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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

  editProfile(id: number | undefined, field: string, value: string){
    let token = sessionStorage.getItem('token');
    if(token === null){
      token = "";
    }
    const url = environment.apiUrl + 'users/' + id + `?field=${field}&value=${value}`;
    // const options = {
    //   params: new HttpParams()
    //     .set('field', field)
    //     .set('value', value),
    //   headers: new HttpHeaders()
    //     .set('Authorization', token)}

    console.log(`id: ${id}`);
    console.log(`type: ${field}`);
    console.log(`value: ${value}`);

    return this.http.put(url, {
      "headers": new HttpHeaders({'Authorization': token})
      });
  }

}
