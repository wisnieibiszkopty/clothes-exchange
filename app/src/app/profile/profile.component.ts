import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {User} from "../shared/user.model";
import {UserService} from "../shared/services/user.service";
import {environment} from "../../environments/environment.development";

// add editing and products list and the bottom

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  id: number = 0;
  user: User | undefined = undefined;
  products: any[] = [];

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

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
          'pictureUrl': pictureUrl + data.picture,
          'description': data.description
        };
        this.products = data.products;
      }),
      error: ((err) => {
        console.error(err);
        this.router.navigate(['/notfound']);
      })
    });
  }

}
