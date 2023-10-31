import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'app';
  loggedInSubscription: Subscription | undefined;
  loggedIn: boolean = false;
  id: number = 0;

  constructor(private authService: AuthService){}

  ngOnInit() {
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("id");
    if(token && id){
      console.log("Logowanie automatyczne");
      this.authService.restoreUserAuthData(Number(id));
    }

    this.loggedInSubscription = this.authService.loggedIn$.subscribe(
      (loggedIn => { this.loggedIn = loggedIn; })
    );
    this.authService.userId$.subscribe(
      (id) => { this.id = id; }
    );
  }

  logout(){
    sessionStorage.clear();
    this.authService.logout();
  }

  ngOnDestroy() {
    this.loggedInSubscription?.unsubscribe();
  }

}
