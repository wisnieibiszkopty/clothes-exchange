import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {User} from "../shared/user.model";
import {UserService} from "../shared/services/user.service";
import {environment} from "../../environments/environment.development";
import {Product} from "../shared/product.model";
import {AuthService} from "../shared/services/auth.service";

// add editing and products list and the bottom

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  id: number = 0;
  user: User = {};
  products: Product[] = [];
  userId: number | undefined;
  showSettings: boolean = false;

  constructor(private userService: UserService, private authService: AuthService,
              private route: ActivatedRoute, private router: Router) {}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (typeof id === "string") {
      this.id = parseInt(id, 10);
    }

    this.userService.getUserProfile(this.id).subscribe({
      next: ((data: any) => {
        console.log(data);
        const pictureUrl: string = environment.apiUrl + 'public/images/avatars/'
        this.user = {
          'id': data.id,
          'name': data.name,
          'description': data.description
        };
        if(!(data.picture === "" || data.picture === null)){
          this.user.pictureUrl = pictureUrl + data.picture;
        } else {
          this.user.pictureUrl = "assets/avatar.png";
        }
        this.products = data.products;
      }),
      error: ((err) => {
        console.error(err);
        this.router.navigate(['/notfound']);
      })
    });

    this.authService.userId$.subscribe(
    (id: number) => {
      this.userId = id;
    });
  }

  changeField(type: string, value: string){
    console.log(`id: ${this.userId}`);
    console.log(`type: ${type}`);
    console.log(`value: ${value}`);
    this.userService.editProfile(this.userId, type, value).subscribe(
      (data: any) => {
        if(type === "email"){
          this.user.email = data.value;
        }
        if(type === "description"){
          this.user.description = data.value;
        }
      }
    )
  }

  changePassword(){

  }

  changeAvatar(){

  }
}
