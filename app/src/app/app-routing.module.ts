import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard, loggedGuard } from "./shared/guards"

import {HomeComponent} from "./home/home.component";
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";
import {ProfileComponent} from "./profile/profile.component";
import {AddComponent} from "./add/add.component";
import {BrowseComponent} from "./browse/browse.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

// guards arent working

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'signin', component: SigninComponent, canActivate: [loggedGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [loggedGuard]},
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'add', component: AddComponent, canActivate: [authGuard]},
  { path: 'browse', component: BrowseComponent},
  { path: 'product/:id', component: ProductDetailsComponent},
  { path: '**', pathMatch: "full", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
