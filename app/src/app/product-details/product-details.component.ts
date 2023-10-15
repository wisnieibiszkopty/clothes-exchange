import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../shared/services/product.service";

import {Product} from "../shared/product.model";
import {environment} from "../../environments/environment.development";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product: Product | undefined;
  avatarPath: string = environment.apiUrl + "images/avatars/";
  picturesPath: string = environment.apiUrl + "images/products/";
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    this.productService.getProduct(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.product = data;
      },
      error: (err) => {
        console.log("srataatat");
      }
    })
  }

  routeToProfile(){
    this.router.navigate(['profile/' + this.product?.owner_id]);
  }

}
