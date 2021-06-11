/* eslint-disable no-invalid-this */
/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router) { }
  
  onSubmit=(credentials:NgForm)=>{
    this.loginService.login(credentials);
    const Token=localStorage.getItem('token');
    const isNotLogged = new JwtHelperService().isTokenExpired(Token||'');
    if(isNotLogged){
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
    else{
      
      this.router.navigate(['/dashboard']);
    }
    
      
  }

  ngOnInit(): void {
  }

}
