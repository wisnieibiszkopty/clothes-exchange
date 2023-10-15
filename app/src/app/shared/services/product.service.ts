import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {environment} from "../../../environments/environment.development";
import {Router} from "@angular/router";
import {map} from "rxjs";
import {Product} from "../product.model";

@Injectable({providedIn: "root"})
export class ProductService{

  constructor(private http: HttpClient, private router: Router) {}

  addProduct(form: any, files: File[]){
    const url = environment.apiUrl + "add/";
    const formData = new FormData();
    for (const file of files) {
      formData.append("pictures", file, file.name);
    }

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("brand", form.brand);
    formData.append("price", form.price);
    formData.append("ownerId", "26");

    let token = sessionStorage.getItem('token');
    if(token === null){
      token = "";
    }

    const headers = new HttpHeaders().set('Authorization', token);

    this.http.post(url, formData, {headers: headers}).subscribe({
      next: (data: any) => {
        // should return product id!!!
        console.log(data.id);
        this.router.navigate(["/product/" + data.id]);
      },
      error: (err) => {

      }
    });
  }

  getProduct(id: string){
    const url = environment.apiUrl + "product/" + id;
    return this.http.get(url);
  }

  getProducts(){
    const url = environment.apiUrl + "product/";
    return this.http.get(url).pipe(
      map((products: any) => products.map((product: any) => {
        product.picture = environment.apiUrl + 'images/avatars/' + product.picture;
        product.pictures[0] = environment.apiUrl + "images/products/" + product.pictures[0];
        return product;
      })))
  }

}
