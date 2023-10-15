import {Component, OnInit} from '@angular/core';

import {Product} from "../shared/product.model";
import {ProductService} from "../shared/services/product.service";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit{
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (products: any) => {
        this.products = products;
        console.log(this.products);
      });
  }

}
