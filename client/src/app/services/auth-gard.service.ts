/* eslint-disable no-empty-function */
/* eslint-disable no-invalid-this */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate {

  constructor(private authService:AuthService, private router:Router) { }

  canActivate=()=>{
    if(this.authService.isLoggedIn){
      console.log('true in canactivade');
      return true;
    }
    console.log('false in canactivade');
    this.authService.logOut();
    this.router.navigate(['/login']);
    return false;
    
  }
}
