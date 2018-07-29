import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'
import { Router,CanActivate } from '@angular/router'

// https://itnext.io/step-by-step-complete-firebase-authentication-in-angular-2-97ca73b8eb32

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {

    if (this.authService.isLoggedIn()) {
      return true;
    } 
    this.router.navigate(['/login'])
    return false
  }
}
