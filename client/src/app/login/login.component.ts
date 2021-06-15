/* eslint-disable no-empty-function */
/* eslint-disable no-invalid-this */
/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) {}
  
  onSubmit=(credentials:NgForm)=>{
    
    this.authService.signin(credentials);
    
    if(this.authService.isLoggedIn)
    {
      this.router.navigate(['/dashboard']);
    }
    else{
      console.log('login');
      this.authService.logOut();
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.authService.logOut();
  }

}
