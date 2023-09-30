import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment.development";

@Injectable({providedIn: "root"})
export class ProductService{

  constructor(private http: HttpClient) {}

  addProduct(form: any, files: File[]){
    const url = environment.apiUrl + "add/";
    const formData = new FormData();
    for (const file of files) {
      formData.append("pictures", file, file.name);
    }
    formData.append("product", form);

    console.log(formData.get('product'));

    let token = sessionStorage.getItem('token');
    if(token === null){
      token = "";
    }

    const headers = new HttpHeaders()
      .set('Authorization', token);
    //return this.http.post(url, formData, {headers: headers});
  }

}
