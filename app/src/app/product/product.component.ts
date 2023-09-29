import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  title: string = "Product";
  imgSrc: string = "https://images1.vinted.net/t/01_00725_wC2skgLcd6e5UdSAviYo7PZo/f800/1695748427.jpeg?s=fcdb0d49b09401edba6b21aa4708b23f2fd63219";
}
