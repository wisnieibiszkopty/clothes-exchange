import {Component, ViewChild} from '@angular/core';
import {Form} from "@angular/forms";
import {ProductService} from "../shared/services/product.service";

class Category{
  constructor(public id: number, public name: string){}
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  @ViewChild('form') productForm: any;
  files: File[] = [];
  // temporary
  categories: Category[] = [
    new Category(1, "Shoes"),
    new Category(2, "Shirts"),
    new Category(3, "Pants"),
    new Category(4, "Jackets"),
    new Category(5, "Hoodies")
  ];

  constructor(private productService: ProductService) {}

  // for some reason after clicking request is send
  onChangeFileInput(event: any){
    const file: File = event.target.files[0];
    if(file){
      this.files.push(file);
    }
  }

  onSubmit(){
    console.log(this.productForm.form.value);
    this.productService.addProduct(this.productForm.form.value, this.files);
  }

}
