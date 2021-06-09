/* eslint-disable no-invalid-this */
/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService,private router:Router) { }
  
  onSubmit=(credentials:NgForm)=>{
    const isLogged =this.loginService.login(credentials);
    if(isLogged){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.router.navigate(['/login']);;
    }
    
      
  }

  ngOnInit(): void {
  }

}
