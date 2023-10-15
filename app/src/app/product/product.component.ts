import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() id: number = 0;
  @Input() userId: number = 0;
  @Input() username: string = "Kinga";
  @Input() avatarSrc: string = "https://i.pinimg.com/280x280_RS/fa/dc/ac/fadcac0dd316c01c4897788fa92ee933.jpg";
  @Input() imgSrc: string = "https://images1.vinted.net/t/01_00725_wC2skgLcd6e5UdSAviYo7PZo/f800/1695748427.jpeg?s=fcdb0d49b09401edba6b21aa4708b23f2fd63219";
  @Input() name: string = "Product";
  @Input() price: string = "0 zł";

  constructor(private router: Router) {}

  onProductClick(){
    this.router.navigate(['product/' + this.id]);
  }

  onUserClick(){
    this.router.navigate(['profile/' + this.userId]);
  }

}
