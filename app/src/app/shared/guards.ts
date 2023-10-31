import {CanActivateFn, Router} from "@angular/router";
import { inject } from "@angular/core";

import { AuthService } from "./services/auth.service";

export function authGuard(): CanActivateFn {
  return () => {
    const oauthService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    let id: number = 0;
    oauthService.userId$.subscribe((userId) => id=userId)
    if(id !== 0){
      return true;
    }
    return router.createUrlTree(['']);
  }
}

export function loggedGuard(): CanActivateFn {
  return () => {
    const oauthService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    let id: number = 0;
    oauthService.userId$.subscribe((userId) => id=userId)
    if(id === 0){
      return true;
    }
    return router.createUrlTree(['']);
  }
}
